import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userId, content, isFreeUser } = req.body;
    if (!userId || !content) {
      return res.status(400).json({ error: 'userId and content are required' });
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Save analysis to database
    await prisma.analysis.create({
      data: {
        userId: Number(userId),
        content: content,
        isFreeUser: !!isFreeUser
      }
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Analysis save error:', error.stack);
    return res.status(500).json({ error: 'Failed to save analysis' });
  }
} 