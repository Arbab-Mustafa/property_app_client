// API Configuration
const isDevelopment = import.meta.env.DEV;

export const API_CONFIG = {
  // Use local backend in development, production API in production
  BASE_URL: isDevelopment ? "http://localhost:8000" : "",
  ENDPOINTS: {
    NEWSLETTER: "/api/newsletter",
    CONTACT: "/api/contact",
    INFLATION: "/api/inflation",
    DEAL_SOURCING: "/api/send-deal-lead",
    TEST: "/api/test",
  },
};

// Helper function to build full API URLs
export function getApiUrl(endpoint: string): string {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
}

// Generic API request function
export async function apiRequest(method: string, endpoint: string, data?: any) {
  const url = getApiUrl(endpoint);

  console.log(`🌐 API ${method} ${url}`, data ? data : "");

  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (data && (method === "POST" || method === "PUT" || method === "PATCH")) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    console.log(`✅ API Response:`, result);
    return result;
  } catch (error) {
    console.error(`❌ API Error:`, error);
    throw error;
  }
}
