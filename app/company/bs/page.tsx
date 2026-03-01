import Link from "next/link";
import { sakuraTrading } from "@/data/sakura-trading";
import BSStackedChart from "@/components/company/BSStackedChart";
import WarningBadge from "@/components/company/WarningBadge";
import type { BSChartDataPoint } from "@/lib/types";
import { HealthLevel } from "@/lib/types";

function getCurrentRatioHealth(ratio: number): HealthLevel {
  if (ratio >= 200) return "good";
  if (ratio >= 130) return "caution";
  if (ratio >= 100) return "warning";
  return "danger";
}

function getEquityRatioHealth(ratio: number): HealthLevel {
  if (ratio >= 50) return "good";
  if (ratio >= 40) return "caution";
  if (ratio >= 30) return "warning";
  return "danger";
}

function getInventoryGrowthHealth(
  current: number,
  previous: number
): HealthLevel {
  const growth = (current - previous) / previous;
  if (growth <= 0.1) return "good";
  if (growth <= 0.3) return "caution";
  if (growth <= 0.6) return "warning";
  return "danger";
}

export default function BSPage() {
  const { years } = sakuraTrading;

  // Build BSChartDataPoint for each year (2 bars per year: assets & liabilities)
  const chartData: BSChartDataPoint[] = years.flatMap((y) => [
    {
      period: `FY${y.fiscalYear}\n資産`,
      side: "assets" as const,
      cash: y.bs.cash,
      receivables: y.bs.receivables,
      inventory: y.bs.inventory,
      otherCurrent: y.bs.otherCurrentAssets,
      nonCurrentAssets: y.bs.nonCurrentAssets,
      currentLiabilities: 0,
      nonCurrentLiabilities: 0,
      equity: 0,
    },
    {
      period: `FY${y.fiscalYear}\n負債・純資産`,
      side: "liabilities" as const,
      cash: 0,
      receivables: 0,
      inventory: 0,
      otherCurrent: 0,
      nonCurrentAssets: 0,
      currentLiabilities: y.bs.currentLiabilities,
      nonCurrentLiabilities: y.bs.nonCurrentLiabilities,
      equity: y.bs.equity,
    },
  ]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/company" className="hover:text-orange-600">
          企業分析（サクラ商事）
        </Link>
        <span>/</span>
        <span className="text-gray-700">BS分析</span>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        貸借対照表（BS）分析 — サクラ商事
      </h1>

      {/* Stacked chart */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <h2 className="text-base font-bold text-gray-800 mb-2">
          資産・負債・純資産の推移（百万円）
        </h2>
        <p className="text-xs text-gray-500 mb-4">
          各年度に「資産棒」と「負債+純資産棒」を並列表示。棚卸資産（黄）の膨張に注目。
        </p>
        <BSStackedChart data={chartData} />
      </div>

      {/* Health badges per year */}
      <h2 className="text-base font-bold text-gray-800 mb-3">
        安全性指標の推移
      </h2>
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        {years.map((year, i) => {
          const currentRatio =
            (year.bs.currentAssets / year.bs.currentLiabilities) * 100;
          const equityRatio =
            (year.bs.equity / year.bs.totalAssets) * 100;
          const prevYear = i > 0 ? years[i - 1] : null;

          return (
            <div
              key={year.fiscalYear}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4"
            >
              <p className="font-bold text-gray-800 mb-3">{year.label}</p>
              <div className="space-y-2">
                <WarningBadge
                  level={getCurrentRatioHealth(currentRatio)}
                  metricName="流動比率"
                  value={`${currentRatio.toFixed(0)}%`}
                  benchmark="200%以上が健全"
                  showTrend={!!prevYear}
                  trend={
                    prevYear
                      ? currentRatio <
                        (prevYear.bs.currentAssets /
                          prevYear.bs.currentLiabilities) *
                          100
                        ? "down"
                        : "up"
                      : undefined
                  }
                  trendLabel={
                    prevYear
                      ? `前年比 ${(
                          currentRatio -
                          (prevYear.bs.currentAssets /
                            prevYear.bs.currentLiabilities) *
                            100
                        ).toFixed(0)}pt`
                      : undefined
                  }
                />
                <WarningBadge
                  level={getEquityRatioHealth(equityRatio)}
                  metricName="自己資本比率"
                  value={`${equityRatio.toFixed(1)}%`}
                  benchmark="50%以上が目安"
                />
                <WarningBadge
                  level={
                    prevYear
                      ? getInventoryGrowthHealth(
                          year.bs.inventory,
                          prevYear.bs.inventory
                        )
                      : "good"
                  }
                  metricName="棚卸資産"
                  value={`${year.bs.inventory.toLocaleString()}百万円`}
                  benchmark="前年比+30%超は警戒"
                  showTrend={!!prevYear}
                  trend={
                    prevYear
                      ? year.bs.inventory > prevYear.bs.inventory
                        ? "up"
                        : "down"
                      : undefined
                  }
                  trendLabel={
                    prevYear
                      ? `前年比 +${(
                          ((year.bs.inventory - prevYear.bs.inventory) /
                            prevYear.bs.inventory) *
                          100
                        ).toFixed(0)}%`
                      : undefined
                  }
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed BS table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6 overflow-x-auto">
        <h2 className="text-base font-bold text-gray-800 mb-4">
          BS詳細比較（百万円）
        </h2>
        <table className="w-full text-sm min-w-[500px]">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-2 text-gray-600">項目</th>
              {years.map((y) => (
                <th key={y.fiscalYear} className="text-right py-2 text-gray-600">
                  {y.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              {
                label: "現金・預金",
                key: "cash" as const,
                indent: 1,
                highlight: false,
              },
              { label: "売掛金", key: "receivables" as const, indent: 1 },
              {
                label: "棚卸資産",
                key: "inventory" as const,
                indent: 1,
                highlight: true,
              },
              {
                label: "流動資産 合計",
                key: "currentAssets" as const,
                bold: true,
              },
              { label: "固定資産", key: "nonCurrentAssets" as const, indent: 1 },
              {
                label: "総資産",
                key: "totalAssets" as const,
                bold: true,
                topBorder: true,
              },
              {
                label: "流動負債",
                key: "currentLiabilities" as const,
                indent: 1,
              },
              {
                label: "固定負債",
                key: "nonCurrentLiabilities" as const,
                indent: 1,
              },
              {
                label: "純資産",
                key: "equity" as const,
                bold: true,
                topBorder: true,
              },
            ].map((row) => (
              <tr
                key={row.label}
                className={`border-b border-gray-100 ${
                  row.highlight ? "bg-amber-50" : ""
                } ${row.topBorder ? "border-t-2 border-gray-300" : ""}`}
              >
                <td
                  className={`py-2 ${row.indent ? "pl-4 text-gray-500" : "text-gray-800"} ${row.bold ? "font-bold" : ""}`}
                >
                  {row.highlight && (
                    <span className="text-amber-500 mr-1">★</span>
                  )}
                  {row.label}
                </td>
                {years.map((y) => (
                  <td
                    key={y.fiscalYear}
                    className={`py-2 text-right ${row.bold ? "font-bold" : "text-gray-700"}`}
                  >
                    {(y.bs[row.key] as number).toLocaleString()}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Narrative callout */}
      <div className="bg-red-50 rounded-2xl border border-red-200 p-5 mb-6">
        <h3 className="font-bold text-red-800 mb-3">
          ★ 棚卸資産膨張が引き起こす連鎖危機
        </h3>
        <ol className="space-y-2 text-sm text-red-900 list-decimal list-inside">
          <li>棚卸資産が800→2,000→2,500百万円へ急膨張</li>
          <li>流動資産は増えるが「現金化できない資産」が大半を占める</li>
          <li>流動比率が200%→125%→95%と低下、FY2024で100%割れ</li>
          <li>
            CF計算書では棚卸資産増加が「マイナス調整」として反映→営業CF急減
          </li>
          <li>資金ショートを補うため借入増加→自己資本比率も低下</li>
        </ol>
      </div>

      {/* Navigation */}
      <div className="flex flex-wrap gap-3 justify-between items-center">
        <Link
          href="/company/pl"
          className="text-sm text-orange-600 hover:underline"
        >
          ← PL分析に戻る
        </Link>
        <div className="flex gap-3">
          <Link
            href="/company/cf"
            className="bg-white border-2 border-orange-300 text-orange-600 font-bold px-4 py-2 rounded-xl text-sm hover:bg-orange-50 transition-colors"
          >
            CF分析 →
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
