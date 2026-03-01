"use client";

import { useState } from "react";
import { FinancialInputs, IndicatorCategory, HealthLevel } from "@/lib/types";
import { indicators, categoryLabels } from "@/data/indicator-definitions";

const defaultInputs: FinancialInputs = {
  revenue: 0,
  cogs: 0,
  operatingIncome: 0,
  netIncome: 0,
  totalAssets: 0,
  currentAssets: 0,
  inventory: 0,
  currentLiabilities: 0,
  totalLiabilities: 0,
  equity: 0,
  prevRevenue: 0,
  prevNetIncome: 0,
};

const inputFields: { key: keyof FinancialInputs; label: string; group: string }[] = [
  { key: "revenue", label: "売上高", group: "PL項目" },
  { key: "cogs", label: "売上原価", group: "PL項目" },
  { key: "operatingIncome", label: "営業利益", group: "PL項目" },
  { key: "netIncome", label: "当期純利益", group: "PL項目" },
  { key: "totalAssets", label: "総資産", group: "BS項目" },
  { key: "currentAssets", label: "流動資産", group: "BS項目" },
  { key: "inventory", label: "棚卸資産", group: "BS項目" },
  { key: "currentLiabilities", label: "流動負債", group: "BS項目" },
  { key: "totalLiabilities", label: "負債合計", group: "BS項目" },
  { key: "equity", label: "自己資本（純資産）", group: "BS項目" },
  { key: "prevRevenue", label: "前期売上高", group: "前期比較" },
  { key: "prevNetIncome", label: "前期当期純利益", group: "前期比較" },
];

const categories: IndicatorCategory[] = ["profitability", "safety", "efficiency", "growth"];

const healthColors: Record<HealthLevel, string> = {
  good: "bg-green-100 text-green-800 border-green-300",
  caution: "bg-yellow-100 text-yellow-800 border-yellow-300",
  warning: "bg-red-100 text-red-800 border-red-300",
  danger: "bg-red-200 text-red-900 border-red-500",
};

const healthLabels: Record<HealthLevel, string> = {
  good: "良好",
  caution: "注意",
  warning: "要改善",
  danger: "危険",
};

export default function CalculatorPage() {
  const [inputs, setInputs] = useState<FinancialInputs>(defaultInputs);
  const [activeCategory, setActiveCategory] = useState<IndicatorCategory>("profitability");

  const handleChange = (key: keyof FinancialInputs, value: string) => {
    setInputs((prev) => ({ ...prev, [key]: Number(value) || 0 }));
  };

  const filteredIndicators = indicators.filter((ind) => ind.category === activeCategory);

  const groups = Array.from(new Set(inputFields.map((f) => f.group)));

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">財務指標計算ツール</h1>
      <p className="text-gray-600 mb-8">
        財務数値を入力すると、主要な財務指標を自動計算します。
      </p>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div>
          <h2 className="text-lg font-bold mb-4 text-gray-800">数値入力</h2>
          {groups.map((group) => (
            <div key={group} className="mb-6">
              <h3 className="text-sm font-bold text-orange-600 mb-2">{group}</h3>
              <div className="space-y-2">
                {inputFields
                  .filter((f) => f.group === group)
                  .map((field) => (
                    <div key={field.key} className="flex items-center gap-3">
                      <label className="text-sm text-gray-700 w-40 shrink-0">
                        {field.label}
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={inputs[field.key] || ""}
                        onChange={(e) => handleChange(field.key, e.target.value)}
                        placeholder="0"
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                      />
                      <span className="text-xs text-gray-400 w-8">万円</span>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Results Section */}
        <div>
          <h2 className="text-lg font-bold mb-4 text-gray-800">計算結果</h2>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? "bg-orange-500 text-white"
                    : "bg-orange-100 text-orange-700 hover:bg-orange-200"
                }`}
              >
                {categoryLabels[cat]}
              </button>
            ))}
          </div>

          {/* Results */}
          <div className="space-y-4">
            {filteredIndicators.map((ind) => {
              const value = ind.calculate(inputs);
              const health = value !== null ? ind.getHealth(value) : null;

              return (
                <div
                  key={ind.id}
                  className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-gray-800">{ind.name}</h3>
                      <p className="text-xs text-gray-400">{ind.nameEnglish}</p>
                    </div>
                    {health && (
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-bold border ${healthColors[health]}`}
                      >
                        {healthLabels[health]}
                      </span>
                    )}
                  </div>

                  <div className="text-2xl font-bold text-gray-800 mb-2">
                    {value !== null ? `${value.toFixed(1)}${ind.unit}` : "---"}
                  </div>

                  <p className="text-xs text-gray-500 mb-2">{ind.description}</p>

                  <div className="bg-gray-50 rounded-lg px-3 py-2 text-xs font-mono text-gray-600">
                    {ind.formula}
                  </div>

                  <div className="flex gap-2 mt-2">
                    <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded">
                      {ind.thresholds.good}
                    </span>
                    <span className="text-xs bg-yellow-50 text-yellow-700 px-2 py-0.5 rounded">
                      {ind.thresholds.caution}
                    </span>
                    <span className="text-xs bg-red-50 text-red-700 px-2 py-0.5 rounded">
                      {ind.thresholds.warning}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
