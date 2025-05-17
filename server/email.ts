import sgMail from '@sendgrid/mail';

// Initialize SendGrid with API key from environment variables
const sendgridApiKey = process.env.SENDGRID_API_KEY;
if (sendgridApiKey) {
  sgMail.setApiKey(sendgridApiKey);
} else {
  console.warn('SENDGRID_API_KEY is not set. Email functionality will not work.');
}

interface InflationReportData {
  name: string;
  email: string;
  amount: number;
  month: number;
  year: number;
  todayValue: number;
  growthRate: number;
}

/**
 * Sends an inflation calculation report email to the user
 */
export async function sendInflationReport(data: InflationReportData) {
  try {
    if (!sendgridApiKey) {
      console.error('Cannot send email: SENDGRID_API_KEY is not set');
      return { success: false, error: 'Email service not configured' };
    }

    const { name, email, amount, month, year, todayValue, growthRate } = data;
    
    // Format values for display
    const formattedOriginalAmount = amount.toLocaleString('en-GB', {
      style: 'currency',
      currency: 'GBP'
    });
    const formattedTodayValue = todayValue.toLocaleString('en-GB', {
      style: 'currency',
      currency: 'GBP'
    });
    const formattedGrowthRate = growthRate.toFixed(2);

    // Get month name
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const monthName = monthNames[month - 1];

    // Create email message
    const msg = {
      to: email,
      from: 'info@kr-properties.co.uk', // Use your verified sender
      subject: 'Your Property Investment Inflation Calculator Results',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e5e5; border-radius: 5px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #f97316; margin-bottom: 10px;">Property Investments</h1>
            <p style="font-size: 18px; color: #333;">Inflation Calculator Results</p>
          </div>
          
          <p>Hello ${name},</p>
          
          <p>Thank you for using our Inflation Calculator. Here are your results:</p>
          
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Original Amount:</strong> ${formattedOriginalAmount}</p>
            <p><strong>Date:</strong> ${monthName} ${year}</p>
            <p><strong>Today's Equivalent:</strong> ${formattedTodayValue}</p>
            <p><strong>Growth Rate to Match Inflation:</strong> ${formattedGrowthRate}%</p>
          </div>
          
          <p>This means that your ${formattedOriginalAmount} from ${monthName} ${year} would need to have grown to ${formattedTodayValue} today just to keep pace with inflation.</p>
          
          <p>At Property Investments, we help our clients achieve returns that beat inflation through carefully selected property investments.</p>
          
          <p>If you'd like to learn more about how we can help you achieve better returns, please don't hesitate to <a href="https://kr-properties.co.uk/contact" style="color: #f97316; text-decoration: none;">contact us</a>.</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e5e5; color: #666; font-size: 12px;">
            <p>Property Investments Ltd</p>
            <p>Email: info@kr-properties.co.uk | Phone: 02036332783</p>
            <p>© 2025 Property Investments. All rights reserved.</p>
          </div>
        </div>
      `,
    };

    // Send email
    await sgMail.send(msg);
    console.log(`Inflation calculator report email sent to ${email}`);
    return { success: true };
  } catch (error) {
    console.error('Error sending inflation report email:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}