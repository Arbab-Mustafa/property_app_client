// Use SendGrid's provided library for email functionality
import sgMail from '@sendgrid/mail';

interface InflationReportData {
  name: string;
  email: string;
  amount: number;
  month: number;
  year: number;
  todayValue: number;
  annualGrowthRate: number;
  lossInValue: number;
  percentageIncrease: number;
  startYear: number;
  endYear: number;
  yearsDiff: number;
  chartImage?: string;
}

/**
 * Sends an inflation calculation report email to the user using SendGrid API directly
 */
export async function sendInflationReport(data: InflationReportData) {
  try {
    const sendgridApiKey = process.env.SENDGRID_API_KEY;
    
    if (!sendgridApiKey) {
      console.error('Cannot send email: SENDGRID_API_KEY is not set');
      return { success: false, error: 'Email service not configured' };
    }

    const { 
      name, 
      email, 
      amount, 
      month, 
      year, 
      todayValue,
      lossInValue,
      percentageIncrease,
      annualGrowthRate,
      startYear,
      endYear,
      yearsDiff,
      chartImage
    } = data;
    
    // Format values for display
    const formattedOriginalAmount = amount.toLocaleString('en-GB', {
      style: 'currency',
      currency: 'GBP'
    });
    const formattedTodayValue = todayValue.toLocaleString('en-GB', {
      style: 'currency',
      currency: 'GBP'
    });

    // Get month name
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const monthName = monthNames[month - 1];

    // Format additional values for display
    const formattedLossInValue = data.lossInValue.toLocaleString('en-GB', {
      style: 'currency',
      currency: 'GBP'
    });
    const formattedPercentageIncrease = data.percentageIncrease.toFixed(1);
    const formattedAnnualGrowthRate = data.annualGrowthRate.toFixed(1);
    const formattedYearsDiff = data.yearsDiff.toFixed(0);
    
    // Current year
    const currentYear = new Date().getFullYear();
    
    // Percentage increase text
    const percentageIncreaseText = `increased by ${formattedPercentageIncrease}%`;
    
    // Create the new structured email HTML content
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; padding: 20px; line-height: 1.6; color: #333;">
        
        <div style="text-align: left; margin-bottom: 30px; border-bottom: 2px solid #ddd; padding-bottom: 15px;">
          <h1 style="color: #008e6d; margin: 0; font-size: 24px; font-weight: bold;">Property Investments</h1>
          <p style="margin: 5px 0 0 0; font-size: 16px; color: #666;">Detailed Inflation Calculator Results</p>
        </div>
        
        <p style="margin-bottom: 20px;">Hello ${name},</p>
        
        <p style="margin-bottom: 25px;">Thank you for using our Inflation Calculator. Below is your detailed report based on the Retail Price Index (RPI) data up to ${currentYear}.</p>
        
        <div style="border-top: 2px solid #ddd; margin: 30px 0 20px 0;"></div>
        
        <div style="margin: 30px 0;">
          <h2 style="color: #008e6d; margin: 0 0 20px 0; font-size: 20px;">📊 Inflation Report Summary</h2>
          <ul style="list-style: none; padding: 0; margin: 0;">
            <li style="margin-bottom: 8px;">• <strong>Original Amount:</strong> ${formattedOriginalAmount}</li>
            <li style="margin-bottom: 8px;">• <strong>Start Date:</strong> ${monthName} ${year}</li>
            <li style="margin-bottom: 8px;">• <strong>End Date:</strong> Present (${currentYear})</li>
            <li style="margin-bottom: 8px;">• <strong>Inflation-Adjusted Value (${currentYear}):</strong> ${formattedTodayValue}</li>
            <li style="margin-bottom: 8px;">• <strong>Real-Term Loss in Value:</strong> -${formattedLossInValue}</li>
            <li style="margin-bottom: 8px;">• <strong>Percentage Increase in Cost of Living:</strong> ${formattedPercentageIncrease}%</li>
            <li style="margin-bottom: 8px;">• <strong>Required Growth to Keep Up with Inflation:</strong> ${formattedAnnualGrowthRate}% annually</li>
            <li style="margin-bottom: 8px;">• <strong>Time Period:</strong> ${formattedYearsDiff} years</li>
          </ul>
        </div>
        
        <div style="border-top: 2px solid #ddd; margin: 30px 0 20px 0;"></div>
        
        ${chartImage ? `
        <div style="margin: 30px 0;">
          <h2 style="color: #008e6d; margin: 0 0 20px 0; font-size: 20px;">📊 Visual Comparison</h2>
          <div style="text-align: center; margin: 20px 0;">
            <img src="${chartImage}" alt="Inflation Impact Chart" style="max-width: 100%; height: auto; border: 1px solid #ddd; border-radius: 8px;" />
            <p style="font-size: 12px; color: #666; margin-top: 10px; font-style: italic;">
              Visual comparison showing your original amount versus what you would need today to have the same purchasing power.
            </p>
          </div>
        </div>
        
        <div style="border-top: 2px solid #ddd; margin: 30px 0 20px 0;"></div>
        ` : ''}
        
        <div style="margin: 30px 0;">
          <h2 style="color: #008e6d; margin: 0 0 20px 0; font-size: 20px;">🧾 What This Means</h2>
          <p style="margin-bottom: 15px;">Since ${year}, the cost of goods and services in the UK has ${percentageIncreaseText}. That means your ${formattedOriginalAmount} would now need to be worth over ${formattedTodayValue} just to have the same purchasing power.</p>
          <p style="margin-bottom: 15px;">If the money stayed in a low-interest account or savings, its real-world value has significantly decreased.</p>
          <p style="margin-bottom: 15px; font-style: italic; background-color: #f8f9fa; padding: 15px; border-left: 4px solid #008e6d;">"Not investing is like pouring water into a leaky bucket. Over time, no matter how full it looks, you're left with much less than you started with."</p>
        </div>
        
        <div style="border-top: 2px solid #ddd; margin: 30px 0 20px 0;"></div>
        
        <div style="margin: 30px 0;">
          <h2 style="color: #008e6d; margin: 0 0 20px 0; font-size: 20px;">📞 Let's Talk</h2>
          <p style="margin-bottom: 15px;">Want to find out how to protect your money and grow it confidently?</p>
          
          <div style="text-align: center; margin: 25px 0;">
            <a href="https://kr-properties.co.uk/contact" style="display: inline-block; background-color: #008e6d; color: white; text-decoration: none; padding: 15px 30px; border-radius: 5px; font-weight: bold; font-size: 16px;">Book a Personal Consultation →</a>
          </div>
          
          <p style="margin-bottom: 5px;">Or contact us directly:</p>
          <p style="margin: 5px 0;"><strong>Email:</strong> info@kr-properties.co.uk</p>
          <p style="margin: 5px 0;"><strong>Phone:</strong> 020 3633 2783</p>
        </div>
        
        <div style="border-top: 2px solid #ddd; margin: 30px 0 20px 0;"></div>
        
        <div style="text-align: center; color: #666; font-size: 12px; margin-top: 30px;">
          <p style="margin: 0;">© ${currentYear} kr property investments. All rights reserved.</p>
        </div>
      </div>
    `;

    // Set the API key for SendGrid
    sgMail.setApiKey(sendgridApiKey);

    // Create email message
    const msg = {
      to: email,
      from: { 
        email: 'info@kr-properties.co.uk', 
        name: 'Property Investments' 
      },
      subject: 'Your Inflation Report – See How Much Value You\'ve Lost',
      html: htmlContent,
    };

    try {
      // Send email using SendGrid client library
      await sgMail.send(msg);
      console.log(`Inflation calculator report email sent to ${email}`);
      return { success: true };
    } catch (sendError: any) {
      console.error('SendGrid send error:', sendError);
      if (sendError.response) {
        console.error('SendGrid error details:', sendError.response.body);
        return { 
          success: false, 
          error: `SendGrid send error: ${JSON.stringify(sendError.response.body)}` 
        };
      }
      return { 
        success: false, 
        error: sendError.message || 'Unknown SendGrid error' 
      };
    }
  } catch (error) {
    console.error('Error sending inflation report email:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}