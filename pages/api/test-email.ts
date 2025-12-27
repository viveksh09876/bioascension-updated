import type { NextApiRequest, NextApiResponse } from 'next';
import * as SibApiV3Sdk from '@getbrevo/brevo';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    console.log('Testing email sending to:', email);
    console.log('BREVO_API_KEY exists:', !!process.env.BREVO_API_KEY);
    console.log('BREVO_FROM_EMAIL:', process.env.BREVO_FROM_EMAIL);

    const brevoApiKey = process.env.BREVO_API_KEY;
    if (!brevoApiKey) {
      return res.status(500).json({ error: 'Brevo API key not configured' });
    }

    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    apiInstance.setApiKey(SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey, brevoApiKey);

    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail.subject = 'Heightmax: Test Email';
    sendSmtpEmail.htmlContent = `
      <div style="text-align: center; padding: 20px; background: linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%); border-radius: 12px; margin: 20px 0;">
        <h2 style="color: #2e7d32; margin-bottom: 15px;">🎉 Test Email Working! 🎉</h2>
        <p style="color: #2e7d32; font-size: 18px; margin-bottom: 10px;"><strong>Email system is working correctly!</strong></p>
        <p style="color: #2e7d32; font-size: 16px;">This is a test email to verify the email configuration.</p>
      </div>
    `;
    sendSmtpEmail.sender = {
      name: 'Heightmax',
      email: process.env.BREVO_FROM_EMAIL || 'noreply@heightmax.ai'
    };
    sendSmtpEmail.to = [{ email }];

    await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('Test email sent successfully to:', email);

    return res.status(200).json({ success: true, message: 'Test email sent successfully' });
  } catch (error) {
    console.error('Test email error:', error);
    return res.status(500).json({ error: 'Failed to send test email', details: error.message });
  }
} 