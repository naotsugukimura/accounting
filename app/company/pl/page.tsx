"use client";

import { useState } from "react";
import Link from "next/link";
import { sakuraTrading } from "@/data/sakura-trading";
import PLWaterfallChart from "@/components/company/PLWaterfallChart";
import YearComparisonChart from "@/components/company/YearComparisonChart";
import type { MetricConfig } from "@/components/company/YearComparisonChart";
import WarningBadge from "@/components/company/WarningBadge";
import { HealthLevel } from "@/lib/types";

const YEARS = [2022, 2023, 2024] as const;

function getGrossProfitHealth(rate: number): HealthLevel {
  if (rate >= 24) return "good";
  if (rate >= 20) return "caution";
  if (rate >= 15) return "warning";
  return "danger";
}

function getOpProfitHealth(rate: number): HealthLevel {
  if (rate >= 8) return "good";
  if (rate >= 4) return "caution";
  if (rate >= 1) return "warning";
  return "danger";
}

function getNetIncomeHealth(value: number): HealthLevel {
  if (value > 0) return "good";
  return "danger";
}

export default function PLPage() {
  const [selectedYear, setSelectedYear] = useState<2022 | 2023 | 2024>(2022);

  const yearData = sakuraTrading.years.find(
    (y) => y.fiscalYear === selectedYear
  )!;

  const grossProfitRate =
    (yearData.pl.grossProfit / yearData.pl.revenue) * 100;
  const opProfitRate =
    (yearData.pl.operatingProfit / yearData.pl.revenue) * 100;

  // Chart data for trend lines
  const trendData = sakuraTrading.years.map((y) => ({
    year: y.fiscalYear,
    grossProfitRate: parseFloat(
      ((y.pl.grossProfit / y.pl.revenue) * 100).toFixed(1)
    ),
    opProfitRate: parseFloat(
      ((y.pl.operatingProfit / y.pl.revenue) * 100).toFixed(1)
    ),
  }));

  const rateMetrics: MetricConfig[] = [
    {
      key: "grossProfitRate",
      label: "粗利率",
      color: "#2563eb",
      unit: "%",
    },
    {
      key: "opProfitRate",
      label: "営業利益率",
      color: "#16a34a",
      unit: "%",
    },
  ];

  const phaseAreas = [
    { x1: 2021.5, x2: 2022.5, phase: "good" as const },
    { x1: 2022.5, x2: 2023.5, phase: "warning" as const },
    { x1: 2023.5, x2: 2024.5, phase: "crisis" as const },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/company" className="hover:text-orange-600">
          企業分析（サクラ商事）
        </Link>
        <span>/</span>
        <span className="text-gray-700">PL分析</span>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        損益計算書（PL）分析 — サクラ商事
      </h1>

      {/* Year tabs */}
      <div className="flex gap-2 mb-6">
        {YEARS.map((y) => {
          const yd = sakuraTrading.years.find((yr) => yr.fiscalYear === y)!;
          const isSelected = y === selectedYear;
          const phaseIcon =
            yd.phase === "good"
              ? "✓"
              : yd.phase === "warning"
              ? "△"
              : "✕";
          return (
            <button
              key={y}
              onClick={() => setSelectedYear(y)}
              className={`flex-1 sm:flex-none px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${
                isSelected
                  ? "bg-orange-500 text-white shadow-md"
                  : "bg-white border-2 border-gray-200 text-gray-600 hover:border-orange-300"
              }`}
            >
              {phaseIcon} FY{y}
            </button>
          );
        })}
      </div>

      {/* Waterfall Chart */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <h2 className="text-base font-bold text-gray-800 mb-4">
          FY{selectedYear} — PLウォーターフォール（百万円）
        </h2>
        <PLWaterfallChart pl={yearData.pl} />
      </div>

      {/* Warning badges */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <WarningBadge
          level={getGrossProfitHealth(grossProfitRate)}
          metricName="粗利率"
          value={`${grossProfitRate.toFixed(1)}%`}
          benchmark="25%以上が理想"
        />
        <WarningBadge
          level={getOpProfitHealth(opProfitRate)}
          metricName="営業利益率"
          value={`${opProfitRate.toFixed(1)}%`}
          benchmark="8%以上が目安"
        />
        <WarningBadge
          level={getNetIncomeHealth(yearData.pl.netIncome)}
          metricName="純利益"
          value={`${yearData.pl.netIncome >= 0 ? "+" : ""}${yearData.pl.netIncome.toLocaleString()}百万円`}
          benchmark="黒字維持"
        />
      </div>

      {/* PL table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <h2 className="text-base font-bold text-gray-800 mb-4">
          FY{selectedYear} — PL詳細（百万円）
        </h2>
        <table className="w-full text-sm">
          <tbody>
            {[
              { label: "売上高", value: yearData.pl.revenue, indent: 0 },
              {
                label: "（－）売上原価",
                value: -yearData.pl.costOfSales,
                indent: 1,
              },
              {
                label: "売上総利益",
                value: yearData.pl.grossProfit,
                indent: 0,
                bold: true,
              },
              {
                label: "（－）販管費",
                value: -yearData.pl.sellingAdminExpenses,
                indent: 1,
              },
              {
                label: "営業利益",
                value: yearData.pl.operatingProfit,
                indent: 0,
                bold: true,
              },
              {
                label: "（±）営業外損益",
                value: yearData.pl.nonOperatingBalance,
                indent: 1,
              },
              {
                label: "（±）特別損益",
                value: yearData.pl.extraordinaryBalance,
                indent: 1,
              },
              {
                label: "（－）税金等",
                value: -yearData.pl.taxExpense,
                indent: 1,
              },
              {
                label: "純利益",
                value: yearData.pl.netIncome,
                indent: 0,
                bold: true,
                highlight: yearData.pl.netIncome < 0,
              },
            ].map((row) => (
              <tr
                key={row.label}
                className={`border-b border-gray-100 ${row.highlight ? "bg-red-50" : ""}`}
              >
                <td
                  className={`py-2 text-gray-700 ${
                    row.indent === 1 ? "pl-4 text-gray-500" : ""
                  } ${row.bold ? "font-bold" : ""}`}
                >
                  {row.label}
                </td>
                <td
                  className={`py-2 text-right ${
                    row.value < 0 ? "text-red-600" : "text-gray-800"
                  } ${row.bold ? "font-bold" : ""}`}
                >
                  {row.value >= 0 ? "+" : ""}
                  {row.value.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Narrative points */}
      <div className="bg-amber-50 rounded-2xl border border-amber-200 p-5 mb-6">
        <h3 className="font-bold text-amber-800 mb-3">
          FY{selectedYear} — 読み解きポイント
        </h3>
        <ul className="space-y-2">
          {yearData.narrativePoints.map((point, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-amber-900">
              <span className="mt-0.5 text-amber-500">•</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Rate trend chart */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <h2 className="text-base font-bold text-gray-800 mb-2">
          粗利率・営業利益率の3年推移
        </h2>
        <YearComparisonChart
          data={trendData}
          metrics={rateMetrics}
          phaseAreas={phaseAreas}
          unit="%"
        />
      </div>

      {/* Navigation */}
      <div className="flex flex-wrap gap-3 justify-between items-center">
        <Link
          href="/company"
          className="text-sm text-orange-600 hover:underline"
        >
          ← 企業分析HUBに戻る
        </Link>
        <div className="flex gap-3">
          <Link
            href="/company/bs"
            className="bg-white border-2 border-orange-300 text-orange-600 font-bold px-4 py-2 rounded-xl text-sm hover:bg-orange-50 transition-colors"
          >
            BS分析 →
          </Link>
          <Link
            href="/quiz/case-study"
            className="bg-orange-500 text-white font-bold px-4 py-2 rounded-xl text-sm hover:bg-orange-600 transition-colors"
          >
            クイズを解く
          </Link>
        </div>
      </div>
    </div>
  );
}
