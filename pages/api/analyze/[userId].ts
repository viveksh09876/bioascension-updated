import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userId } = req.query;
  if (!userId || typeof userId !== 'string') {
    return res.status(400).json({ error: 'userId is required' });
  }

  try {
    // Only check if analysis exists, do not return content
    const analysis = await prisma.analysis.findFirst({
      where: { userId: Number(userId) },
      orderBy: { createdAt: 'desc' }
    });
    if (!analysis) {
      return res.status(200).json({ ready: false });
    }
    return res.status(200).json({ ready: true });
  } catch (error) {
    console.error('Error checking analysis:', error);
    return res.status(500).json({ error: 'Failed to check analysis' });
  }
} 