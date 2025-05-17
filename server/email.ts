// Use fetch (already available) to send emails via SendGrid API
import fetch from 'node-fetch';

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
      yearsDiff
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
    const formattedPercentageIncrease = data.percentageIncrease.toFixed(2);
    const formattedAnnualGrowthRate = data.annualGrowthRate.toFixed(1);
    const formattedYearsDiff = data.yearsDiff.toFixed(1);
    
    // Create the enhanced email HTML content based on the spreadsheet format
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; padding: 20px; border: 1px solid #e5e5e5; border-radius: 5px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #f97316; margin-bottom: 10px;">Property Investments</h1>
          <p style="font-size: 18px; color: #333;">Detailed Inflation Calculator Results</p>
        </div>
        
        <p>Hello ${name},</p>
        
        <p>Thank you for using our Inflation Calculator. Here is your detailed inflation report:</p>
        
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; font-weight: bold; width: 50%;">Original Amount:</td>
              <td style="padding: 8px;">${formattedOriginalAmount}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">Start Date:</td>
              <td style="padding: 8px;">${monthName} ${data.startYear}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">End Date:</td>
              <td style="padding: 8px;">Present (${data.endYear})</td>
            </tr>
            <tr style="background-color: #f0f0f0;">
              <td style="padding: 8px; font-weight: bold;">Future Value (Inflation-Adjusted Amount):</td>
              <td style="padding: 8px; font-weight: bold; color: #f97316;">${formattedTodayValue}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">Loss in Value (£):</td>
              <td style="padding: 8px;">-${formattedLossInValue}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">Percentage Loss Over Time (%):</td>
              <td style="padding: 8px;">100%</td>
            </tr>
            <tr style="background-color: #f0f0f0;">
              <td style="padding: 8px; font-weight: bold;">Percentage increase in that time:</td>
              <td style="padding: 8px; font-weight: bold;">${formattedPercentageIncrease}%</td>
            </tr>
            <tr style="background-color: #f0f0f0;">
              <td style="padding: 8px; font-weight: bold;">To keep up with inflation, money should have grown by:</td>
              <td style="padding: 8px; font-weight: bold;">${formattedAnnualGrowthRate}% per year</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">Time period:</td>
              <td style="padding: 8px;">${formattedYearsDiff} years</td>
            </tr>
          </table>
        </div>
        
        <div style="margin: 25px 0; padding: 15px; border-left: 4px solid #f97316; background-color: #fff8f3;">
          <p style="margin: 0 0 10px 0;"><strong>What this means:</strong></p>
          <p>The cost of goods and services increased by <strong>${formattedPercentageIncrease}%</strong> over this period.</p>
          <p>Your ${formattedOriginalAmount} would need to have grown by an average of <strong>${formattedAnnualGrowthRate}%</strong> per year, just to have kept pace with inflation. If you achieved a lower rate of growth, the real value of your money would have fallen.</p>
          <p style="margin-top: 10px; font-size: 0.9em;">*Figures based on the Retail Price Index (RPI) as of ${data.endYear}. Source: Office for National Statistics.</p>
        </div>
        
        <div style="background-color: #f97316; color: white; padding: 20px; border-radius: 5px; margin: 25px 0;">
          <h2 style="margin-top: 0; font-size: 20px;">How Property Investments Can Help</h2>
          <p>At Property Investments, we consistently help our clients achieve returns that significantly outperform inflation through carefully selected property investments.</p>
          <p>Our average annual returns range from 8-12%, providing protection against inflation while building real wealth over time.</p>
          <p><a href="https://kr-properties.co.uk/invest" style="color: white; font-weight: bold; text-decoration: underline;">Learn more about our investment opportunities →</a></p>
        </div>
        
        <p>If you'd like to discuss how we can help you achieve better returns on your investments, please contact us for a personal consultation.</p>
        
        <div style="text-align: center; margin: 30px 0 20px;">
          <a href="https://kr-properties.co.uk/contact" style="display: inline-block; background-color: #f97316; color: white; text-decoration: none; padding: 12px 25px; border-radius: 4px; font-weight: bold;">Book a Consultation</a>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e5e5; color: #666; font-size: 12px; text-align: center;">
          <p>Property Investments Ltd</p>
          <p>Email: info@kr-properties.co.uk | Phone: 02036332783</p>
          <p>© 2025 Property Investments. All rights reserved.</p>
        </div>
      </div>
    `;

    // Create SendGrid API payload
    const sendgridPayload = {
      personalizations: [
        {
          to: [{ email: email, name: name }],
          subject: 'Your Property Investment Inflation Calculator Results',
        }
      ],
      from: { email: 'info@kr-properties.co.uk', name: 'Property Investments' },
      content: [
        {
          type: 'text/html',
          value: htmlContent
        }
      ]
    };

    // Send request to SendGrid API
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${sendgridApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sendgridPayload)
    });

    // Check response
    if (response.ok) {
      console.log(`Inflation calculator report email sent to ${email}`);
      return { success: true };
    } else {
      const errorText = await response.text();
      console.error('SendGrid API error:', errorText);
      return { success: false, error: `SendGrid API error: ${response.status} - ${errorText}` };
    }
  } catch (error) {
    console.error('Error sending inflation report email:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}