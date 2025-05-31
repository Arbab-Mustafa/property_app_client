import express from 'express';
import { sendInflationReport } from './email';

const router = express.Router();

// RPI Index data from the spreadsheet (1987-2024)
const rpiIndexData: Record<number, number> = {
  1987: 101.9,
  1988: 106.9,
  1989: 115.2,
  1990: 126.1,
  1991: 133.50,
  1992: 138.5,
  1993: 140.7,
  1994: 144.1,
  1995: 149.1,
  1996: 152.7,
  1997: 157.5,
  1998: 162.9,
  1999: 165.4,
  2000: 170.3,
  2001: 173.3,
  2002: 176.2,
  2003: 181.3,
  2004: 186.7,
  2005: 192,
  2006: 198.1,
  2007: 206.6,
  2008: 214.8,
  2009: 213.7,
  2010: 223.6,
  2011: 235.2,
  2012: 242.7,
  2013: 250.1,
  2014: 256,
  2015: 258.5,
  2016: 263.1,
  2017: 272.5,
  2018: 281.6,
  2019: 288.8,
  2020: 293.1,
  2021: 305,
  2022: 340.3,
  2023: 373.3,
  2024: 386.7
};

// Function to calculate enhanced inflation statistics using RPI data
function calculateDetailedInflation(amount: number, startYear: number, month: number) {
  const currentYear = new Date().getFullYear();
  
  // Find the most recent year in our data
  const endYear = Math.min(currentYear, Math.max(...Object.keys(rpiIndexData).map(Number)));
  
  // Get RPI index values for start and end years
  let startRPI = rpiIndexData[startYear] || 0;
  const endRPI = rpiIndexData[endYear] || 0;
  
  // If we don't have exact RPI data, use our fallback calculation
  if (startRPI === 0 || endRPI === 0) {
    return calculateFallbackInflation(amount, startYear, month);
  }
  
  // Adjust for month (approximate by scaling between years)
  if (month > 1) {
    // If not January, interpolate between current and next year
    const monthFactor = (month - 1) / 12;
    const nextYearRPI = rpiIndexData[startYear + 1] || startRPI * 1.026; // Estimate if not available
    startRPI = startRPI + (monthFactor * (nextYearRPI - startRPI));
  }
  
  // Calculate inflation-adjusted amount based on RPI
  const inflationFactor = endRPI / startRPI;
  const adjustedAmount = amount * inflationFactor;
  
  // Calculate additional statistics
  const lossInValue = adjustedAmount - amount;
  const percentageLoss = 100; // Always 100% since we're showing what's needed to maintain the same value
  const percentageIncrease = (adjustedAmount / amount - 1) * 100;
  
  // Calculate years difference
  const yearsDiff = endYear - startYear + ((new Date().getMonth() + 1 - month) / 12);
  
  // Calculate required annual growth rate to keep up with inflation
  const annualGrowthRate = (Math.pow(adjustedAmount / amount, 1 / yearsDiff) - 1) * 100;
  
  return {
    originalValue: amount,
    todayValue: parseFloat(adjustedAmount.toFixed(2)),
    lossInValue: parseFloat(lossInValue.toFixed(2)),
    percentageLoss: Math.round(percentageLoss),
    percentageIncrease: parseFloat(percentageIncrease.toFixed(2)),
    annualGrowthRate: parseFloat(annualGrowthRate.toFixed(1)),
    startYear,
    endYear,
    yearsDiff: parseFloat(yearsDiff.toFixed(1))
  };
}

// Fallback method when RPI data is not available
function calculateFallbackInflation(amount: number, year: number, month: number) {
  // Using UK's current inflation rate of 2.6% (as per the website)
  const inflationRate = 0.026;
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  
  // Calculate years difference including partial years for months
  const yearsDiff = (currentYear - year) + ((currentMonth - month) / 12);
  
  // Calculate the inflation-adjusted amount
  const adjustedAmount = amount * Math.pow(1 + inflationRate, yearsDiff);
  
  // Calculate additional statistics
  const lossInValue = adjustedAmount - amount;
  const percentageLoss = 100; // Always 100% since we're showing what's needed to maintain the same value
  const percentageIncrease = (adjustedAmount / amount - 1) * 100;
  const annualGrowthRate = inflationRate * 100;
  
  return {
    originalValue: amount,
    todayValue: parseFloat(adjustedAmount.toFixed(2)),
    lossInValue: parseFloat(lossInValue.toFixed(2)),
    percentageLoss: Math.round(percentageLoss),
    percentageIncrease: parseFloat(percentageIncrease.toFixed(2)),
    annualGrowthRate: parseFloat(annualGrowthRate.toFixed(1)),
    startYear: year,
    endYear: currentYear,
    yearsDiff: parseFloat(yearsDiff.toFixed(1))
  };
}

// Legacy function for backward compatibility
function calculateInflationAdjustedAmount(amount: number, year: number, month: number): number {
  return calculateDetailedInflation(amount, year, month).todayValue;
}

router.post('/api/inflation', async (req, res) => {
  try {
    console.log('Received inflation calculator form submission:', req.body);
    
    const {
      name,
      email,
      amount,
      month,
      year,
      source,
      chartImage
    } = req.body;

    // Simple validation
    if (!amount || !month || !year) {
      return res.status(400).json({ 
        success: false,
        error: 'Missing required fields' 
      });
    }

    // Parse numerical values
    const numericAmount = parseFloat(amount);
    const numericYear = parseInt(year);
    const numericMonth = parseInt(month);

    if (isNaN(numericAmount) || isNaN(numericYear) || isNaN(numericMonth)) {
      return res.status(400).json({ 
        success: false,
        error: 'Invalid numerical values provided' 
      });
    }

    // Calculate detailed inflation statistics
    const inflationData = calculateDetailedInflation(numericAmount, numericYear, numericMonth);
    
    console.log('Calculated detailed inflation results:', {
      ...inflationData,
      submissionDetails: {
        name,
        email,
        month: numericMonth,
        year: numericYear,
        source
      }
    });

    // Note: Email will be sent separately with chart from the frontend after chart generation

    // Return the detailed inflation results
    return res.json({
      success: true,
      data: inflationData
    });
  } catch (err) {
    console.error('Error processing inflation calculation:', err);
    res.status(500).json({ 
      success: false,
      error: 'Internal server error processing your request' 
    });
  }
});

// Separate endpoint for sending email with chart image
router.post('/api/inflation-email', async (req, res) => {
  try {
    const {
      name,
      email,
      amount,
      month,
      year,
      chartImage,
      calculationData
    } = req.body;

    if (!email || !calculationData || !chartImage) {
      return res.status(400).json({ 
        success: false,
        error: 'Missing required data for email' 
      });
    }

    // Send email with chart image
    const emailResult = await sendInflationReport({
      name,
      email,
      amount: parseFloat(amount),
      month: parseInt(month),
      year: parseInt(year),
      todayValue: calculationData.todayValue,
      lossInValue: calculationData.lossInValue,
      percentageIncrease: calculationData.percentageIncrease,
      annualGrowthRate: calculationData.annualGrowthRate,
      startYear: calculationData.startYear,
      endYear: calculationData.endYear,
      yearsDiff: calculationData.yearsDiff,
      chartImage: chartImage
    });

    if (emailResult.success) {
      console.log(`Email with chart sent to ${email}`);
      res.json({ success: true, message: 'Email sent successfully' });
    } else {
      console.error(`Failed to send email: ${emailResult.error}`);
      res.status(500).json({ success: false, error: emailResult.error });
    }
  } catch (error) {
    console.error('Error sending email with chart:', error);
    res.status(500).json({ success: false, error: 'Failed to send email' });
  }
});

export default router;