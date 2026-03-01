"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { quizCategories } from "@/data/quiz-questions";
import { getQuizStats } from "@/lib/quiz-utils";
import { QuizStats } from "@/lib/types";

export default function QuizPage() {
  const [stats, setStats] = useState<QuizStats>({});

  useEffect(() => {
    setStats(getQuizStats());
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">クイズ・練習問題</h1>
      <p className="text-gray-600 mb-8">
        カテゴリを選んで理解度をチェックしましょう。各カテゴリ10問ずつ出題されます。
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        {quizCategories.map((cat) => {
          const catStats = stats[cat.id];
          return (
            <Link
              key={cat.id}
              href={`/quiz/${cat.id}`}
              className="block bg-white rounded-2xl p-6 shadow-sm border-2 border-orange-100 hover:border-orange-300 hover:shadow-md transition-all"
            >
              <h2 className="text-lg font-bold text-gray-800 mb-1">{cat.name}</h2>
              <p className="text-sm text-gray-600 mb-3">{cat.description}</p>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>{cat.questionCount}問</span>
                {catStats && (
                  <>
                    <span>最高: {catStats.bestScore}/{catStats.bestTotal}</span>
                    <span>挑戦: {catStats.attempts}回</span>
                  </>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
