
export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

export interface LessonContent {
  type: 'text' | 'image' | 'video' | 'interactive';
  content: string;
  title?: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  estimatedTime: number; // in minutes
  content: LessonContent[];
  quiz?: Quiz;
}

export interface LearningModule {
  id: string;
  title: string;
  description: string;
  icon: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number; // total time in minutes
  lessons: Lesson[];
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  requirement: string;
}

export const badges: Badge[] = [
  {
    id: 'first-lesson',
    title: 'First Steps',
    description: 'Complete your first lesson',
    icon: '🎯',
    color: 'bg-blue-500',
    requirement: 'Complete 1 lesson'
  },
  {
    id: 'quiz-master',
    title: 'Quiz Master',
    description: 'Score 100% on a quiz',
    icon: '🏆',
    color: 'bg-yellow-500',
    requirement: 'Perfect quiz score'
  },
  {
    id: 'inflation-expert',
    title: 'Inflation Expert',
    description: 'Master inflation concepts',
    icon: '📈',
    color: 'bg-green-500',
    requirement: 'Complete inflation module'
  },
  {
    id: 'compound-champion',
    title: 'Compound Champion',
    description: 'Understand compound interest',
    icon: '💰',
    color: 'bg-purple-500',
    requirement: 'Complete compound interest module'
  },
  {
    id: 'risk-assessor',
    title: 'Risk Assessor',
    description: 'Master risk assessment',
    icon: '⚖️',
    color: 'bg-red-500',
    requirement: 'Complete risk assessment module'
  },
  {
    id: 'property-pro',
    title: 'Property Pro',
    description: 'Complete all property modules',
    icon: '🏠',
    color: 'bg-indigo-500',
    requirement: 'Complete all property modules'
  }
];

export const learningModules: LearningModule[] = [
  {
    id: 'inflation-basics',
    title: 'Understanding Inflation',
    description: 'Learn how inflation affects your money and investments over time',
    icon: '📈',
    difficulty: 'beginner',
    estimatedTime: 25,
    lessons: [
      {
        id: 'what-is-inflation',
        title: 'What is Inflation?',
        description: 'Basic concepts of inflation and its impact',
        estimatedTime: 10,
        content: [
          {
            type: 'text',
            title: 'Definition of Inflation',
            content: 'Inflation is the rate at which the general level of prices for goods and services rises, eroding the purchasing power of money. When inflation occurs, each unit of currency buys fewer goods and services than it did before.'
          },
          {
            type: 'text',
            title: 'Real-World Example',
            content: 'Imagine you could buy a coffee for £2.00 in 2020. With 3% annual inflation, that same coffee would cost £2.18 in 2023. Your £2.00 from 2020 can no longer buy that coffee - it has lost purchasing power.'
          },
          {
            type: 'text',
            title: 'Why Inflation Matters for Investors',
            content: 'For property investors, inflation can be both a challenge and an opportunity. While it erodes cash savings, property values often rise with inflation, making real estate a potential hedge against inflation.'
          }
        ],
        quiz: {
          id: 'inflation-basics-quiz',
          title: 'Inflation Basics Quiz',
          description: 'Test your understanding of inflation concepts',
          questions: [
            {
              id: 'q1',
              question: 'What is inflation?',
              options: [
                'The rate at which prices decrease',
                'The rate at which prices increase',
                'The rate at which money grows',
                'The rate at which property values fall'
              ],
              correctAnswer: 1,
              explanation: 'Inflation is the rate at which the general level of prices for goods and services rises.'
            },
            {
              id: 'q2',
              question: 'How does inflation affect purchasing power?',
              options: [
                'It increases purchasing power',
                'It has no effect on purchasing power',
                'It decreases purchasing power',
                'It only affects property prices'
              ],
              correctAnswer: 2,
              explanation: 'Inflation erodes purchasing power, meaning your money buys less than it did before.'
            }
          ]
        }
      },
      {
        id: 'inflation-impact-property',
        title: 'Inflation and Property Investment',
        description: 'How inflation affects property values and rental income',
        estimatedTime: 15,
        content: [
          {
            type: 'text',
            title: 'Property as an Inflation Hedge',
            content: 'Property is often considered a hedge against inflation because property values and rental income typically rise with inflation. This helps preserve and potentially increase your wealth in real terms.'
          },
          {
            type: 'text',
            title: 'Rental Income Growth',
            content: 'During inflationary periods, landlords can often increase rents to match rising costs, helping maintain the real value of rental income. This makes buy-to-let properties particularly attractive during high inflation.'
          },
          {
            type: 'text',
            title: 'Mortgage Benefits',
            content: 'If you have a fixed-rate mortgage, inflation can work in your favor. You pay back the loan with money that is worth less than when you borrowed it, effectively reducing the real cost of your debt.'
          }
        ]
      }
    ]
  },
  {
    id: 'compound-interest',
    title: 'The Power of Compound Interest',
    description: 'Discover how compound interest can dramatically grow your wealth over time',
    icon: '💰',
    difficulty: 'beginner',
    estimatedTime: 20,
    lessons: [
      {
        id: 'compound-basics',
        title: 'Compound Interest Fundamentals',
        description: 'Understanding the basics of compound interest',
        estimatedTime: 12,
        content: [
          {
            type: 'text',
            title: 'What is Compound Interest?',
            content: 'Compound interest is the interest calculated on the initial principal plus all accumulated interest from previous periods. Einstein allegedly called it "the eighth wonder of the world" - those who understand it earn it, those who don\'t pay it.'
          },
          {
            type: 'text',
            title: 'The Magic of Time',
            content: 'The power of compound interest lies in time. The longer your money is invested, the more dramatic the compounding effect becomes. Starting early, even with small amounts, can lead to substantial wealth over time.'
          },
          {
            type: 'text',
            title: 'Property Investment Example',
            content: 'A property worth £200,000 appreciating at 5% annually becomes worth £325,779 after 10 years and £530,660 after 20 years. The acceleration in growth is due to compound appreciation.'
          }
        ],
        quiz: {
          id: 'compound-basics-quiz',
          title: 'Compound Interest Quiz',
          description: 'Test your understanding of compound interest',
          questions: [
            {
              id: 'q1',
              question: 'What makes compound interest so powerful?',
              options: [
                'High interest rates',
                'Large initial investments',
                'Time and reinvestment of returns',
                'Government subsidies'
              ],
              correctAnswer: 2,
              explanation: 'Time and the reinvestment of returns create the compounding effect that makes wealth grow exponentially.'
            },
            {
              id: 'q2',
              question: 'In property investment, what demonstrates compound growth?',
              options: [
                'Monthly rental income',
                'Property appreciation over time',
                'Mortgage payments',
                'Property maintenance costs'
              ],
              correctAnswer: 1,
              explanation: 'Property appreciation compounds as the property value grows, and future growth is calculated on the new, higher value.'
            }
          ]
        }
      }
    ]
  },
  {
    id: 'property-investment-basics',
    title: 'Property Investment Fundamentals',
    description: 'Essential concepts for successful property investment',
    icon: '🏠',
    difficulty: 'intermediate',
    estimatedTime: 35,
    lessons: [
      {
        id: 'property-types',
        title: 'Types of Property Investment',
        description: 'Different strategies for property investment',
        estimatedTime: 15,
        content: [
          {
            type: 'text',
            title: 'Buy-to-Let Investment',
            content: 'Buy-to-let involves purchasing property to rent out to tenants. This provides regular rental income and potential capital appreciation. It\'s the most common form of property investment for beginners.'
          },
          {
            type: 'text',
            title: 'Property Development',
            content: 'Property development involves buying property to improve and resell for profit. This includes renovations, conversions, or new builds. Higher risk but potentially higher returns.'
          },
          {
            type: 'text',
            title: 'Commercial Property',
            content: 'Commercial property investment involves office buildings, retail spaces, or industrial properties. These often provide longer leases and higher yields but require more capital and expertise.'
          }
        ]
      },
      {
        id: 'location-analysis',
        title: 'Location Analysis',
        description: 'How to evaluate property locations for investment',
        estimatedTime: 20,
        content: [
          {
            type: 'text',
            title: 'The Golden Rule: Location, Location, Location',
            content: 'Location is the most critical factor in property investment. A good location can make up for other deficiencies, while a poor location can doom even the best property.'
          },
          {
            type: 'text',
            title: 'Key Location Factors',
            content: 'Consider transport links, local amenities, schools, employment opportunities, crime rates, and planned developments. Areas with improving infrastructure often see strong capital growth.'
          },
          {
            type: 'text',
            title: 'Emerging vs Established Areas',
            content: 'Established areas offer stability and proven track records but may have limited growth potential. Emerging areas offer higher growth potential but carry more risk.'
          }
        ]
      }
    ]
  },
  {
    id: 'risk-assessment',
    title: 'Investment Risk Assessment',
    description: 'Learn to identify, evaluate, and manage investment risks',
    icon: '⚖️',
    difficulty: 'intermediate',
    estimatedTime: 30,
    lessons: [
      {
        id: 'types-of-risk',
        title: 'Understanding Investment Risks',
        description: 'Different types of risks in property investment',
        estimatedTime: 15,
        content: [
          {
            type: 'text',
            title: 'Market Risk',
            content: 'Market risk is the possibility that property values will decline due to economic conditions, interest rate changes, or local market factors. This affects both rental income and capital values.'
          },
          {
            type: 'text',
            title: 'Tenant Risk',
            content: 'Tenant risk includes vacancy periods, non-payment of rent, and property damage. Good tenant screening and property management can minimize these risks.'
          },
          {
            type: 'text',
            title: 'Liquidity Risk',
            content: 'Property is less liquid than stocks or bonds. You may not be able to sell quickly if you need cash urgently, or you may have to accept a lower price for a quick sale.'
          }
        ],
        quiz: {
          id: 'risk-types-quiz',
          title: 'Risk Types Quiz',
          description: 'Test your knowledge of investment risks',
          questions: [
            {
              id: 'q1',
              question: 'What is market risk in property investment?',
              options: [
                'The risk of finding bad tenants',
                'The risk of property values declining',
                'The risk of high maintenance costs',
                'The risk of mortgage rate changes'
              ],
              correctAnswer: 1,
              explanation: 'Market risk refers to the possibility that property values will decline due to economic or market conditions.'
            },
            {
              id: 'q2',
              question: 'What is liquidity risk?',
              options: [
                'The risk of flooding',
                'The risk of not being able to sell quickly',
                'The risk of rental void periods',
                'The risk of property damage'
              ],
              correctAnswer: 1,
              explanation: 'Liquidity risk is the difficulty of converting an investment to cash quickly without affecting its price.'
            }
          ]
        }
      },
      {
        id: 'risk-management',
        title: 'Risk Management Strategies',
        description: 'How to mitigate and manage investment risks',
        estimatedTime: 15,
        content: [
          {
            type: 'text',
            title: 'Diversification',
            content: 'Don\'t put all your money in one property or one area. Spread investments across different property types, locations, and even asset classes to reduce overall risk.'
          },
          {
            type: 'text',
            title: 'Insurance and Legal Protection',
            content: 'Appropriate insurance coverage, including buildings, contents, and landlord insurance, protects against various risks. Legal protection insurance can cover tenant disputes.'
          },
          {
            type: 'text',
            title: 'Financial Cushions',
            content: 'Maintain cash reserves for void periods, maintenance, and unexpected expenses. A good rule of thumb is 3-6 months of mortgage and running costs.'
          }
        ]
      }
    ]
  }
];

export const leaderboardData = [
  { rank: 1, name: "Sarah M.", score: 2850, badges: 6 },
  { rank: 2, name: "James L.", score: 2640, badges: 5 },
  { rank: 3, name: "Emma K.", score: 2420, badges: 4 },
  { rank: 4, name: "David R.", score: 2180, badges: 4 },
  { rank: 5, name: "Lisa P.", score: 1950, badges: 3 },
  { rank: 6, name: "Mike T.", score: 1820, badges: 3 },
  { rank: 7, name: "Anna S.", score: 1650, badges: 2 },
  { rank: 8, name: "Tom W.", score: 1480, badges: 2 },
  { rank: 9, name: "Kate B.", score: 1320, badges: 2 },
  { rank: 10, name: "Alex H.", score: 1150, badges: 1 }
];
