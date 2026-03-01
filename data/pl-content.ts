import { TermDefinition, DiagramItem } from "@/lib/types";

export const plDiagram: DiagramItem[] = [
  { label: "売上高", sublabel: "Revenue", color: "bg-blue-500" },
  { label: "- 売上原価", sublabel: "COGS", color: "bg-red-300" },
  { label: "= 売上総利益", sublabel: "Gross Profit", color: "bg-green-400" },
  { label: "- 販管費", sublabel: "SGA Expenses", color: "bg-red-300" },
  { label: "= 営業利益", sublabel: "Operating Income", color: "bg-green-500" },
  { label: "+/- 営業外損益", sublabel: "Non-operating", color: "bg-yellow-300" },
  { label: "= 経常利益", sublabel: "Ordinary Income", color: "bg-green-500" },
  { label: "+/- 特別損益", sublabel: "Extraordinary", color: "bg-yellow-300" },
  { label: "- 法人税等", sublabel: "Taxes", color: "bg-red-300" },
  { label: "= 当期純利益", sublabel: "Net Income", color: "bg-green-600" },
];

export const plTerms: TermDefinition[] = [
  {
    term: "売上高",
    reading: "うりあげだか",
    english: "Revenue / Sales",
    definition: "企業が商品やサービスを販売して得た収入の合計額。PLの最上部に記載され「トップライン」とも呼ばれる。",
  },
  {
    term: "売上原価",
    reading: "うりあげげんか",
    english: "Cost of Goods Sold (COGS)",
    definition: "商品の仕入れや製造にかかった直接的なコスト。材料費・労務費・製造経費などが含まれる。",
  },
  {
    term: "売上総利益",
    reading: "うりあげそうりえき",
    english: "Gross Profit",
    definition: "売上高から売上原価を差し引いた利益。「粗利」とも呼ばれ、商品・サービス自体の収益力を示す。",
    formula: "売上高 - 売上原価",
  },
  {
    term: "販売費及び一般管理費",
    reading: "はんばいひおよびいっぱんかんりひ",
    english: "SGA Expenses",
    definition: "販売活動や管理業務にかかる費用の総称。広告費、人件費、家賃、減価償却費などが含まれる。略して「販管費」。",
  },
  {
    term: "営業利益",
    reading: "えいぎょうりえき",
    english: "Operating Income",
    definition: "売上総利益から販管費を差し引いた利益。本業の「稼ぐ力」を示す最も重要な利益指標の一つ。",
    formula: "売上総利益 - 販管費",
  },
  {
    term: "経常利益",
    reading: "けいじょうりえき",
    english: "Ordinary Income",
    definition: "営業利益に営業外収益（受取利息等）を加え、営業外費用（支払利息等）を差し引いた利益。企業の通常活動全体の収益力を示す。",
    formula: "営業利益 + 営業外収益 - 営業外費用",
  },
  {
    term: "当期純利益",
    reading: "とうきじゅんりえき",
    english: "Net Income",
    definition: "全ての収益から全ての費用・税金を差し引いた最終的な利益。「ボトムライン」とも呼ばれる。BSの利益剰余金に加算される。",
  },
];

export const plSections = [
  {
    title: "PLとは？",
    content:
      "損益計算書（PL）は、一定期間（通常1年間）における企業の収益と費用をまとめた財務諸表です。「いくら売って、いくら費用がかかり、いくら儲けたのか」を示します。",
  },
  {
    title: "5段階の利益",
    content:
      "PLには5つの利益段階があります。①売上総利益（商品力）→②営業利益（本業の収益力）→③経常利益（通常の経営力）→④税引前当期純利益→⑤当期純利益（最終利益）。上から下へ読み進めることで、どの段階で利益が生まれ、どこで減っているかを把握できます。",
  },
  {
    title: "読み方のポイント",
    content:
      "PLを読む際は、①売上高の推移（成長しているか）②営業利益率（本業で効率よく稼げているか）③特別損益の有無（一時的な要因がないか）の3点に注目しましょう。前年比較や同業他社比較も重要です。",
  },
];
