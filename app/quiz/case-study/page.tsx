"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import {
  caseStudyQuestions,
  caseStudyCategory,
} from "@/data/case-study-questions";
import { sakuraTrading } from "@/data/sakura-trading";
import { shuffleQuestions, saveQuizResult } from "@/lib/quiz-utils";
import { CaseStudyQuestion, AnswerResult } from "@/lib/types";

type Difficulty = "all" | "basic" | "intermediate" | "advanced";

const difficultyLabel: Record<string, string> = {
  all: "すべて",
  basic: "基礎",
  intermediate: "中級",
  advanced: "上級",
};

const focusLabel: Record<string, string> = {
  PL: "損益計算書",
  BS: "貸借対照表",
  CF: "キャッシュフロー",
  MULTI: "三表複合",
};

const companyPageLinks: Record<string, string> = {
  PL: "/company/pl",
  BS: "/company/bs",
  CF: "/company/cf",
  MULTI: "/company/summary",
};

// Reference data table for the question
function ReferenceTable({
  question,
}: {
  question: CaseStudyQuestion;
}) {
  const years = sakuraTrading.years.filter((y) =>
    question.targetYears.includes(y.fiscalYear)
  );

  const allMetricRows: {
    key: string;
    label: string;
    getValue: (y: (typeof years)[0]) => string;
    highlight?: (key: string) => boolean;
  }[] = [
    {
      key: "revenue",
      label: "売上高（百万円）",
      getValue: (y) => y.pl.revenue.toLocaleString(),
    },
    {
      key: "grossProfit",
      label: "売上総利益（百万円）",
      getValue: (y) => y.pl.grossProfit.toLocaleString(),
    },
    {
      key: "costOfSales",
      label: "売上原価（百万円）",
      getValue: (y) => y.pl.costOfSales.toLocaleString(),
    },
    {
      key: "grossProfitRate",
      label: "粗利率",
      getValue: (y) =>
        `${((y.pl.grossProfit / y.pl.revenue) * 100).toFixed(1)}%`,
    },
    {
      key: "operatingProfit",
      label: "営業利益（百万円）",
      getValue: (y) => y.pl.operatingProfit.toLocaleString(),
    },
    {
      key: "netIncome",
      label: "純利益（百万円）",
      getValue: (y) =>
        `${y.pl.netIncome >= 0 ? "+" : ""}${y.pl.netIncome.toLocaleString()}`,
    },
    {
      key: "inventory",
      label: "棚卸資産（百万円）",
      getValue: (y) => y.bs.inventory.toLocaleString(),
    },
    {
      key: "currentAssets",
      label: "流動資産（百万円）",
      getValue: (y) => y.bs.currentAssets.toLocaleString(),
    },
    {
      key: "currentLiabilities",
      label: "流動負債（百万円）",
      getValue: (y) => y.bs.currentLiabilities.toLocaleString(),
    },
    {
      key: "currentRatio",
      label: "流動比率",
      getValue: (y) =>
        `${((y.bs.currentAssets / y.bs.currentLiabilities) * 100).toFixed(0)}%`,
    },
    {
      key: "equity",
      label: "純資産（百万円）",
      getValue: (y) => y.bs.equity.toLocaleString(),
    },
    {
      key: "equityRatio",
      label: "自己資本比率",
      getValue: (y) =>
        `${((y.bs.equity / y.bs.totalAssets) * 100).toFixed(1)}%`,
    },
    {
      key: "operatingCF",
      label: "営業CF（百万円）",
      getValue: (y) =>
        `${y.cf.operatingCF >= 0 ? "+" : ""}${y.cf.operatingCF.toLocaleString()}`,
    },
    {
      key: "investingCF",
      label: "投資CF（百万円）",
      getValue: (y) =>
        `${y.cf.investingCF >= 0 ? "+" : ""}${y.cf.investingCF.toLocaleString()}`,
    },
    {
      key: "financingCF",
      label: "財務CF（百万円）",
      getValue: (y) =>
        `${y.cf.financingCF >= 0 ? "+" : ""}${y.cf.financingCF.toLocaleString()}`,
    },
  ];

  const displayRows = allMetricRows.filter((row) =>
    question.focusMetrics.some(
      (fm) =>
        row.key === fm ||
        (fm === "currentRatio" && row.key === "currentRatio") ||
        (fm === "equityRatio" && row.key === "equityRatio")
    )
  );

  if (displayRows.length === 0) return null;

  return (
    <div className="bg-gray-50 rounded-xl p-4 mb-4">
      <p className="text-xs font-bold text-gray-600 mb-2">
        参考データ（{focusLabel[question.focusStatement]}）
      </p>
      <table className="w-full text-xs">
        <thead>
          <tr>
            <th className="text-left text-gray-500 py-1">指標</th>
            {years.map((y) => (
              <th key={y.fiscalYear} className="text-right text-gray-500 py-1">
                {y.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {displayRows.map((row) => (
            <tr
              key={row.key}
              className="border-t border-gray-200"
            >
              <td className="py-1.5 text-gray-700">{row.label}</td>
              {years.map((y) => (
                <td
                  key={y.fiscalYear}
                  className="py-1.5 text-right font-medium text-gray-800"
                >
                  {row.getValue(y)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function CaseStudyQuizPage() {
  const [difficulty, setDifficulty] = useState<Difficulty>("all");
  const [questions, setQuestions] = useState<CaseStudyQuestion[]>([]);
  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState<AnswerResult[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const startQuiz = useCallback(() => {
    const filtered =
      difficulty === "all"
        ? caseStudyQuestions
        : caseStudyQuestions.filter((q) => q.difficulty === difficulty);
    const shuffled = shuffleQuestions(filtered, Math.min(filtered.length, 10));
    setQuestions(shuffled as CaseStudyQuestion[]);
    setCurrentIndex(0);
    setAnswers([]);
    setSelectedOption(null);
    setShowResult(false);
    setIsComplete(false);
    setShowHint(false);
    setStarted(true);
  }, [difficulty]);

  const handleAnswer = useCallback(() => {
    if (selectedOption === null || showResult) return;
    const q = questions[currentIndex];
    const userAnswer = q.options![selectedOption];
    const isCorrect = selectedOption === q.correctIndex;
    setAnswers((prev) => [
      ...prev,
      {
        questionId: q.id,
        question: q.question,
        userAnswer,
        correctAnswer: q.correctAnswer,
        isCorrect,
      },
    ]);
    setShowResult(true);
  }, [selectedOption, showResult, questions, currentIndex]);

  const handleNext = () => {
    if (currentIndex + 1 >= questions.length) {
      const score = answers.filter((a) => a.isCorrect).length;
      saveQuizResult("case-study", score + (showResult && answers[answers.length - 1]?.isCorrect ? 0 : 0), questions.length);
      // Re-count with the just-recorded answer
      const finalAnswers = [...answers];
      const finalScore = finalAnswers.filter((a) => a.isCorrect).length;
      saveQuizResult("case-study", finalScore, questions.length);
      setIsComplete(true);
    } else {
      setCurrentIndex((p) => p + 1);
      setSelectedOption(null);
      setShowResult(false);
      setShowHint(false);
    }
  };

  const score = answers.filter((a) => a.isCorrect).length;

  // ─── START SCREEN ───
  if (!started) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/quiz" className="hover:text-orange-600">
            クイズ
          </Link>
          <span>/</span>
          <span className="text-gray-700">ケーススタディ</span>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          ケーススタディクイズ
        </h1>
        <p className="text-gray-600 mb-2">
          架空企業「サクラ商事」の3年間の財務データを用いた実践的な判断力クイズ。
          PL・BS・CFを横断した読み解きに挑戦しましょう。
        </p>
        <Link
          href="/company"
          className="text-sm text-orange-600 hover:underline inline-block mb-6"
        >
          → まずサクラ商事の財務データを確認する
        </Link>

        {/* Difficulty selector */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
          <p className="font-bold text-gray-800 mb-4">難易度を選んでください</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {(["all", "basic", "intermediate", "advanced"] as Difficulty[]).map(
              (d) => {
                const count =
                  d === "all"
                    ? caseStudyQuestions.length
                    : caseStudyQuestions.filter((q) => q.difficulty === d)
                        .length;
                return (
                  <button
                    key={d}
                    onClick={() => setDifficulty(d)}
                    className={`p-3 rounded-xl border-2 text-sm font-bold transition-all ${
                      difficulty === d
                        ? "bg-orange-500 text-white border-orange-500"
                        : "bg-white text-gray-600 border-gray-200 hover:border-orange-300"
                    }`}
                  >
                    {difficultyLabel[d]}
                    <br />
                    <span className="font-normal text-xs">
                      {count}問
                    </span>
                  </button>
                );
              }
            )}
          </div>
        </div>

        <div className="bg-orange-50 rounded-xl border border-orange-200 p-4 mb-6 text-sm text-orange-800">
          <p className="font-bold mb-1">このクイズの特徴</p>
          <ul className="space-y-1 text-xs">
            <li>• 各問題に参考データテーブル付き（答えを見つけながら解ける）</li>
            <li>• 解説に企業ページへのリンク（詳細をすぐ確認可能）</li>
            <li>• 基礎3問→中級3問→上級4問の段階的構成</li>
          </ul>
        </div>

        <button
          onClick={startQuiz}
          className="w-full bg-orange-500 text-white font-bold py-3 rounded-xl hover:bg-orange-600 transition-colors text-lg"
        >
          クイズを開始する
        </button>
      </div>
    );
  }

  // ─── COMPLETE SCREEN ───
  if (isComplete) {
    const finalScore = answers.filter((a) => a.isCorrect).length;
    const pct = Math.round((finalScore / questions.length) * 100);
    const gradeColor =
      pct >= 90
        ? "text-yellow-600"
        : pct >= 70
        ? "text-green-600"
        : pct >= 50
        ? "text-orange-600"
        : "text-red-600";

    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl p-8 shadow-md text-center mb-8">
          <h1 className="text-xl font-bold mb-2">
            ケーススタディクイズ — 結果
          </h1>
          <div className={`text-5xl font-bold my-6 ${gradeColor}`}>
            {pct}%
          </div>
          <p className="text-gray-600">
            {questions.length}問中 {finalScore}問正解
          </p>
        </div>

        <div className="space-y-3 mb-8">
          {answers.map((a, i) => (
            <div
              key={a.questionId}
              className={`rounded-xl p-4 border-l-4 ${
                a.isCorrect
                  ? "bg-green-50 border-green-500"
                  : "bg-red-50 border-red-500"
              }`}
            >
              <div className="flex items-start gap-2">
                <span className="text-sm font-bold">
                  {a.isCorrect ? "○" : "×"}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    Q{i + 1}. {a.question}
                  </p>
                  {!a.isCorrect && (
                    <p className="text-xs text-gray-600 mt-1">
                      あなたの回答: {a.userAnswer}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={() => {
              setStarted(false);
              setIsComplete(false);
            }}
            className="bg-orange-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-600 transition-colors"
          >
            もう一度挑戦
          </button>
          <Link
            href="/company"
            className="bg-white border-2 border-orange-300 text-orange-600 px-6 py-3 rounded-xl font-bold hover:bg-orange-50 transition-colors"
          >
            企業分析で復習
          </Link>
          <Link
            href="/quiz"
            className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors"
          >
            他のクイズへ
          </Link>
        </div>
      </div>
    );
  }

  // ─── QUIZ IN PROGRESS ───
  const currentQ = questions[currentIndex] as CaseStudyQuestion;
  const diffLabel =
    difficultyLabel[currentQ.difficulty] ?? currentQ.difficulty;
  const focusLink = companyPageLinks[currentQ.focusStatement];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Progress */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>
            ケーススタディ
            <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
              {diffLabel}
            </span>
            <span className="ml-1 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
              {focusLabel[currentQ.focusStatement]}
            </span>
          </span>
          <span>
            {currentIndex + 1} / {questions.length} 問目
          </span>
        </div>
        <div className="bg-gray-200 rounded-full h-2">
          <div
            className="bg-orange-500 rounded-full h-2 transition-all"
            style={{
              width: `${((currentIndex + 1) / questions.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Reference data */}
      <ReferenceTable question={currentQ} />

      {/* Question card */}
      <div className="bg-white rounded-2xl p-6 shadow-md mb-4">
        <p className="text-base font-bold mb-5">{currentQ.question}</p>

        <div className="space-y-3">
          {currentQ.options!.map((opt, i) => {
            let style =
              "bg-gray-50 border-gray-200 hover:bg-orange-50 hover:border-orange-300 cursor-pointer";
            if (showResult) {
              if (i === currentQ.correctIndex) {
                style = "bg-green-100 border-green-500";
              } else if (i === selectedOption && i !== currentQ.correctIndex) {
                style = "bg-red-100 border-red-500";
              } else {
                style = "bg-gray-50 border-gray-200 opacity-50";
              }
            } else if (i === selectedOption) {
              style = "bg-orange-100 border-orange-400";
            }
            return (
              <button
                key={i}
                onClick={() => !showResult && setSelectedOption(i)}
                disabled={showResult}
                className={`w-full text-left p-4 rounded-xl border-2 text-sm transition-colors ${style}`}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {/* Hint */}
        {!showResult && currentQ.hint && (
          <div className="mt-4">
            {showHint ? (
              <div className="bg-yellow-50 rounded-xl p-3 text-xs text-yellow-800">
                💡 ヒント: {currentQ.hint}
              </div>
            ) : (
              <button
                onClick={() => setShowHint(true)}
                className="text-xs text-gray-400 hover:text-orange-500 transition-colors"
              >
                ヒントを見る
              </button>
            )}
          </div>
        )}

        {/* Explanation */}
        {showResult && (
          <div className="mt-4 bg-blue-50 rounded-xl p-4">
            <p className="text-sm text-blue-800">{currentQ.explanation}</p>
            <div className="mt-3">
              <Link
                href={focusLink}
                className="text-xs text-blue-600 hover:underline"
              >
                → {focusLabel[currentQ.focusStatement]}ページで詳細を確認
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Action button */}
      <div className="text-center">
        {!showResult ? (
          <button
            onClick={handleAnswer}
            disabled={selectedOption === null}
            className="bg-orange-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            回答する
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="bg-orange-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-600 transition-colors"
          >
            {currentIndex + 1 >= questions.length ? "結果を見る" : "次の問題"}
          </button>
        )}
      </div>
    </div>
  );
}
