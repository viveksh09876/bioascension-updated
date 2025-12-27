const SibApiV3Sdk = require('@getbrevo/brevo');
require('dotenv').config();

async function testBrevo() {
  console.log('=== Brevo Configuration Test ===');
  
  // Check environment variables
  const apiKey = process.env.BREVO_API_KEY;
  const fromEmail = process.env.BREVO_FROM_EMAIL;
  
  console.log('BREVO_API_KEY:', apiKey ? `${apiKey.substring(0, 10)}...` : 'NOT SET');
  console.log('BREVO_FROM_EMAIL:', fromEmail || 'NOT SET');
  
  if (!apiKey) {
    console.error('❌ BREVO_API_KEY is not set');
    console.log('\nTo fix this:');
    console.log('1. Sign up at https://www.brevo.com');
    console.log('2. Get your API key from the dashboard');
    console.log('3. Add BREVO_API_KEY=your_api_key to your .env file');
    return;
  }
  
  if (!fromEmail) {
    console.error('❌ BREVO_FROM_EMAIL is not set');
    console.log('\nTo fix this:');
    console.log('1. Add BREVO_FROM_EMAIL=your-email@gmail.com to your .env file');
    console.log('2. Brevo allows Gmail addresses as senders');
    return;
  }
  
  // Test Brevo connection
  try {
    console.log('\nTesting Brevo API key...');
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    apiInstance.setApiKey(SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey, apiKey);
    
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail.subject = 'Brevo Test';
    sendSmtpEmail.htmlContent = '<p>This is a test email to verify Brevo configuration.</p>';
    sendSmtpEmail.sender = { 
      name: 'Heightmax', 
      email: fromEmail 
    };
    sendSmtpEmail.to = [{ email: 'test@example.com' }];
    
    const result = await apiInstance.sendTransacEmail(sendSmtpEmail);
    
    console.log('✅ Brevo configuration is working!');
    console.log('Result:', result);
  } catch (error) {
    console.error('❌ Brevo test failed:');
    console.error(error);
    
    if (error.statusCode === 401) {
      console.log('\nTo fix this:');
      console.log('1. Check your API key at https://app.brevo.com/settings/keys/api');
      console.log('2. Make sure your API key is correct');
    } else if (error.statusCode === 400) {
      console.log('\nTo fix this:');
      console.log('1. Verify your sender email at https://app.brevo.com/settings/senders');
      console.log('2. Make sure your email is verified');
    }
  }
}

testBrevo().catch(console.error); 