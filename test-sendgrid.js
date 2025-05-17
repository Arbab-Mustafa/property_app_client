// Test file to ensure SendGrid is working correctly
import pkg from '@sendgrid/mail';
const { MailService } = pkg;

const sgMail = new MailService();
// Use the API key from environment variable
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Test message
const msg = {
  to: '90remz@gmail.com', // Your email address from the form submissions
  from: 'info@kr-properties.co.uk', // Must be your verified sender in SendGrid
  subject: 'SendGrid Test - Property Investments',
  text: 'This is a test email to verify that SendGrid is working correctly with your API key.',
  html: '<strong>This is a test email</strong> to verify that SendGrid is working correctly with your API key.',
};

// Send the test email
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent successfully! Your SendGrid setup is working.');
  })
  .catch((error) => {
    console.error('Error sending test email:');
    console.error(error);
    if (error.response) {
      console.error('Error details:', error.response.body);
    }
  });