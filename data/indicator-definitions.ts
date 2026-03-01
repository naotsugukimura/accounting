import { IndicatorDefinition, FinancialInputs, HealthLevel } from "@/lib/types";

export const indicators: IndicatorDefinition[] = [
  // 収益性
  {
    id: "gross-margin",
    name: "売上総利益率",
    nameEnglish: "Gross Profit Margin",
    category: "profitability",
    formula: "(売上高 - 売上原価) ÷ 売上高 × 100",
    unit: "%",
    calculate: (i: FinancialInputs) =>
      i.revenue > 0 ? ((i.revenue - i.cogs) / i.revenue) * 100 : null,
    getHealth: (v: number): HealthLevel =>
      v >= 30 ? "good" : v >= 15 ? "caution" : "warning",
    thresholds: { good: "30%以上", caution: "15〜30%", warning: "15%未満" },
    description: "売上に対する粗利の割合。商品・サービスの収益力を示す。",
  },
  {
    id: "operating-margin",
    name: "営業利益率",
    nameEnglish: "Operating Profit Margin",
    category: "profitability",
    formula: "営業利益 ÷ 売上高 × 100",
    unit: "%",
    calculate: (i: FinancialInputs) =>
      i.revenue > 0 ? (i.operatingIncome / i.revenue) * 100 : null,
    getHealth: (v: number): HealthLevel =>
      v >= 10 ? "good" : v >= 3 ? "caution" : "warning",
    thresholds: { good: "10%以上", caution: "3〜10%", warning: "3%未満" },
    description: "本業の効率性を示す。高いほど本業で効率よく稼いでいる。",
  },
  {
    id: "roe",
    name: "ROE（自己資本利益率）",
    nameEnglish: "Return on Equity",
    category: "profitability",
    formula: "当期純利益 ÷ 自己資本 × 100",
    unit: "%",
    calculate: (i: FinancialInputs) =>
      i.equity > 0 ? (i.netIncome / i.equity) * 100 : null,
    getHealth: (v: number): HealthLevel =>
      v >= 10 ? "good" : v >= 5 ? "caution" : "warning",
    thresholds: { good: "10%以上", caution: "5〜10%", warning: "5%未満" },
    description: "株主の出資に対するリターン。投資家が最も重視する指標の一つ。",
  },
  {
    id: "roa",
    name: "ROA（総資産利益率）",
    nameEnglish: "Return on Assets",
    category: "profitability",
    formula: "当期純利益 ÷ 総資産 × 100",
    unit: "%",
    calculate: (i: FinancialInputs) =>
      i.totalAssets > 0 ? (i.netIncome / i.totalAssets) * 100 : null,
    getHealth: (v: number): HealthLevel =>
      v >= 5 ? "good" : v >= 2 ? "caution" : "warning",
    thresholds: { good: "5%以上", caution: "2〜5%", warning: "2%未満" },
    description: "総資産をどれだけ効率的に活用して利益を生んでいるかを示す。",
  },
  // 安全性
  {
    id: "equity-ratio",
    name: "自己資本比率",
    nameEnglish: "Equity Ratio",
    category: "safety",
    formula: "自己資本 ÷ 総資産 × 100",
    unit: "%",
    calculate: (i: FinancialInputs) =>
      i.totalAssets > 0 ? (i.equity / i.totalAssets) * 100 : null,
    getHealth: (v: number): HealthLevel =>
      v >= 40 ? "good" : v >= 20 ? "caution" : "warning",
    thresholds: { good: "40%以上", caution: "20〜40%", warning: "20%未満" },
    description: "総資産に占める自己資本の割合。高いほど財務が安定している。",
  },
  {
    id: "current-ratio",
    name: "流動比率",
    nameEnglish: "Current Ratio",
    category: "safety",
    formula: "流動資産 ÷ 流動負債 × 100",
    unit: "%",
    calculate: (i: FinancialInputs) =>
      i.currentLiabilities > 0
        ? (i.currentAssets / i.currentLiabilities) * 100
        : null,
    getHealth: (v: number): HealthLevel =>
      v >= 200 ? "good" : v >= 100 ? "caution" : "warning",
    thresholds: { good: "200%以上", caution: "100〜200%", warning: "100%未満" },
    description: "短期的な支払い能力を示す。100%を下回ると資金繰りに注意が必要。",
  },
  {
    id: "debt-ratio",
    name: "負債比率",
    nameEnglish: "Debt to Equity Ratio",
    category: "safety",
    formula: "負債合計 ÷ 自己資本 × 100",
    unit: "%",
    calculate: (i: FinancialInputs) =>
      i.equity > 0 ? (i.totalLiabilities / i.equity) * 100 : null,
    getHealth: (v: number): HealthLevel =>
      v <= 100 ? "good" : v <= 200 ? "caution" : "warning",
    thresholds: { good: "100%以下", caution: "100〜200%", warning: "200%超" },
    description: "自己資本に対する負債の割合。低いほど財務リスクが低い。",
  },
  // 効率性
  {
    id: "asset-turnover",
    name: "総資産回転率",
    nameEnglish: "Total Asset Turnover",
    category: "efficiency",
    formula: "売上高 ÷ 総資産",
    unit: "回",
    calculate: (i: FinancialInputs) =>
      i.totalAssets > 0 ? i.revenue / i.totalAssets : null,
    getHealth: (v: number): HealthLevel =>
      v >= 1.0 ? "good" : v >= 0.5 ? "caution" : "warning",
    thresholds: { good: "1.0回以上", caution: "0.5〜1.0回", warning: "0.5回未満" },
    description: "資産をどれだけ効率的に売上に変換しているかを示す。",
  },
  {
    id: "inventory-turnover",
    name: "棚卸資産回転率",
    nameEnglish: "Inventory Turnover",
    category: "efficiency",
    formula: "売上高 ÷ 棚卸資産",
    unit: "回",
    calculate: (i: FinancialInputs) =>
      i.inventory > 0 ? i.revenue / i.inventory : null,
    getHealth: (v: number): HealthLevel =>
      v >= 10 ? "good" : v >= 5 ? "caution" : "warning",
    thresholds: { good: "10回以上", caution: "5〜10回", warning: "5回未満" },
    description: "在庫がどれだけ効率的に売上に変換されているか。高いほど在庫管理が効率的。",
  },
  // 成長性
  {
    id: "revenue-growth",
    name: "売上高成長率",
    nameEnglish: "Revenue Growth Rate",
    category: "growth",
    formula: "(当期売上高 - 前期売上高) ÷ 前期売上高 × 100",
    unit: "%",
    calculate: (i: FinancialInputs) =>
      i.prevRevenue > 0
        ? ((i.revenue - i.prevRevenue) / i.prevRevenue) * 100
        : null,
    getHealth: (v: number): HealthLevel =>
      v >= 10 ? "good" : v >= 0 ? "caution" : "warning",
    thresholds: { good: "10%以上", caution: "0〜10%", warning: "マイナス" },
    description: "前年と比較した売上の成長率。企業の成長力を示す。",
  },
  {
    id: "profit-growth",
    name: "利益成長率",
    nameEnglish: "Net Income Growth Rate",
    category: "growth",
    formula: "(当期純利益 - 前期純利益) ÷ 前期純利益 × 100",
    unit: "%",
    calculate: (i: FinancialInputs) =>
      i.prevNetIncome > 0
        ? ((i.netIncome - i.prevNetIncome) / i.prevNetIncome) * 100
        : null,
    getHealth: (v: number): HealthLevel =>
      v >= 10 ? "good" : v >= 0 ? "caution" : "warning",
    thresholds: { good: "10%以上", caution: "0〜10%", warning: "マイナス" },
    description: "前年と比較した純利益の成長率。収益力の改善度合いを示す。",
  },
];

export const categoryLabels: Record<string, string> = {
  profitability: "収益性",
  safety: "安全性",
  efficiency: "効率性",
  growth: "成長性",
};
