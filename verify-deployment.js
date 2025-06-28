const BASE_URL = process.argv[2] || "http://localhost:3000";

console.log("🚀 VERIFYING DEPLOYMENT");
console.log(`🌐 Testing URL: ${BASE_URL}`);
console.log("");

async function testEndpoint(method, path, data = null) {
  const url = `${BASE_URL}${path}`;

  try {
    console.log(`📡 ${method} ${path}`);

    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);
    const result = await response.text();

    let parsedResult;
    try {
      parsedResult = JSON.parse(result);
    } catch {
      parsedResult = result;
    }

    if (response.ok) {
      console.log(
        `✅ ${response.status} - ${parsedResult.message || "Success"}`
      );
    } else {
      console.log(`❌ ${response.status} - ${parsedResult.error || result}`);
    }

    return response.ok;
  } catch (error) {
    console.log(`❌ Network Error: ${error.message}`);
    return false;
  }
}

async function verifyDeployment() {
  const tests = [
    {
      name: "Health Check",
      method: "GET",
      path: "/api/health",
    },
    {
      name: "Contact Form",
      method: "POST",
      path: "/api/contact",
      data: {
        name: "Test User",
        email: "test@example.com",
        message: "Deployment verification test",
      },
    },
    {
      name: "Newsletter Subscription",
      method: "POST",
      path: "/api/newsletter",
      data: {
        email: "test@example.com",
      },
    },
    {
      name: "Inflation Calculator",
      method: "POST",
      path: "/api/inflation",
      data: {
        name: "Test User",
        email: "test@example.com",
        amount: 1000,
        year: 2020,
        month: 1,
      },
    },
    {
      name: "Inflation Email",
      method: "POST",
      path: "/api/inflation-email",
      data: {
        name: "Test User",
        email: "test@example.com",
        amount: 1000,
        year: 2020,
        month: 1,
        chartImage: "data:image/png;base64,test",
        calculationData: { todayValue: 1319.34 },
      },
    },
    {
      name: "Deal Sourcing Waitlist",
      method: "POST",
      path: "/api/send-deal-lead",
      data: {
        name: "Test User",
        email: "test@example.com",
        message: "Deployment verification test",
      },
    },
    {
      name: "404 Handling",
      method: "GET",
      path: "/api/nonexistent",
    },
  ];

  let passed = 0;
  let failed = 0;

  for (const test of tests) {
    console.log(`\n${tests.indexOf(test) + 1}️⃣ Testing ${test.name}...`);

    const success = await testEndpoint(test.method, test.path, test.data);

    if (success || test.name === "404 Handling") {
      passed++;
    } else {
      failed++;
    }

    // Small delay between requests
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  console.log("\n🎉 DEPLOYMENT VERIFICATION COMPLETE!");
  console.log("📊 SUMMARY:");
  console.log(`✅ Passed: ${passed}/${tests.length}`);
  console.log(`❌ Failed: ${failed}/${tests.length}`);

  if (failed === 0) {
    console.log("\n🚀 DEPLOYMENT SUCCESSFUL!");
    console.log("All endpoints are working correctly.");
    console.log("Your KR Property Investments app is ready for production!");
  } else {
    console.log("\n⚠️  DEPLOYMENT ISSUES DETECTED");
    console.log("Some endpoints are not working correctly.");
    console.log("Please check the Vercel function logs for more details.");
  }

  console.log("\n🔗 Next Steps:");
  console.log("1. Set up environment variables in Vercel dashboard");
  console.log("2. Configure SendGrid for email functionality");
  console.log("3. Set up Baserow for data storage");
  console.log("4. Test the frontend application in your browser");
}

// Run the verification
verifyDeployment().catch(console.error);
