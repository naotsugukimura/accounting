"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { quizQuestions, quizCategories } from "@/data/quiz-questions";
import { shuffleQuestions, saveQuizResult } from "@/lib/quiz-utils";
import { QuizQuestion, AnswerResult } from "@/lib/types";

export default function QuizSessionPage() {
  const params = useParams();
  const category = params.category as string;
  const categoryInfo = quizCategories.find((c) => c.id === category);

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerResult[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [fillAnswer, setFillAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const categoryQuestions = quizQuestions.filter((q) => q.category === category);
    setQuestions(shuffleQuestions(categoryQuestions, 10));
  }, [category]);

  const currentQuestion = questions[currentIndex];
  const score = answers.filter((a) => a.isCorrect).length;

  const handleAnswer = useCallback(() => {
    if (!currentQuestion || showResult) return;

    let userAnswer = "";
    let isCorrect = false;

    if (currentQuestion.type === "multiple_choice") {
      if (selectedOption === null) return;
      userAnswer = currentQuestion.options![selectedOption];
      isCorrect = selectedOption === currentQuestion.correctIndex;
    } else {
      if (!fillAnswer.trim()) return;
      userAnswer = fillAnswer.trim();
      const acceptable = [
        currentQuestion.correctAnswer,
        ...(currentQuestion.acceptableAnswers || []),
      ];
      isCorrect = acceptable.some(
        (a) => a.toLowerCase() === userAnswer.toLowerCase()
      );
    }

    setAnswers((prev) => [
      ...prev,
      {
        questionId: currentQuestion.id,
        question: currentQuestion.question,
        userAnswer,
        correctAnswer: currentQuestion.correctAnswer,
        isCorrect,
      },
    ]);
    setShowResult(true);
  }, [currentQuestion, selectedOption, fillAnswer, showResult]);

  const handleNext = () => {
    if (currentIndex + 1 >= questions.length) {
      const finalScore = answers.filter((a) => a.isCorrect).length;
      saveQuizResult(category, finalScore, questions.length);
      setIsComplete(true);
    } else {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setFillAnswer("");
      setShowResult(false);
    }
  };

  if (!categoryInfo) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 text-center">
        <p className="text-gray-600">カテゴリが見つかりません。</p>
        <Link href="/quiz" className="text-orange-600 hover:underline mt-4 inline-block">
          クイズ一覧に戻る
        </Link>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto" />
      </div>
    );
  }

  // Complete screen
  if (isComplete) {
    const percentage = Math.round((score / questions.length) * 100);
    const gradeColor =
      percentage >= 90
        ? "text-yellow-600"
        : percentage >= 70
        ? "text-green-600"
        : percentage >= 50
        ? "text-orange-600"
        : "text-red-600";

    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl p-8 shadow-md text-center mb-8">
          <h1 className="text-xl font-bold mb-2">{categoryInfo.name} - 結果</h1>
          <div className={`text-5xl font-bold my-6 ${gradeColor}`}>
            {percentage}%
          </div>
          <p className="text-gray-600">
            {questions.length}問中 {score}問正解
          </p>
        </div>

        <div className="space-y-3 mb-8">
          {answers.map((answer, i) => (
            <div
              key={answer.questionId}
              className={`rounded-xl p-4 border-l-4 ${
                answer.isCorrect
                  ? "bg-green-50 border-green-500"
                  : "bg-red-50 border-red-500"
              }`}
            >
              <div className="flex items-start gap-2">
                <span className="text-sm font-bold">
                  {answer.isCorrect ? "○" : "×"}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    Q{i + 1}. {answer.question}
                  </p>
                  {!answer.isCorrect && (
                    <p className="text-xs text-gray-600 mt-1">
                      あなたの回答: {answer.userAnswer} → 正解: {answer.correctAnswer}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => {
              const categoryQuestions = quizQuestions.filter((q) => q.category === category);
              setQuestions(shuffleQuestions(categoryQuestions, 10));
              setCurrentIndex(0);
              setAnswers([]);
              setSelectedOption(null);
              setFillAnswer("");
              setShowResult(false);
              setIsComplete(false);
            }}
            className="bg-orange-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-600 transition-colors"
          >
            もう一度
          </button>
          <Link
            href="/quiz"
            className="bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-bold hover:bg-gray-300 transition-colors"
          >
            他のカテゴリ
          </Link>
        </div>
      </div>
    );
  }

  // Quiz in progress
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>{categoryInfo.name}</span>
          <span>
            {currentIndex + 1} / {questions.length} 問目
          </span>
        </div>
        <div className="bg-gray-200 rounded-full h-2">
          <div
            className="bg-orange-500 rounded-full h-2 transition-all"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-2xl p-6 shadow-md mb-6">
        <p className="text-lg font-bold mb-6">{currentQuestion.question}</p>

        {currentQuestion.type === "multiple_choice" ? (
          <div className="space-y-3">
            {currentQuestion.options!.map((option, i) => {
              let optionStyle = "bg-gray-50 border-gray-200 hover:bg-orange-50 hover:border-orange-300 cursor-pointer";
              if (showResult) {
                if (i === currentQuestion.correctIndex) {
                  optionStyle = "bg-green-100 border-green-500";
                } else if (i === selectedOption && i !== currentQuestion.correctIndex) {
                  optionStyle = "bg-red-100 border-red-500";
                } else {
                  optionStyle = "bg-gray-50 border-gray-200 opacity-50";
                }
              } else if (i === selectedOption) {
                optionStyle = "bg-orange-100 border-orange-400";
              }

              return (
                <button
                  key={i}
                  onClick={() => !showResult && setSelectedOption(i)}
                  disabled={showResult}
                  className={`w-full text-left p-4 rounded-xl border-2 text-sm transition-colors ${optionStyle}`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        ) : (
          <div>
            <input
              type="text"
              value={fillAnswer}
              onChange={(e) => setFillAnswer(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAnswer()}
              disabled={showResult}
              placeholder="回答を入力"
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-400 disabled:bg-gray-50"
            />
            {showResult && (
              <p className="mt-2 text-sm text-green-700">
                正解: {currentQuestion.correctAnswer}
              </p>
            )}
          </div>
        )}

        {/* Explanation */}
        {showResult && (
          <div className="mt-4 bg-blue-50 rounded-xl p-4">
            <p className="text-sm text-blue-800">{currentQuestion.explanation}</p>
          </div>
        )}
      </div>

      {/* Action Button */}
      <div className="text-center">
        {!showResult ? (
          <button
            onClick={handleAnswer}
            disabled={
              currentQuestion.type === "multiple_choice"
                ? selectedOption === null
                : !fillAnswer.trim()
            }
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
