import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import * as SibApiV3Sdk from '@getbrevo/brevo';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { ref, firstName, lastName , quizData} = req.body;
  if (!ref || typeof ref !== 'string') {
    return res.status(400).json({ error: 'Missing referralId' });
  }
  try {
    console.log(`Referral increment called for code: ${ref}`);
    // Find the referral entry
    const entry = await prisma.referralCode.findUnique({ where: { code: ref } });
    if (!entry) {
      console.log(`Referral code ${ref} not found in database`);
      return res.status(404).json({ error: 'Referral not found' });
    }
    console.log(`Found referral entry: ${entry.code}, current progress: ${entry.progress}, email: ${entry.email}`);
    // Increment progress (max 3)
    const newProgress = Math.min((entry.progress || 0) + 1, 3);
    console.log(`Updating referral code ${ref}: progress ${entry.progress} -> ${newProgress}`);
    await prisma.referralCode.update({ where: { code: ref }, data: { progress: newProgress } });
    console.log(`Database update completed for referral code ${ref}`);

    // If this person reached 3/3 and they used someone's referral link, increase that person's progress
    if (newProgress === 3 && entry.referralID) {
      const originalReferrer = await prisma.referralCode.findUnique({ where: { id: entry.referralID } });
      if (originalReferrer) {
        const referrerNewProgress = Math.min((originalReferrer.progress || 0) + 1, 3);
        await prisma.referralCode.update({ where: { id: entry.referralID }, data: { progress: referrerNewProgress } });

        // Send progress emails to inviter for all progress levels (1/3, 2/3, 3/3)
        if (referrerNewProgress > (originalReferrer.progress || 0)) {
          console.log(`Inviter progress updated: ${originalReferrer.progress} -> ${referrerNewProgress}. Sending email to: ${originalReferrer.email}`);

          try {
            const brevoApiKey = process.env.BREVO_API_KEY;
            if (brevoApiKey) {
              const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
              apiInstance.setApiKey(SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey, brevoApiKey);

              if (referrerNewProgress < 3) {
                // Send progress email for 1/3 and 2/3
                const subject = `Heightmax: ${referrerNewProgress}/3 Referrals Complete!`;
                const progressTemplate = `
                  <div style="text-align: center; padding: 20px; background: linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%); border-radius: 12px; margin: 20px 0;">
                    <h2 style="color: #2e7d32; margin-bottom: 15px;">🎉 Great Progress! 🎉</h2>
                    <p style="color: #2e7d32; font-size: 18px; margin-bottom: 10px;"><strong>You now have ${referrerNewProgress}/3 friends who completed the quiz!</strong></p>
                    <p style="color: #2e7d32; font-size: 16px;">Keep sharing your referral link to unlock your free report!</p>
                  </div>
                  <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 12px; padding: 20px; margin: 20px 0;">
                    <h3 style="color: #0A0E3F; margin-bottom: 15px;">📊 Your Progress:</h3>
                    <div style="background: #e9ecef; border-radius: 10px; height: 20px; margin: 15px 0; overflow: hidden;">
                      <div style="background: linear-gradient(90deg, #00C2A8 0%, #0A0E3F 100%); height: 100%; border-radius: 10px; width: ${(referrerNewProgress / 3) * 100}%; transition: width 0.3s ease;"></div>
                    </div>
                    <p style="color: #666; font-size: 14px; text-align: center;">${referrerNewProgress}/3 referrals completed • ${3 - referrerNewProgress} more needed</p>
                  </div>
                  <div style="text-align: center; margin: 30px 0;">
                    <p style="color: #666; font-size: 14px;">Share your referral link with more friends to unlock your free Heightmax report!</p>
                  </div>
                `;

                const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
                sendSmtpEmail.subject = subject;
                sendSmtpEmail.htmlContent = progressTemplate;
                sendSmtpEmail.sender = {
                  name: 'Heightmax',
                  email: process.env.BREVO_FROM_EMAIL || 'noreply@heightmax.ai'
                };
                sendSmtpEmail.to = [{ email: originalReferrer.email }];

                await apiInstance.sendTransacEmail(sendSmtpEmail);
                console.log(`Progress email sent to inviter ${originalReferrer.email} for ${referrerNewProgress}/3 progress`);
              } else if (referrerNewProgress === 3) {
                // Send congratulations email for 3/3
                console.log(`Inviter reached 3/3! Sending congratulations email to: ${originalReferrer.email}`);

                const congratulationsTemplate = `
                  <div style="text-align: center; padding: 20px; background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%); border-radius: 12px; margin: 20px 0;">
                    <h2 style="color: #1976d2; margin-bottom: 15px;">🎉 Congratulations! 🎉</h2>
                    <p style="color: #1976d2; font-size: 18px; margin-bottom: 10px;"><strong>All 3/3 of your friends have completed the quiz using your referral link!</strong></p>
                    <p style="color: #1976d2; font-size: 16px;"><strong>Your free Heightmax report is now unlocked!</strong></p>
                    <p style="color: #1976d2; font-size: 14px; margin-top: 15px;">Check your inbox for your comprehensive genetic analysis report with detailed insights and personalized recommendations.</p>
                  </div>
                  <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 12px; padding: 20px; margin: 20px 0;">
                    <h3 style="color: #0A0E3F; margin-bottom: 15px;">🎁 What You've Unlocked:</h3>
                    <ul style="color: #555; line-height: 1.8;">
                      <li>🧬 Genetic only height prediction analysis</li>
                      <li>💀 Prediction based only on your quiz answers</li>
                      <p>🚫 Before-and-after photos will not be analyzed</p>             
                    </ul>
                  </div>
                  <div style="text-align: center; margin: 30px 0;">
                    <p style="color: #666; font-size: 14px;">Thank you for sharing Heightmax with your friends! Your personalized report will be delivered shortly.</p>
                  </div>
                `;

                const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
                sendSmtpEmail.subject = 'Heightmax: Congratulations! You Unlocked Your Free Report!';
                sendSmtpEmail.htmlContent = congratulationsTemplate;
                sendSmtpEmail.sender = {
                  name: 'Heightmax',
                  email: process.env.BREVO_FROM_EMAIL || 'noreply@heightmax.ai'
                };
                sendSmtpEmail.to = [{ email: originalReferrer.email }];

                await apiInstance.sendTransacEmail(sendSmtpEmail);
                console.log(`Congratulations email sent to inviter ${originalReferrer.email} for completing 3/3 referrals`);

                // Generate analysis for inviter using analyzed.ts API
                if (originalReferrer.userId) {
                  // Fetch quizData from the database for the inviter
                  const quizSubmission = await prisma.quizSubmission.findFirst({
                    where: { userId: originalReferrer.userId },
                    orderBy: { createdAt: 'desc' }
                  });
                  if (!quizSubmission) throw new Error('Quiz data not found for inviter');
                  const quizData = quizSubmission.quizData;

                  const analysisResponse = await fetch(`${process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'}/api/analyzed`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      quizData: quizData,
                      isFreeUser: true
                    })
                  });

                  if (!analysisResponse.ok) {
                    throw new Error('Failed to generate analysis');
                  }

                  const { analysis } = await analysisResponse.json();

                  // Save analysis to database
                  await fetch(`${process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'}/api/analysis/save`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      userId: Number(originalReferrer.userId),
                      content: analysis,
                      isFreeUser: true
                    })
                  });

                  // Send email with analysis using /api/send-email endpoint
                  const emailResponse = await fetch(`${process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'}/api/send-email`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      email: originalReferrer.email,
                      name: `${firstName} ${lastName}`,
                      analysis,
                      isFreeUser: true
                    })
                  });

                  if (emailResponse.ok) {
                    console.log(`Inviter analysis email sent to ${originalReferrer.email} via /api/send-email endpoint`);
                  } else {
                    console.error(`Failed to send inviter analysis email to ${originalReferrer.email}:`, await emailResponse.text());
                  }
                }
              } else {
                console.log(`No quiz submission found for inviter userId ${originalReferrer.userId}`);
              }
            } else {
              console.log(`No userId found for inviter referral code ${originalReferrer.code}`);
            }

          } catch (inviterEmailError) {
            console.error('Failed to send inviter email:', inviterEmailError);
          }
        }
      }
    }

    // --- EMAIL LOGIC ---
    try {
      const brevoApiKey = process.env.BREVO_API_KEY;
      console.log('Email logic: BREVO_API_KEY exists:', !!brevoApiKey);
      console.log('Email logic: BREVO_FROM_EMAIL:', process.env.BREVO_FROM_EMAIL);

      if (brevoApiKey) {
        const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
        apiInstance.setApiKey(SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey, brevoApiKey);
        let subject = '';
        let html = '';
        const email = entry.email;

        console.log(`Referral increment: ${entry.code}, old progress: ${entry.progress}, new progress: ${newProgress}, userId: ${entry.userId}`);

        // Only send emails when progress actually changes
        console.log(`Email check: newProgress=${newProgress}, oldProgress=${entry.progress}, progressChanged=${newProgress > (entry.progress || 0)}`);
        if (newProgress > (entry.progress || 0)) {
          if (newProgress < 3) {
            subject = `Heightmax: ${newProgress}/3 Referrals Complete!`;
            const progressTemplate = `
              <div style="text-align: center; padding: 20px; background: linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%); border-radius: 12px; margin: 20px 0;">
                <h2 style="color: #2e7d32; margin-bottom: 15px;">🎉 Great Progress! 🎉</h2>
                <p style="color: #2e7d32; font-size: 18px; margin-bottom: 10px;"><strong>You now have ${newProgress}/3 friends who completed the quiz!</strong></p>
                <p style="color: #2e7d32; font-size: 16px;">Keep sharing your referral link to unlock your free report!</p>
              </div>
              <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 12px; padding: 20px; margin: 20px 0;">
                <h3 style="color: #0A0E3F; margin-bottom: 15px;">📊 Your Progress:</h3>
                <div style="background: #e9ecef; border-radius: 10px; height: 20px; margin: 15px 0; overflow: hidden;">
                  <div style="background: linear-gradient(90deg, #00C2A8 0%, #0A0E3F 100%); height: 100%; border-radius: 10px; width: ${(newProgress / 3) * 100}%; transition: width 0.3s ease;"></div>
                </div>
                <p style="color: #666; font-size: 14px; text-align: center;">${newProgress}/3 referrals completed • ${3 - newProgress} more needed</p>
              </div>
              <div style="text-align: center; margin: 30px 0;">
                <p style="color: #666; font-size: 14px;">Share your referral link with more friends to unlock your free Heightmax report!</p>
              </div>
            `;
            const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
            sendSmtpEmail.subject = subject;
            sendSmtpEmail.htmlContent = progressTemplate;
            sendSmtpEmail.sender = {
              name: 'Heightmax',
              email: process.env.BREVO_FROM_EMAIL || 'noreply@heightmax.ai'
            };
            sendSmtpEmail.to = [{ email }];

            await apiInstance.sendTransacEmail(sendSmtpEmail);
            console.log(`Progress email sent to ${email} for ${newProgress}/3 progress`);
          } else if (newProgress === 3 && (entry.progress || 0) < 3) {
            console.log(`Sending congratulations and free report email for progress: ${entry.progress} -> ${newProgress}`);
            subject = 'Heightmax: Congratulations! You Unlocked Your Free Report!';
            const congratulationsTemplate = `
              <div style="text-align: center; padding: 20px; background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%); border-radius: 12px; margin: 20px 0;">
                <h2 style="color: #1976d2; margin-bottom: 15px;">🎉 Congratulations! 🎉</h2>
                <p style="color: #1976d2; font-size: 18px; margin-bottom: 10px;"><strong>All 3/3 of your friends have completed the quiz using your referral link!</strong></p>
                <p style="color: #1976d2; font-size: 16px;"><strong>Your free Heightmax report is now unlocked!</strong></p>
                <p style="color: #1976d2; font-size: 14px; margin-top: 15px;">Check your inbox for your comprehensive genetic analysis report with detailed insights and personalized recommendations.</p>
              </div>
              <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 12px; padding: 20px; margin: 20px 0;">
                <h3 style="color: #0A0E3F; margin-bottom: 15px;">🎁 What You've Unlocked:</h3>
                <ul style="color: #555; line-height: 1.8;">
                  <li>🧬 Genetic only height prediction analysis</li>
                  <li>💀 Prediction based only on your quiz answers</li>
                  <p>🚫 Before-and-after photos will not be analyzed</p>             
                </ul>
              </div>
              <div style="text-align: center; margin: 30px 0;">
                <p style="color: #666; font-size: 14px;">Thank you for sharing Heightmax with your friends! Your personalized report will be delivered shortly.</p>
              </div>
            `;
            const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
            sendSmtpEmail.subject = subject;
            sendSmtpEmail.htmlContent = congratulationsTemplate;
            sendSmtpEmail.sender = {
              name: 'Heightmax',
              email: process.env.BREVO_FROM_EMAIL || 'sales@heightmax.ai'
            };
            sendSmtpEmail.to = [{ email }];

            await apiInstance.sendTransacEmail(sendSmtpEmail);
            console.log(`Congratulations email sent to ${email} for completing 3/3 referrals (progress was ${entry.progress} -> ${newProgress})`);

            // Generate analysis for user using analyzed.ts API
            console.log(`Checking for quiz submission for userId: ${entry.userId}`);
            if (entry.userId) {
              // Fetch quizData from the database for the user
              const quizSubmission = await prisma.quizSubmission.findFirst({
                where: { userId: entry.userId },
                orderBy: { createdAt: 'desc' }
              });
              if (!quizSubmission) throw new Error('Quiz data not found for user');
              const quizData = quizSubmission.quizData;

              // Call analyzed.ts API to generate analysis
              const analysisResponse = await fetch(`${process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'}/api/analyzed`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  quizData: quizData,
                  isFreeUser: true,
                })
              });

              if (analysisResponse.ok) {
                const { analysis } = await analysisResponse.json();

                // Save analysis to Analysis table
                await prisma.analysis.create({
                  data: {
                    userId: Number(entry.userId),
                    content: analysis,
                    isFreeUser: true
                  }
                });

                // Send email with analysis using /api/send-email endpoint
                const emailResponse = await fetch(`${process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'}/api/send-email`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    email: email,
                    name: 'there',
                    analysis: analysis,
                    isFreeUser: true
                  })
                });

                if (emailResponse.ok) {
                  console.log(`Free report email sent to ${email} via /api/send-email endpoint`);
                } else {
                  console.error(`Failed to send free report email to ${email}:`, await emailResponse.text());
                }
              } else {
                console.log(`Failed to generate analysis for userId ${entry.userId}`);
              }

            } else {
              console.log(`No quiz submission found for userId ${entry.userId}`);
            }
          } else {
            console.log(`No userId found for referral code ${entry.code}`);
          }
        }
      } else {
        console.log(`No email sent - progress unchanged: ${entry.progress} -> ${newProgress}`);
      }
    } catch (e) {
      console.error('Failed to send referral progress email:', e);
    }
    // --- END EMAIL LOGIC ---

    return res.status(200).json({ progress: newProgress });
  } catch (error) {
    console.error('Prisma error in referral/increment:', error);
    return res.status(500).json({ error: 'Failed to increment referral progress' });
  }
} 