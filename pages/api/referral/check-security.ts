import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Helper function to get IP address
function getClientIP(req: NextApiRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  const ip = forwarded ? (Array.isArray(forwarded) ? forwarded[0] : forwarded.split(',')[0]) : req.socket.remoteAddress;
  return ip || 'unknown';
}

// Helper function to get subnet from IP
function getSubnet(ip: string): string {
  // For IPv4, get the first 3 octets (e.g., 192.168.1.0)
  const parts = ip.split('.');
  if (parts.length === 4) {
    return `${parts[0]}.${parts[1]}.${parts[2]}.0`;
  }
  return ip;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('Security check endpoint called');
  console.log('Method:', req.method);
  console.log('Headers:', req.headers);
  
  if (req.method !== 'POST') {
    console.log('Method not allowed:', req.method);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, fingerprint, referralCode, userId, referralID } = req.body;
    
    console.log(`Security check called for email: ${email}, referralCode: ${referralCode || 'none'}, userId: ${userId}, referralID: ${referralID}`);
    
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Check for self-referral prevention
    if (userId && referralID && Number(userId) === Number(referralID)) {
      console.log(`Self-referral attempt detected in security check: userId=${userId}, referralID=${referralID}`);
      return res.status(400).json({ 
        error: 'You cannot refer yourself. Please use a different referral code.',
        reason: 'Self-referral detected'
      });
    }

    const ipAddress = getClientIP(req);
    const subnet = getSubnet(ipAddress);

    // Check IP-based rate limiting
    let ipTracking = await prisma.ipTracking.findUnique({
      where: { subnet }
    });

    if (!ipTracking) {
      ipTracking = await prisma.ipTracking.create({
        data: {
          ipAddress,
          subnet,
          referralCount: 0
        }
      });
    }

    // Rate limiting: max 5 referrals per subnet per day
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    if (ipTracking.lastReferralAt && ipTracking.lastReferralAt > oneDayAgo && ipTracking.referralCount >= 5) {
      // Only create referral_attempts record if we have a referralCode
      if (referralCode) {
        await prisma.referralAttempt.create({
          data: {
            ipAddress,
            subnet,
            fingerprint: fingerprint || null,
            email,
            referralCode,
            status: 'blocked',
            reason: 'IP rate limit exceeded'
          }
        });
      }
      return res.status(429).json({ 
        error: 'Too many referral attempts from this IP address. Please try again later.',
        reason: 'IP rate limit exceeded'
      });
    }

    // Check fingerprint-based self-referral prevention
    let deviceFingerprint = null;
    if (fingerprint && fingerprint !== 'null' && fingerprint !== 'undefined') {
      deviceFingerprint = await prisma.deviceFingerprint.findUnique({
        where: { fingerprint }
      });

      if (!deviceFingerprint) {
        deviceFingerprint = await prisma.deviceFingerprint.create({
          data: {
            fingerprint,
            referralCount: 0
          }
        });
      }

      // Check if this device has already used this referral code
      if (referralCode) {
        const existingAttempt = await prisma.referralAttempt.findFirst({
          where: {
            fingerprint,
            referralCode,
            status: 'allowed'
          }
        });

        if (existingAttempt) {
          await prisma.referralAttempt.create({
            data: {
              ipAddress,
              subnet,
              fingerprint,
              email,
              referralCode,
              status: 'blocked',
              reason: 'Self-referral detected'
            }
          });
          return res.status(400).json({ 
            error: 'This device has already used this referral code.',
            reason: 'Self-referral detected'
          });
        }
      }

      // Check device-based rate limiting
      if (deviceFingerprint.lastReferralAt && deviceFingerprint.lastReferralAt > oneDayAgo && deviceFingerprint.referralCount >= 3) {
        // Only create referral_attempts record if we have a referralCode
        if (referralCode) {
          await prisma.referralAttempt.create({
            data: {
              ipAddress,
              subnet,
              fingerprint,
              email,
              referralCode,
              status: 'blocked',
              reason: 'Device rate limit exceeded'
            }
          });
        }
        return res.status(429).json({ 
          error: 'Too many referral attempts from this device. Please try again later.',
          reason: 'Device rate limit exceeded'
        });
      }
    } else {
      console.log('Fingerprint not available (incognito mode or blocked by browser)');
    }

    // Only update tracking if we have a referralCode
    if (referralCode) {
      console.log(`Updating IP tracking for subnet ${subnet}: count ${ipTracking.referralCount} -> ${ipTracking.referralCount + 1}`);
      await prisma.ipTracking.update({
        where: { subnet },
        data: {
          referralCount: ipTracking.referralCount + 1,
          lastReferralAt: new Date()
        }
      });

      if (fingerprint && deviceFingerprint) {
        console.log(`Updating device fingerprint ${fingerprint}: count ${deviceFingerprint.referralCount} -> ${deviceFingerprint.referralCount + 1}`);
        await prisma.deviceFingerprint.update({
          where: { fingerprint },
          data: {
            referralCount: deviceFingerprint.referralCount + 1,
            lastReferralAt: new Date()
          }
        });
      }
    }

    // Only log the attempt as allowed if we have a referralCode
    if (referralCode) {
      await prisma.referralAttempt.create({
        data: {
          ipAddress,
          subnet,
          fingerprint: fingerprint || null,
          email,
          referralCode,
          status: 'allowed',
          reason: 'Security checks passed'
        }
      });
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Security checks passed' 
    });

  } catch (error) {
    console.error('Security check error:', error);
    console.error('Error stack:', error.stack);
    return res.status(500).json({ error: 'Failed to perform security checks' });
  }
} 