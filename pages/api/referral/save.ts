import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { ref, email, referralID, userId, fingerprint } = req.body;
  console.log(req.body);
  
  if (!ref || typeof ref !== 'string' || !email || typeof email !== 'string') {
    return res.status(400).json({ error: 'Missing referralId or email' });
  }

  try {
    // Check for self-referral prevention
    if (userId && referralID && Number(userId) === Number(referralID)) {
      console.log(`Self-referral attempt detected: userId=${userId}, referralID=${referralID}`);
      return res.status(400).json({ 
        error: 'You cannot refer yourself. Please use a different referral code.',
        reason: 'Self-referral detected'
      });
    }

    // Additional check: Prevent using own referral code
    if (userId && referralID) {
      const usedReferralCode = await prisma.referralCode.findUnique({
        where: { id: Number(referralID) }
      });
      
      if (usedReferralCode && usedReferralCode.userId && Number(usedReferralCode.userId) === Number(userId)) {
        console.log(`Self-referral attempt detected: user trying to use their own referral code, userId=${userId}, referralCodeId=${referralID}`);
        return res.status(400).json({ 
          error: 'You cannot use your own referral code. Please use a different referral code.',
          reason: 'Self-referral detected'
        });
      }
    }

    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://heightmax.ai';
    // Perform security checks first
    try {
      const securityCheck = await fetch(`${baseUrl}/api/referral/check-security`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email, 
          fingerprint, 
          referralCode: ref 
        })
      });

      if (!securityCheck.ok) {
        let securityError;
        try {
          securityError = await securityCheck.json();
        } catch (jsonError) {
          console.error('Failed to parse security check response:', jsonError);
          return res.status(500).json({ error: 'Security check failed' });
        }
        return res.status(securityCheck.status).json(securityError);
      }
    } catch (error) {
      console.error('Security check error:', error);
      return res.status(500).json({ error: 'Security check failed' });
    }

    // Check if user already has a referral code
    const existingReferral = await prisma.referralCode.findFirst({
      where: { userId: Number(userId) }
    });

    if (existingReferral) {
      // User already has a referral code, return the existing one
      return res.status(200).json({ 
        success: true, 
        referral: existingReferral,
        message: 'User already has a referral code'
      });
    }

    // Create new referral code only if user doesn't have one
    const referral = await prisma.referralCode.create({
      data: {
        code: ref,
        email,
        progress: 0,
        referralID: Number(referralID) || undefined,
        userId: Number(userId) || undefined,
      },
    });
    return res.status(200).json({ success: true, referral });
  } catch (error) {
    console.error('Prisma error in referral/save:', error.stack);
    return res.status(500).json({ error: 'Failed to save referral' });
  }
} 