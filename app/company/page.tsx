import Link from "next/link";
import { sakuraTrading } from "@/data/sakura-trading";
import YearComparisonChart from "@/components/company/YearComparisonChart";
import type { MetricConfig } from "@/components/company/YearComparisonChart";

const phaseConfig = {
  good: {
    icon: "✓",
    label: "好調期",
    bg: "bg-green-50",
    border: "border-green-300",
    text: "text-green-700",
    iconBg: "bg-green-200",
  },
  warning: {
    icon: "△",
    label: "拡大危険期",
    bg: "bg-yellow-50",
    border: "border-yellow-300",
    text: "text-yellow-700",
    iconBg: "bg-yellow-200",
  },
  crisis: {
    icon: "✕",
    label: "危機期",
    bg: "bg-red-50",
    border: "border-red-300",
    text: "text-red-700",
    iconBg: "bg-red-200",
  },
};

const navCards = [
  {
    href: "/company/pl",
    icon: "📊",
    title: "PL分析",
    sub: "損益計算書",
    desc: "ウォーターフォールチャートで利益の構造を把握",
  },
  {
    href: "/company/bs",
    icon: "🏛",
    title: "BS分析",
    sub: "貸借対照表",
    desc: "棚卸資産の膨張と財務安全性の悪化を可視化",
  },
  {
    href: "/company/cf",
    icon: "💰",
    title: "CF分析",
    sub: "キャッシュフロー計算書",
    desc: "営業CFがマイナス転落するプロセスを追跡",
  },
  {
    href: "/company/summary",
    icon: "📋",
    title: "3年総括",
    sub: "タイムライン分析",
    desc: "好調→拡大→危機の全ストーリーを俯瞰",
  },
];

export default function CompanyHubPage() {
  const { years, nameJa, industry, description } = sakuraTrading;

  // Build chart data for 3-year overview
  const chartData = years.map((y) => ({
    year: y.fiscalYear,
    revenue: y.pl.revenue,
    operatingProfit: y.pl.operatingProfit,
    operatingCF: y.cf.operatingCF,
  }));

  const metrics: MetricConfig[] = [
    { key: "revenue", label: "売上高", color: "#2563eb", unit: "百万円" },
    {
      key: "operatingProfit",
      label: "営業利益",
      color: "#16a34a",
      unit: "百万円",
    },
    { key: "operatingCF", label: "営業CF", color: "#f97316", unit: "百万円" },
  ];

  const phaseAreas = [
    { x1: 2021.5, x2: 2022.5, phase: "good" as const },
    { x1: 2022.5, x2: 2023.5, phase: "warning" as const },
    { x1: 2023.5, x2: 2024.5, phase: "crisis" as const },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <Link href="/learn" className="hover:text-orange-600">
            学習
          </Link>
          <span>/</span>
          <span className="text-gray-700">企業分析</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
          {nameJa}
        </h1>
        <p className="text-sm text-gray-500 mb-3">
          業種: {industry}
        </p>
        <p className="text-gray-600">{description}</p>
      </div>

      {/* 3-year summary cards */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-gray-800 mb-4">
          3年間のサマリー
        </h2>
        <div className="grid sm:grid-cols-3 gap-4">
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
              <div
                key={year.fiscalYear}
                className={`rounded-2xl border-2 p-5 ${cfg.bg} ${cfg.border}`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg ${cfg.iconBg} ${cfg.text}`}
                    aria-hidden="true"
                  >
                    {cfg.icon}
                  </span>
                  <div>
                    <p className={`text-xs font-bold ${cfg.text}`}>
                      {cfg.label}
                    </p>
                    <p className="text-base font-bold text-gray-800">
                      {year.label}
                    </p>
                  </div>
                </div>
                <dl className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-gray-600">売上高</dt>
                    <dd className="font-medium">
                      {year.pl.revenue.toLocaleString()}百万円
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">純利益</dt>
                    <dd
                      className={`font-medium ${year.pl.netIncome < 0 ? "text-red-600" : ""}`}
                    >
                      {year.pl.netIncome >= 0 ? "+" : ""}
                      {year.pl.netIncome.toLocaleString()}百万円
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">粗利率</dt>
                    <dd className="font-medium">{grossProfitRate}%</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">棚卸資産</dt>
                    <dd className="font-medium text-amber-700">
                      {year.bs.inventory.toLocaleString()}百万円
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">営業CF</dt>
                    <dd
                      className={`font-medium ${year.cf.operatingCF < 0 ? "text-red-600" : "text-green-700"}`}
                    >
                      {year.cf.operatingCF >= 0 ? "+" : ""}
                      {year.cf.operatingCF.toLocaleString()}百万円
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">流動比率</dt>
                    <dd
                      className={`font-medium ${Number(currentRatio) < 100 ? "text-red-600" : ""}`}
                    >
                      {currentRatio}%
                    </dd>
                  </div>
                </dl>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3-year trend chart */}
      <section className="mb-8 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">
          3年推移チャート — 売上・営業利益・営業CF
        </h2>
        <p className="text-xs text-gray-500 mb-4">
          背景色: 緑=好調期 / 黄=危険期 / 赤=危機期
        </p>
        <YearComparisonChart
          data={chartData}
          metrics={metrics}
          phaseAreas={phaseAreas}
          unit="百万円"
        />
        <p className="text-xs text-gray-500 mt-3">
          ポイント: 売上（青）は増え続けているのに、営業CF（橙）が急落→マイナス転落することに注目
        </p>
      </section>

      {/* Navigation to detail pages */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-gray-800 mb-4">
          詳細分析ページ
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {navCards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="flex items-start gap-4 bg-white rounded-2xl p-5 shadow-sm border-2 border-orange-100 hover:border-orange-300 hover:shadow-md transition-all"
            >
              <span className="text-3xl">{card.icon}</span>
              <div>
                <p className="font-bold text-gray-800">
                  {card.title}
                  <span className="ml-2 text-xs font-normal text-gray-500">
                    ({card.sub})
                  </span>
                </p>
                <p className="text-sm text-gray-600 mt-0.5">{card.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA to case-study quiz */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-6 text-white text-center">
        <p className="text-lg font-bold mb-2">
          理解度をクイズで確認しよう
        </p>
        <p className="text-sm text-orange-100 mb-4">
          サクラ商事のデータを使った10問のケーススタディクイズに挑戦
        </p>
        <Link
          href="/quiz/case-study"
          className="inline-block bg-white text-orange-600 font-bold px-6 py-2.5 rounded-xl hover:bg-orange-50 transition-colors"
        >
          ケーススタディクイズを解く →
        </Link>
      </div>
    </div>
  );
}
