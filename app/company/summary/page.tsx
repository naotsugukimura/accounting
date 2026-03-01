import Link from "next/link";
import { sakuraTrading } from "@/data/sakura-trading";

const phaseConfig = {
  good: {
    icon: "✓",
    label: "好調期",
    bg: "bg-green-100",
    border: "border-green-400",
    text: "text-green-800",
    line: "bg-green-300",
  },
  warning: {
    icon: "△",
    label: "拡大危険期",
    bg: "bg-yellow-100",
    border: "border-yellow-400",
    text: "text-yellow-800",
    line: "bg-yellow-300",
  },
  crisis: {
    icon: "✕",
    label: "危機期",
    bg: "bg-red-100",
    border: "border-red-400",
    text: "text-red-800",
    line: "bg-red-300",
  },
};

const keyLessons = [
  {
    icon: "📊",
    title: "PLだけでは不十分",
    body: "売上高・営業利益はFY2022→2024で増加しているように見える。PLのみ見ると「成長企業」と誤判断しやすい。",
  },
  {
    icon: "💸",
    title: "棚卸資産はCFに直結",
    body: "在庫増加は「現金→在庫」の変換であり、その分だけ営業CFが悪化する。棚卸資産回転率の監視が必須。",
  },
  {
    icon: "🔗",
    title: "三表を同時に読む",
    body: "PL（利益）・BS（在庫膨張）・CF（キャッシュ消滅）の3点セットで初めて「黒字倒産リスク」が見える。",
  },
  {
    icon: "⚠️",
    title: "財務CF増加は警戒サイン",
    body: "財務CF+1,200→+800は借入増加を意味する。本業CFがマイナスの時点で借入依存は危険な延命策。",
  },
];

export default function SummaryPage() {
  const { years, nameJa, overallNarrative } = sakuraTrading;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/company" className="hover:text-orange-600">
          企業分析（サクラ商事）
        </Link>
        <span>/</span>
        <span className="text-gray-700">3年総括</span>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-3">
        3年間の総括タイムライン — {nameJa}
      </h1>
      <p className="text-gray-600 mb-8">{overallNarrative}</p>

      {/* Timeline */}
      <div className="relative mb-10">
        {/* Vertical connector line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 hidden sm:block" />

        <div className="space-y-8">
          {years.map((year) => {
            const cfg = phaseConfig[year.phase];
            const grossProfitRate = (
              (year.pl.grossProfit / year.pl.revenue) *
              100
            ).toFixed(1);
            const currentRatio = (
              (year.bs.currentAssets / year.bs.currentLiabilities) *
              100
            ).toFixed(0);

            return (
              <div key={year.fiscalYear} className="sm:pl-16 relative">
                {/* Phase icon (visible on md+) */}
                <div
                  className={`absolute left-0 w-12 h-12 rounded-full ${cfg.bg} ${cfg.border} border-2 flex items-center justify-center text-xl font-bold ${cfg.text} hidden sm:flex`}
                  aria-hidden="true"
                >
                  {cfg.icon}
                </div>

                <div
                  className={`rounded-2xl border-2 p-5 ${cfg.bg} ${cfg.border}`}
                >
                  <div className="flex flex-wrap items-baseline gap-3 mb-4">
                    <span className={`text-lg font-bold ${cfg.text}`}>
                      {year.label}
                    </span>
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-full bg-white ${cfg.text}`}
                    >
                      {cfg.label}
                    </span>
                  </div>

                  {/* KPI grid */}
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-4 text-center">
                    {[
                      {
                        label: "売上高",
                        value: `${year.pl.revenue.toLocaleString()}`,
                        unit: "百万円",
                      },
                      {
                        label: "純利益",
                        value: `${year.pl.netIncome >= 0 ? "+" : ""}${year.pl.netIncome.toLocaleString()}`,
                        unit: "百万円",
                        red: year.pl.netIncome < 0,
                      },
                      {
                        label: "粗利率",
                        value: grossProfitRate,
                        unit: "%",
                      },
                      {
                        label: "棚卸資産",
                        value: `${year.bs.inventory.toLocaleString()}`,
                        unit: "百万円",
                        amber: true,
                      },
                      {
                        label: "営業CF",
                        value: `${year.cf.operatingCF >= 0 ? "+" : ""}${year.cf.operatingCF.toLocaleString()}`,
                        unit: "百万円",
                        red: year.cf.operatingCF < 0,
                      },
                      {
                        label: "流動比率",
                        value: currentRatio,
                        unit: "%",
                        red: Number(currentRatio) < 100,
                      },
                    ].map((kpi) => (
                      <div
                        key={kpi.label}
                        className="bg-white rounded-xl p-2 shadow-sm"
                      >
                        <p className="text-xs text-gray-500">{kpi.label}</p>
                        <p
                          className={`font-bold text-sm ${
                            kpi.red
                              ? "text-red-600"
                              : kpi.amber
                              ? "text-amber-700"
                              : "text-gray-800"
                          }`}
                        >
                          {kpi.value}
                          <span className="text-xs font-normal">
                            {kpi.unit}
                          </span>
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Narrative points */}
                  <ul className="space-y-1.5">
                    {year.narrativePoints.map((point, i) => (
                      <li
                        key={i}
                        className={`text-sm flex items-start gap-2 ${cfg.text}`}
                      >
                        <span className="mt-0.5 shrink-0">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Key lessons */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-gray-800 mb-4">
          この事例から学ぶ4つの教訓
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {keyLessons.map((lesson) => (
            <div
              key={lesson.title}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{lesson.icon}</span>
                <div>
                  <p className="font-bold text-gray-800 mb-1">
                    {lesson.title}
                  </p>
                  <p className="text-sm text-gray-600">{lesson.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-6 text-white text-center mb-6">
        <p className="text-lg font-bold mb-2">
          この分析を自分でできるか試してみよう
        </p>
        <p className="text-sm text-orange-100 mb-4">
          ケーススタディクイズ10問で理解度を確認
        </p>
        <Link
          href="/quiz/case-study"
          className="inline-block bg-white text-orange-600 font-bold px-6 py-2.5 rounded-xl hover:bg-orange-50 transition-colors"
        >
          ケーススタディクイズを解く →
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex flex-wrap gap-3 justify-between items-center">
        <Link
          href="/company/cf"
          className="text-sm text-orange-600 hover:underline"
        >
          ← CF分析に戻る
        </Link>
        <Link
          href="/company"
          className="text-sm text-orange-600 hover:underline"
        >
          企業分析HUBへ →
        </Link>
      </div>
    </div>
  );
}
