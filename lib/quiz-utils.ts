import { QuizQuestion, QuizStats } from "@/lib/types";

const STORAGE_KEY = "accounting-quiz-stats";

export function shuffleQuestions(questions: QuizQuestion[], limit = 10): QuizQuestion[] {
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, limit);
}

export function getQuizStats(): QuizStats {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

export function saveQuizResult(category: string, score: number, total: number): void {
  try {
    const stats = getQuizStats();
    const existing = stats[category];
    stats[category] = {
      attempts: (existing?.attempts || 0) + 1,
      bestScore: Math.max(existing?.bestScore || 0, score),
      bestTotal: total,
      lastAttempt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch {
    // localStorage unavailable
  }
}
