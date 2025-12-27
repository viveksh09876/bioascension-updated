import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userId, quizData, photoPaths } = req.body;
    if (!userId || !quizData) {
      return res.status(400).json({ error: 'userId and quizData are required' });
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Prepare photo data for database
    const photoData = photoPaths ? {
      photo1YearAgoFront: photoPaths.photo1YearAgoFront || null,
      photo1YearAgoSide: photoPaths.photo1YearAgoSide || null,
      photo1YearAgoBody: photoPaths.photo1YearAgoBody || null,
      photoNowFront: photoPaths.photoNowFront || null,
      photoNowSide: photoPaths.photoNowSide || null,
      photoNowBody: photoPaths.photoNowBody || null,
    } : {};

    // Save quiz submission to database (paid user only)
    await prisma.quizSubmission.create({
      data: {
        userId: Number(userId),
        quizData: quizData,
        ...photoData
      }
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Quiz submission error:', error.stack);
    return res.status(500).json({ error: 'Failed to save quiz submission' });
  }
} 