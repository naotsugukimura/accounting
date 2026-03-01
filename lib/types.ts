// ==========================================
// Learning Content Types
// ==========================================

export type TermDefinition = {
  term: string;
  reading?: string;
  english?: string;
  definition: string;
  formula?: string;
};

export type DiagramItem = {
  label: string;
  sublabel?: string;
  color: string;
  children?: DiagramItem[];
};

export type ContentSection = {
  title: string;
  content: string;
  terms?: TermDefinition[];
};

// ==========================================
// Calculator Types
// ==========================================

export type FinancialInputs = {
  revenue: number;
  cogs: number;
  operatingIncome: number;
  netIncome: number;
  totalAssets: number;
  currentAssets: number;
  inventory: number;
  currentLiabilities: number;
  totalLiabilities: number;
  equity: number;
  prevRevenue: number;
  prevNetIncome: number;
};

export type IndicatorCategory = "profitability" | "safety" | "efficiency" | "growth";

export type HealthLevel = "good" | "caution" | "warning" | "danger";

export type IndicatorDefinition = {
  id: string;
  name: string;
  nameEnglish: string;
  category: IndicatorCategory;
  formula: string;
  unit: string;
  calculate: (inputs: FinancialInputs) => number | null;
  getHealth: (value: number) => HealthLevel;
  thresholds: { good: string; caution: string; warning: string };
  description: string;
};

export type CalculatedIndicator = {
  definition: IndicatorDefinition;
  value: number | null;
  health: HealthLevel | null;
};

// ==========================================
// Quiz Types
// ==========================================

export type QuestionType = "multiple_choice" | "fill_in_blank";

export type QuizQuestion = {
  id: string;
  type: QuestionType;
  category:
    | "pl"
    | "bs"
    | "cf"
    | "indicators"
    | "case-study"
    | "advanced-accounting-1"
    | "advanced-accounting-2"
    | "advanced-accounting-3"
    | "business-strategy";
  question: string;
  options?: string[];
  correctAnswer: string;
  correctIndex?: number;
  acceptableAnswers?: string[];
  explanation: string;
  tags?: string[];
  session?: number;
};

export type AnswerResult = {
  questionId: string;
  question: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
};

export type QuizStats = {
  [category: string]: {
    attempts: number;
    bestScore: number;
    bestTotal: number;
    lastAttempt: string;
  };
};

// ==========================================
// Company Analysis Types
// ==========================================

export type PLStatement = {
  revenue: number;
  costOfSales: number;
  grossProfit: number;
  sellingAdminExpenses: number;
  operatingProfit: number;
  nonOperatingBalance: number;
  ordinaryProfit: number;
  extraordinaryBalance: number;
  taxExpense: number;
  netIncome: number;
};

export type BSStatement = {
  cash: number;
  receivables: number;
  inventory: number;
  otherCurrentAssets: number;
  currentAssets: number;
  nonCurrentAssets: number;
  totalAssets: number;
  currentLiabilities: number;
  nonCurrentLiabilities: number;
  totalLiabilities: number;
  equity: number;
};

export type CFStatement = {
  operatingCF: number;
  investingCF: number;
  financingCF: number;
  netCashChange: number;
  endingCash: number;
};

export type PhaseType = "good" | "warning" | "crisis";

export type YearlyFinancials = {
  fiscalYear: number;
  label: string;
  phase: PhaseType;
  pl: PLStatement;
  bs: BSStatement;
  cf: CFStatement;
  narrativePoints: string[];
};

export type CompanyData = {
  id: string;
  nameJa: string;
  industry: string;
  description: string;
  years: YearlyFinancials[];
  overallNarrative: string;
};

export type CaseStudyQuestion = QuizQuestion & {
  companyId: string;
  targetYears: number[];
  focusStatement: "PL" | "BS" | "CF" | "MULTI";
  focusMetrics: string[];
  difficulty: "basic" | "intermediate" | "advanced";
  hint?: string;
};

// Chart helper types
export type WaterfallDataPoint = {
  name: string;
  base: number;
  value: number;
  type: "positive" | "negative" | "subtotal" | "end" | "loss";
  displayValue: number;
};

export type CFChartDataPoint = {
  year: string;
  operating: number;
  investing: number;
  financing: number;
  netChange: number;
};

export type BSChartDataPoint = {
  period: string;
  side: "assets" | "liabilities";
  cash: number;
  receivables: number;
  inventory: number;
  otherCurrent: number;
  nonCurrentAssets: number;
  currentLiabilities: number;
  nonCurrentLiabilities: number;
  equity: number;
};
