import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { ref } = req.query;
  if (!ref || typeof ref !== 'string') {
    return res.status(400).json({ error: 'Missing referralId' });
  }
  try {
    const entry = await prisma.referralCode.findUnique({ where: { code: ref } });
    if (!entry) {
      return res.status(200).json({ progress: 0 });
    }
    return res.status(200).json({ 
      id: entry.id, 
      email: entry.email, 
      userId: entry.userId,
      progress: entry.progress || 0 
    });
  } catch (error) {
    console.error('Prisma error in referral/progress:', error);
    return res.status(500).json({ error: 'Failed to fetch referral progress' });
  }
} 