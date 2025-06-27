// Simple test for the API handler
import handler from "./index.js";

// Mock request and response objects
const createMockReq = (method, url, body = {}) => ({
  method,
  url,
  body,
});

const createMockRes = () => {
  const res = {
    statusCode: 200,
    headers: {},
    body: null,

    status(code) {
      this.statusCode = code;
      return this;
    },

    json(data) {
      this.body = JSON.stringify(data);
      return this;
    },

    setHeader(key, value) {
      this.headers[key] = value;
      return this;
    },

    end() {
      return this;
    },
  };
  return res;
};

async function runTests() {
  // Test health endpoint
  console.log("🧪 Testing health endpoint...");
  const healthReq = createMockReq("GET", "/api/health");
  const healthRes = createMockRes();

  try {
    await handler(healthReq, healthRes);
    console.log(
      "✅ Health endpoint response:",
      healthRes.statusCode,
      JSON.parse(healthRes.body)
    );
  } catch (error) {
    console.error("❌ Health endpoint failed:", error);
  }

  // Test inflation endpoint
  console.log("\n🧪 Testing inflation endpoint...");
  const inflationReq = createMockReq("POST", "/api/inflation", {
    amount: 1000,
    year: 2020,
    month: 1,
  });
  const inflationRes = createMockRes();

  try {
    await handler(inflationReq, inflationRes);
    console.log(
      "✅ Inflation endpoint response:",
      inflationRes.statusCode,
      JSON.parse(inflationRes.body)
    );
  } catch (error) {
    console.error("❌ Inflation endpoint failed:", error);
  }

  // Test 404
  console.log("\n🧪 Testing 404 endpoint...");
  const notFoundReq = createMockReq("GET", "/api/nonexistent");
  const notFoundRes = createMockRes();

  try {
    await handler(notFoundReq, notFoundRes);
    console.log(
      "✅ 404 endpoint response:",
      notFoundRes.statusCode,
      JSON.parse(notFoundRes.body)
    );
  } catch (error) {
    console.error("❌ 404 endpoint failed:", error);
  }

  console.log("\n🎉 All tests completed!");
}

// Run the tests
runTests().catch(console.error);
