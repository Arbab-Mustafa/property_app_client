// API Configuration with environment variables
const isDevelopment = import.meta.env.DEV;

export const API_CONFIG = {
  // Use environment variable for API base URL
  BASE_URL:
    import.meta.env.VITE_API_BASE_URL ||
    (isDevelopment ? "http://localhost:8000" : ""),
  ENDPOINTS: {
    // Core APIs
    NEWSLETTER: "/api/newsletter",
    CONTACT: "/api/contact",
    INFLATION: "/api/inflation",
    INFLATION_EMAIL: "/api/inflation-email",
    DEAL_SOURCING: "/api/send-deal-lead",
    TEST: "/api/test",

    // Learning APIs
    LEARNING_PROGRESS: "/api/learning/progress",
    LEARNING_ACHIEVEMENTS: "/api/learning/achievements",
    LEARNING_QUIZ_RESULTS: "/api/learning/quiz-results",
  },
};

// Baserow API token from environment
export const BASEROW_API_TOKEN = import.meta.env.VITE_BASEROW_API_TOKEN;

console.log("🔧 Frontend API Configuration:");
console.log("🌍 Environment:", isDevelopment ? "development" : "production");
console.log("🔗 API Base URL:", API_CONFIG.BASE_URL);
console.log(
  "📊 Baserow Token:",
  BASEROW_API_TOKEN ? "✅ Configured" : "❌ Missing"
);

// Helper to get full API URL
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

// Specific API functions for learning features
export const learningAPI = {
  // Learning Progress
  getProgress: (userId: string) =>
    apiRequest("GET", `${API_CONFIG.ENDPOINTS.LEARNING_PROGRESS}/${userId}`),

  createProgress: (data: {
    userId: string;
    moduleId: string;
    completed?: string;
    score?: string;
    timeSpent?: string;
  }) => apiRequest("POST", API_CONFIG.ENDPOINTS.LEARNING_PROGRESS, data),

  updateProgress: (
    userId: string,
    moduleId: string,
    data: { completed?: string; score?: string; timeSpent?: string }
  ) =>
    apiRequest(
      "PUT",
      `${API_CONFIG.ENDPOINTS.LEARNING_PROGRESS}/${userId}/${moduleId}`,
      data
    ),

  // Achievements
  getAchievements: (userId: string) =>
    apiRequest(
      "GET",
      `${API_CONFIG.ENDPOINTS.LEARNING_ACHIEVEMENTS}/${userId}`
    ),

  createAchievement: (data: {
    userId: string;
    badgeId: string;
    title: string;
    description: string;
  }) => apiRequest("POST", API_CONFIG.ENDPOINTS.LEARNING_ACHIEVEMENTS, data),

  // Quiz Results
  getQuizResults: (userId: string) =>
    apiRequest(
      "GET",
      `${API_CONFIG.ENDPOINTS.LEARNING_QUIZ_RESULTS}/${userId}`
    ),

  createQuizResult: (data: {
    userId: string;
    quizId: string;
    score: number;
    totalQuestions: number;
    answers: any;
  }) => apiRequest("POST", API_CONFIG.ENDPOINTS.LEARNING_QUIZ_RESULTS, data),
};
