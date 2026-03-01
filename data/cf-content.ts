import { TermDefinition, DiagramItem } from "@/lib/types";

export const cfDiagram: DiagramItem[] = [
  {
    label: "営業活動によるCF",
    sublabel: "Operating CF",
    color: "bg-green-500",
    children: [
      { label: "税引前当期純利益", color: "bg-green-200" },
      { label: "減価償却費（加算）", color: "bg-green-200" },
      { label: "売掛金の増減", color: "bg-green-200" },
      { label: "棚卸資産の増減", color: "bg-green-200" },
    ],
  },
  {
    label: "投資活動によるCF",
    sublabel: "Investing CF",
    color: "bg-blue-500",
    children: [
      { label: "固定資産の取得", color: "bg-blue-200" },
      { label: "固定資産の売却", color: "bg-blue-200" },
      { label: "有価証券の売買", color: "bg-blue-200" },
    ],
  },
  {
    label: "財務活動によるCF",
    sublabel: "Financing CF",
    color: "bg-purple-500",
    children: [
      { label: "借入金の増減", color: "bg-purple-200" },
      { label: "社債の発行/償還", color: "bg-purple-200" },
      { label: "配当金の支払い", color: "bg-purple-200" },
    ],
  },
];

export const cfTerms: TermDefinition[] = [
  {
    term: "営業活動によるCF",
    reading: "えいぎょうかつどうによるCF",
    english: "Operating Cash Flow",
    definition: "本業の営業活動から生じたキャッシュの増減。プラスであることが健全な企業の基本条件。",
  },
  {
    term: "投資活動によるCF",
    reading: "とうしかつどうによるCF",
    english: "Investing Cash Flow",
    definition: "設備投資や資産売却によるキャッシュの増減。成長企業は設備投資のためマイナスになることが多い。",
  },
  {
    term: "財務活動によるCF",
    reading: "ざいむかつどうによるCF",
    english: "Financing Cash Flow",
    definition: "借入や返済、配当などの資金調達活動によるキャッシュの増減。",
  },
  {
    term: "フリーキャッシュフロー",
    reading: "FCF",
    english: "Free Cash Flow",
    definition: "営業CFから投資CFを差し引いた、企業が自由に使えるキャッシュ。企業価値評価の重要指標。",
    formula: "営業CF + 投資CF（通常マイナス）",
  },
  {
    term: "減価償却費",
    reading: "げんかしょうきゃくひ",
    english: "Depreciation",
    definition: "固定資産の取得費用を耐用年数にわたって配分する費用。PLでは費用だがキャッシュの流出を伴わないため、営業CFでは加算される。",
  },
];

export const cfSections = [
  {
    title: "CFとは？",
    content:
      "キャッシュフロー計算書（CF）は、一定期間における現金の流れを示す財務諸表です。PLが「利益」を示すのに対し、CFは「実際の現金の動き」を示します。利益が出ていても現金が不足して倒産する（黒字倒産）を防ぐために重要です。",
  },
  {
    title: "3つのCFの意味",
    content:
      "①営業CF：本業でキャッシュを稼げているか（プラスが基本）②投資CF：将来のために投資しているか（成長企業はマイナス）③財務CF：資金調達と返済のバランス。この3つの組み合わせで企業の状況を判断できます。",
  },
  {
    title: "CFパターン分析",
    content:
      "健全な成長企業：営業(+) 投資(-) 財務(-) → 本業で稼ぎ、投資しつつ借入を返済。積極投資企業：営業(+) 投資(-) 財務(+) → 借入も活用して大きく投資。要注意企業：営業(-) 投資(+) 財務(+) → 本業が苦しく資産売却と借入に依存。",
  },
];
