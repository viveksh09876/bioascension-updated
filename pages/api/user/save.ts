import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('req.method', req.method);
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  console.log(req.body);

  const { email, firstName, lastName } = req.body;

  if (!email || !firstName || !lastName) {
    return res.status(400).json({ error: 'Email, firstName, and lastName are required' });
  }

  console.log('Saving user:', email, firstName, lastName);


  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
      include: { quizSubmissions: true }
    });

    // If user exists and has a quiz submission, block
    if (existingUser && existingUser.quizSubmissions && existingUser.quizSubmissions.length > 0) {
      return res.status(409).json({ error: 'You have already completed this test with this email.' });
    }

    let user;
    if (existingUser) {
      // Update existing user
      user = await prisma.user.update({
        where: { email },
        data: {
          firstName,
          lastName,
          updatedAt: new Date()
        }
      });
    } else {
      // Create new user
      user = await prisma.user.create({
        data: {
          email: email,
          firstName: firstName,
          lastName: lastName
        }
      });
    }

    return res.status(200).json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    });
  } catch (error) {
    console.error('Error saving user:', error.stack);
    return res.status(500).json({ error: 'Failed to save user data' });
  }
} 