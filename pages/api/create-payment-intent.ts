import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { PrismaClient } from '@prisma/client';

// Debug: Check if we're using test keys
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
  console.error('STRIPE_SECRET_KEY is not set');
} else if (!stripeSecretKey.startsWith('sk_test_')) {
  console.error('WARNING: Using live Stripe key in development!');
  console.error('Current key:', stripeSecretKey.substring(0, 20) + '...');
}

const stripe = new Stripe(stripeSecretKey!, {
  apiVersion: '2025-06-30.basil',
});

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, firstName, lastName } = req.body;

    if (!email || !firstName || !lastName) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Find or create user
    let user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          firstName,
          lastName
        }
      });
    }

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 499, // $4.99 in cents
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        email,
        firstName,
        lastName,
        product: 'heightmax_report',
        userId: user.id.toString(),
      },
      receipt_email: email,
    });

    // Save payment record to database
    await prisma.payment.create({
      data: {
        userId: user.id,
        stripePaymentIntentId: paymentIntent.id,
        amount: 499,
        status: 'pending',
        email,
        firstName,
        lastName,
      }
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      userId: user.id,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: 'Failed to create payment intent' });
  }
} 