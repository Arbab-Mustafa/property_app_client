import express from 'express';

const router = express.Router();

// Function to calculate inflation-adjusted amount
function calculateInflationAdjustedAmount(amount: number, year: number, month: number): number {
  // Using UK's current inflation rate of 2.6% (as per the website)
  const inflationRate = 0.026;
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  
  // Calculate years difference including partial years for months
  const yearsDiff = (currentYear - year) + ((currentMonth - month) / 12);
  
  // Calculate the inflation-adjusted amount
  const adjustedAmount = amount * Math.pow(1 + inflationRate, yearsDiff);
  
  // Round to 2 decimal places
  return parseFloat(adjustedAmount.toFixed(2));
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
      source
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

    // Calculate inflation adjusted amount
    const adjustedAmount = calculateInflationAdjustedAmount(numericAmount, numericYear, numericMonth);
    
    // Calculate growth rate needed to keep up with inflation
    const yearsDiff = (new Date().getFullYear() - numericYear) + 
                      ((new Date().getMonth() + 1 - numericMonth) / 12);
    const growthRate = (Math.pow(adjustedAmount / numericAmount, 1 / yearsDiff) - 1) * 100;

    // Store submission data for later integration with Baserow
    // This would be where we'd save to a database or external service
    
    console.log('Calculated results:', {
      originalAmount: numericAmount,
      adjustedAmount,
      growthRate,
      submissionDetails: {
        name,
        email,
        month: numericMonth,
        year: numericYear,
        source
      }
    });

    // Return the calculated results
    return res.json({
      success: true,
      data: {
        originalValue: numericAmount,
        todayValue: adjustedAmount,
        growthRate: parseFloat(growthRate.toFixed(2))
      }
    });
  } catch (err) {
    console.error('Error processing inflation calculation:', err);
    res.status(500).json({ 
      success: false,
      error: 'Internal server error processing your request' 
    });
  }
});

export default router;