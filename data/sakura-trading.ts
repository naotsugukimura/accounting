import { CompanyData } from "@/lib/types";

export const sakuraTrading: CompanyData = {
  id: "sakura-trading",
  nameJa: "サクラ商事株式会社",
  industry: "食品流通業",
  description:
    "関東圏を中心に食品の卸売・小売を手がける中堅企業。地場スーパーへの安定供給で知られていたが、大手流通グループへの参入を目指し急拡大路線に転換した。",
  overallNarrative:
    "売上は3年で62.5%増加した一方、棚卸資産が3倍超に膨張し、営業キャッシュフローがマイナスに転落。「売上が増えているのに資金繰りが悪化する」典型例として財務三表分析の好教材。",
  years: [
    // ============================================================
    // FY2022 — 好調期
    // ============================================================
    {
      fiscalYear: 2022,
      label: "FY2022",
      phase: "good",
      pl: {
        revenue: 8000,
        costOfSales: 6000,
        grossProfit: 2000,
        sellingAdminExpenses: 1200,
        operatingProfit: 800,
        nonOperatingBalance: -50,
        ordinaryProfit: 750,
        extraordinaryBalance: 0,
        taxExpense: 250,
        netIncome: 500,
      },
      bs: {
        cash: 600,
        receivables: 500,
        inventory: 800,
        otherCurrentAssets: 100,
        currentAssets: 2000,
        nonCurrentAssets: 1000,
        totalAssets: 3000,
        currentLiabilities: 1000,
        nonCurrentLiabilities: 0,
        totalLiabilities: 1000,
        equity: 2000,
      },
      cf: {
        operatingCF: 700,
        investingCF: -200,
        financingCF: -100,
        netCashChange: 400,
        endingCash: 600,
      },
      narrativePoints: [
        "売上高 8,000百万円、営業利益率10%を達成。本業の収益力は盤石",
        "棚卸資産800百万円、流動比率200%と財務健全性は高い",
        "営業CF 700百万円のキャッシュ創出力で、借入返済と設備投資を自力で賄う",
        "食品流通大手との取引拡大を狙い、翌年度から積極拡大路線に転換を決定",
      ],
    },

    // ============================================================
    // FY2023 — 拡大危険期
    // ============================================================
    {
      fiscalYear: 2023,
      label: "FY2023",
      phase: "warning",
      pl: {
        revenue: 12000,
        costOfSales: 9200,
        grossProfit: 2800,
        sellingAdminExpenses: 1800,
        operatingProfit: 1000,
        nonOperatingBalance: -150,
        ordinaryProfit: 850,
        extraordinaryBalance: 0,
        taxExpense: 450,
        netIncome: 400,
      },
      bs: {
        cash: 700,
        receivables: 900,
        inventory: 2000,
        otherCurrentAssets: 100,
        currentAssets: 3700,
        nonCurrentAssets: 1900,
        totalAssets: 5600,
        currentLiabilities: 2960,
        nonCurrentLiabilities: 240,
        totalLiabilities: 3200,
        equity: 2400,
      },
      cf: {
        operatingCF: 100,
        investingCF: -1200,
        financingCF: 1200,
        netCashChange: 100,
        endingCash: 700,
      },
      narrativePoints: [
        "売上高が+50%増と急拡大。営業利益も1,000百万円に増加し、PLは好調に見える",
        "棚卸資産が800→2,000百万円に急増。売れない在庫が急速に積み上がっている",
        "大型設備投資1,200百万円を借入金で実施。財務CF+1,200は借入急増のサイン",
        "営業CFが700→100百万円に激減。利益は出ているのに現金が生み出せない状態",
        "流動比率125%に低下。健全基準200%を大きく下回り、短期支払い能力に不安",
      ],
    },

    // ============================================================
    // FY2024 — 危機期
    // ============================================================
    {
      fiscalYear: 2024,
      label: "FY2024",
      phase: "crisis",
      pl: {
        revenue: 13000,
        costOfSales: 10800,
        grossProfit: 2200,
        sellingAdminExpenses: 2000,
        operatingProfit: 200,
        nonOperatingBalance: -200,
        ordinaryProfit: 0,
        extraordinaryBalance: -100,
        taxExpense: 0,
        netIncome: -100,
      },
      bs: {
        cash: 300,
        receivables: 1100,
        inventory: 2500,
        otherCurrentAssets: 100,
        currentAssets: 4000,
        nonCurrentAssets: 2500,
        totalAssets: 6500,
        currentLiabilities: 4200,
        nonCurrentLiabilities: 0,
        totalLiabilities: 4200,
        equity: 2300,
      },
      cf: {
        operatingCF: -300,
        investingCF: -900,
        financingCF: 800,
        netCashChange: -400,
        endingCash: 300,
      },
      narrativePoints: [
        "売上高は13,000百万円に増加したが、粗利率が25%→16.9%へ急落。値引き販売で在庫を捌こうとしたため",
        "営業利益200百万円まで激減。棚卸資産の評価損100百万円（特別損失）が発生し最終赤字転落",
        "棚卸資産2,500百万円が現金化されず、営業CF -300百万円に。本業が現金を「食い潰す」状態",
        "流動比率95%が示す危機：流動負債（4,200）が流動資産（4,000）を上回り、支払い不能リスク",
        "資金繰りのため再度借入（財務CF +800）。借金で借金を返す悪循環に突入",
      ],
    },
  ],
};

// ============================================================
// Helper: computed ratio utilities
// ============================================================

export function getGrossProfitRate(fiscalYear: number): number {
  const year = sakuraTrading.years.find((y) => y.fiscalYear === fiscalYear);
  if (!year) return 0;
  return (year.pl.grossProfit / year.pl.revenue) * 100;
}

export function getOperatingProfitRate(fiscalYear: number): number {
  const year = sakuraTrading.years.find((y) => y.fiscalYear === fiscalYear);
  if (!year) return 0;
  return (year.pl.operatingProfit / year.pl.revenue) * 100;
}

export function getCurrentRatio(fiscalYear: number): number {
  const year = sakuraTrading.years.find((y) => y.fiscalYear === fiscalYear);
  if (!year) return 0;
  return (year.bs.currentAssets / year.bs.currentLiabilities) * 100;
}

export function getEquityRatio(fiscalYear: number): number {
  const year = sakuraTrading.years.find((y) => y.fiscalYear === fiscalYear);
  if (!year) return 0;
  return (year.bs.equity / year.bs.totalAssets) * 100;
}
