/**
 * Test script to verify Mailgun email integration
 * Sends a test email to info@kaniou.be to confirm delivery
 */

import { readFileSync } from 'fs';
import { sendMailgunEmail } from './server/mailgun/sendMail.js';

// Load environment variables from .env file
try {
  const envContent = readFileSync('.env', 'utf8');
  const envLines = envContent.split('\n');
  for (const line of envLines) {
    if (line.trim() && !line.startsWith('#')) {
      const [key, value] = line.split('=');
      if (key && value) {
        process.env[key.trim()] = value.trim();
      }
    }
  }
} catch (error) {
  console.error('Could not load .env file:', error.message);
}

async function testMailgun() {
  try {
    console.log('Testing Mailgun email integration...');
    console.log('API Key:', process.env.API_KEY ? 'Found' : 'Missing');
    
    const result = await sendMailgunEmail(
      'info@kaniou.be',
      'Test Mailgun Email',
      'This is a test email from the TRAC_ORDR system.'
    );
    
    console.log('✅ Email sent successfully!');
    console.log('Response:', result);
    console.log('Check your inbox at info@kaniou.be and your Mailgun dashboard for confirmation.');
    
  } catch (error) {
    console.error('❌ Error sending email:');
    console.error('Status:', error.response?.status);
    console.error('Data:', error.response?.data);
    console.error('Message:', error.message);
    console.error('Full error:', error);
  }
}

testMailgun();