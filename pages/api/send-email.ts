import type { NextApiRequest, NextApiResponse } from 'next';
import * as SibApiV3Sdk from '@getbrevo/brevo';
import * as fs from 'fs';
import * as path from 'path';
import { PrismaClient } from '@prisma/client';
import { generateFancyPng } from '../../lib/generateFancyPng';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, name } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
   
    const {analysis , isFreeUser} = req.body;

    // Load email template
    let emailTemplate = fs.readFileSync(path.join(process.cwd(), 'email-template.html'), 'utf8');
    
    // Replace template variables
    emailTemplate = emailTemplate.replace('{{name}}', name || 'there');
    emailTemplate = emailTemplate.replace('{{analysis}}', analysis.replace(/\n/g, '<br>'));

    // Generate fancy PNG attachment using the new function
    let pngAttachment = null;
    let pngGenerationSuccess = false;
    
    try {
      console.log('Starting PNG generation...');
      console.log('Analysis length:', analysis ? analysis.length : 'undefined');
      console.log('isFreeUser:', isFreeUser);
      console.log('Name:', name);
      
      // Extract first name for personalization
      const firstName = name ? name.split(' ')[0] : null;
      console.log('First name for personalization:', firstName);
      
      // Check if logo file exists
      const logoPath = path.join(process.cwd(), 'public/logo/logo.png');
      console.log('Logo path:', logoPath);
      console.log('Logo exists:', fs.existsSync(logoPath));
      
      // Generate fancy PNG with analysis content and user name - now returns buffer
      const pngBuffer = await generateFancyPng({
        text: analysis,
        subheading: isFreeUser ? 'Free Analysis Report' : 'Complete Analysis Report',
        logoPath: logoPath,
        userName: firstName
      });

      // Verify the PNG buffer was created
      if (pngBuffer && pngBuffer.length > 0) {
        console.log('PNG generated successfully, size:', pngBuffer.length, 'bytes');
        
        // Use the buffer directly
        pngAttachment = pngBuffer;
        console.log('PNG attachment size:', pngAttachment.length, 'bytes');
        pngGenerationSuccess = true;
        console.log('PNG generation completed successfully');
      } else {
        console.error('PNG buffer was not created or is empty');
      }
    } catch (pngError) {
      console.error('Fancy PNG generation error:', pngError);
      // Continue without PNG attachment
    }

    // Send email using Brevo
    const brevoApiKey = process.env.BREVO_API_KEY;
    if (brevoApiKey) {
      const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
      apiInstance.setApiKey(SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey, brevoApiKey);
      
      const subject = isFreeUser 
        ? 'Heightmax: Your Free Analysis Report' 
        : 'Heightmax: Your Complete Analysis Report';

      const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
      sendSmtpEmail.subject = subject;
      sendSmtpEmail.htmlContent = emailTemplate;
      sendSmtpEmail.sender = { 
        name: 'Heightmax', 
        email: process.env.BREVO_FROM_EMAIL || 'noreply@heightmax.ai' 
      };
      sendSmtpEmail.to = [{ email }];

      // Add attachment if PNG was generated successfully
      if (pngAttachment && pngGenerationSuccess) {
        console.log('Adding PNG attachment to email');
        sendSmtpEmail.attachment = [
          {
            name: 'heightmax-analysis-report.png',
            content: pngAttachment.toString('base64')
          }
        ];
      } else {
        console.log('No PNG attachment added - generation failed or disabled');
      }

      const emailResponse = await apiInstance.sendTransacEmail(sendSmtpEmail);
      console.log('Email sent successfully:', emailResponse);

      // Log email in database
      await prisma.emailLog.create({
        data: {
          email,
          name,
          analysis,
          status: 'sent'
        }
      });

      return res.status(200).json({ 
        success: true, 
        message: 'Email sent successfully',
        pngGenerated: pngGenerationSuccess
      });
    } else {
      return res.status(500).json({ error: 'Brevo API key not configured' });
    }
  } catch (error) {
    console.error('Email sending error:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
} 