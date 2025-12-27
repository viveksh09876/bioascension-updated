import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, firstName, lastName, quizData, analysis, isFreeUser } = req.body;

    if (!email || !quizData || !analysis) {
      return res.status(400).json({ error: 'Email, quiz data, and analysis are required' });
    }

    // Find or create user
    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          firstName: firstName || null,
          lastName: lastName || null,
        }
      });
    }

    // Save quiz submission
    await prisma.quizSubmission.create({
      data: {
        userId: user.id,
        quizData: quizData,
        isFreeUser: isFreeUser,
      }
    });

    // Save analysis
    await prisma.analysis.create({
      data: {
        userId: user.id,
        content: analysis,
        isFreeUser: isFreeUser,
      }
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Save analysis error:', error);
    return res.status(500).json({ error: 'Failed to save analysis' });
  }
} 