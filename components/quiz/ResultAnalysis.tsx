"use client";

import { QuizQuestion, AnswerResult } from "@/lib/types";

type Rank = "S" | "A" | "B" | "C" | "D";

type RankConfig = {
  label: string;
  color: string;
  bg: string;
  border: string;
  message: string;
  emoji: string;
};

const RANK_CONFIG: Record<Rank, RankConfig> = {
  S: {
    label: "S",
    color: "text-yellow-700",
    bg: "bg-yellow-50",
    border: "border-yellow-400",
    message: "完璧！トップクラスの理解度です",
    emoji: "🏆",
  },
  A: {
    label: "A",
    color: "text-green-700",
    bg: "bg-green-50",
    border: "border-green-400",
    message: "優秀！実務でも十分に活用できるレベルです",
    emoji: "⭐",
  },
  B: {
    label: "B",
    color: "text-blue-700",
    bg: "bg-blue-50",
    border: "border-blue-400",
    message: "良好！苦手分野を重点的に復習しましょう",
    emoji: "👍",
  },
  C: {
    label: "C",
    color: "text-orange-700",
    bg: "bg-orange-50",
    border: "border-orange-400",
    message: "もう少し！基礎から確認し直しましょう",
    emoji: "📚",
  },
  D: {
    label: "D",
    color: "text-red-700",
    bg: "bg-red-50",
    border: "border-red-400",
    message: "基礎固めが必要です。焦らず一歩ずつ！",
    emoji: "💪",
  },
};

const TAG_LABELS: Record<string, string> = {
  // Accounting tags
  ratio: "財務比率",
  pl: "損益計算書",
  bs: "貸借対照表",
  cf: "キャッシュフロー",
  industry: "業界分析",
  valuation: "企業価値評価",
  ma: "M&A",
  accounting: "会計処理",
  saas: "SaaS指標",
  // Business strategy tags
  "unit-economics": "ユニットエコノミクス",
  market: "市場分析",
  fundraising: "資金調達",
  product: "プロダクト戦略",
  competitive: "競争戦略",
  growth: "グロース戦略",
  "financial-modeling": "財務モデリング",
  strategy: "経営戦略",
};

function getTagLabel(tag: string): string {
  return TAG_LABELS[tag] ?? tag;
}

function getRank(percentage: number): Rank {
  if (percentage >= 90) return "S";
  if (percentage >= 75) return "A";
  if (percentage >= 60) return "B";
  if (percentage >= 40) return "C";
  return "D";
}

type TagStat = {
  tag: string;
  correct: number;
  total: number;
  rate: number;
};

function calcTagStats(
  answers: AnswerResult[],
  questions: QuizQuestion[]
): TagStat[] {
  const map: Record<string, { correct: number; total: number }> = {};

  answers.forEach((answer) => {
    const q = questions.find((q) => q.id === answer.questionId);
    if (!q?.tags) return;
    q.tags.forEach((tag) => {
      if (!map[tag]) map[tag] = { correct: 0, total: 0 };
      map[tag].total += 1;
      if (answer.isCorrect) map[tag].correct += 1;
    });
  });

  return Object.entries(map)
    .filter(([, s]) => s.total >= 1)
    .map(([tag, s]) => ({
      tag,
      correct: s.correct,
      total: s.total,
      rate: Math.round((s.correct / s.total) * 100),
    }))
    .sort((a, b) => b.total - a.total);
}

type Props = {
  answers: AnswerResult[];
  questions: QuizQuestion[];
  score: number;
  total: number;
};

export default function ResultAnalysis({ answers, questions, score, total }: Props) {
  const percentage = Math.round((score / total) * 100);
  const rank = getRank(percentage);
  const rankConfig = RANK_CONFIG[rank];
  const tagStats = calcTagStats(answers, questions);

  const strengths = tagStats.filter((t) => t.rate >= 70);
  const weaknesses = tagStats.filter((t) => t.rate < 50);

  return (
    <div className="space-y-6">
      {/* Rank Card */}
      <div
        className={`rounded-2xl p-6 border-2 ${rankConfig.bg} ${rankConfig.border} text-center`}
      >
        <div className="text-4xl mb-2">{rankConfig.emoji}</div>
        <div className={`text-7xl font-black mb-2 ${rankConfig.color}`}>
          {rank}
        </div>
        <p className="text-sm font-semibold text-gray-700">{rankConfig.message}</p>
        <p className="text-xs text-gray-500 mt-1">
          {total}問中 {score}問正解（{percentage}%）
        </p>
      </div>

      {/* Score Bar */}
      <div>
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>正答率</span>
          <span>{percentage}%</span>
        </div>
        <div className="bg-gray-200 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all duration-700 ${
              percentage >= 75
                ? "bg-green-500"
                : percentage >= 50
                ? "bg-orange-500"
                : "bg-red-500"
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>D</span>
          <span>C</span>
          <span>B</span>
          <span>A</span>
          <span>S</span>
        </div>
      </div>

      {/* Tag breakdown */}
      {tagStats.length > 0 && (
        <div>
          <h3 className="text-sm font-bold text-gray-700 mb-3">分野別スコア</h3>
          <div className="space-y-2">
            {tagStats.map((ts) => (
              <div key={ts.tag}>
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>{getTagLabel(ts.tag)}</span>
                  <span>
                    {ts.correct}/{ts.total} ({ts.rate}%)
                  </span>
                </div>
                <div className="bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      ts.rate >= 70
                        ? "bg-green-500"
                        : ts.rate >= 50
                        ? "bg-orange-400"
                        : "bg-red-500"
                    }`}
                    style={{ width: `${ts.rate}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Strengths / Weaknesses */}
      <div className="grid sm:grid-cols-2 gap-4">
        {strengths.length > 0 && (
          <div className="bg-green-50 rounded-xl p-4 border border-green-200">
            <h3 className="text-sm font-bold text-green-800 mb-2">✓ 強み</h3>
            <ul className="space-y-1">
              {strengths.map((ts) => (
                <li key={ts.tag} className="text-xs text-green-700">
                  {getTagLabel(ts.tag)}（{ts.rate}%正解）
                </li>
              ))}
            </ul>
          </div>
        )}
        {weaknesses.length > 0 && (
          <div className="bg-red-50 rounded-xl p-4 border border-red-200">
            <h3 className="text-sm font-bold text-red-800 mb-2">! 要復習</h3>
            <ul className="space-y-1">
              {weaknesses.map((ts) => (
                <li key={ts.tag} className="text-xs text-red-700">
                  {getTagLabel(ts.tag)}（{ts.rate}%正解）
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
