import { TermDefinition, DiagramItem } from "@/lib/types";

export const bsLeftDiagram: DiagramItem[] = [
  {
    label: "流動資産",
    sublabel: "Current Assets",
    color: "bg-blue-400",
    children: [
      { label: "現金及び預金", color: "bg-blue-200" },
      { label: "売掛金", color: "bg-blue-200" },
      { label: "棚卸資産", color: "bg-blue-200" },
    ],
  },
  {
    label: "固定資産",
    sublabel: "Fixed Assets",
    color: "bg-blue-600",
    children: [
      { label: "有形固定資産", color: "bg-blue-300" },
      { label: "無形固定資産", color: "bg-blue-300" },
      { label: "投資その他の資産", color: "bg-blue-300" },
    ],
  },
];

export const bsRightDiagram: DiagramItem[] = [
  {
    label: "流動負債",
    sublabel: "Current Liabilities",
    color: "bg-red-400",
    children: [
      { label: "買掛金", color: "bg-red-200" },
      { label: "短期借入金", color: "bg-red-200" },
    ],
  },
  {
    label: "固定負債",
    sublabel: "Non-current Liabilities",
    color: "bg-red-500",
    children: [
      { label: "長期借入金", color: "bg-red-300" },
      { label: "社債", color: "bg-red-300" },
    ],
  },
  {
    label: "純資産",
    sublabel: "Equity",
    color: "bg-green-500",
    children: [
      { label: "資本金", color: "bg-green-200" },
      { label: "利益剰余金", color: "bg-green-200" },
    ],
  },
];

export const bsTerms: TermDefinition[] = [
  {
    term: "流動資産",
    reading: "りゅうどうしさん",
    english: "Current Assets",
    definition: "1年以内に現金化できる資産。現金、売掛金、棚卸資産（在庫）などが含まれる。",
  },
  {
    term: "固定資産",
    reading: "こていしさん",
    english: "Fixed Assets",
    definition: "1年を超えて保有する資産。建物、機械、土地（有形）、特許権（無形）、投資有価証券などが含まれる。",
  },
  {
    term: "流動負債",
    reading: "りゅうどうふさい",
    english: "Current Liabilities",
    definition: "1年以内に返済が必要な負債。買掛金、短期借入金、未払費用などが含まれる。",
  },
  {
    term: "固定負債",
    reading: "こていふさい",
    english: "Non-current Liabilities",
    definition: "返済が1年以上先の負債。長期借入金、社債、退職給付引当金などが含まれる。",
  },
  {
    term: "純資産",
    reading: "じゅんしさん",
    english: "Equity / Net Assets",
    definition: "資産から負債を差し引いた残り。株主の持ち分を表し、資本金と利益の蓄積（利益剰余金）で構成される。",
    formula: "資産 - 負債 = 純資産",
  },
  {
    term: "利益剰余金",
    reading: "りえきじょうよきん",
    english: "Retained Earnings",
    definition: "過去の利益の蓄積額。PLの当期純利益がここに加算されていく。企業の体力を示す重要な指標。",
  },
  {
    term: "売掛金",
    reading: "うりかけきん",
    english: "Accounts Receivable",
    definition: "商品やサービスを提供したが、まだ代金を受け取っていない債権。",
  },
  {
    term: "棚卸資産",
    reading: "たなおろししさん",
    english: "Inventory",
    definition: "販売目的で保有している商品や原材料、仕掛品の在庫。",
  },
];

export const bsSections = [
  {
    title: "BSとは？",
    content:
      "貸借対照表（BS）は、ある時点における企業の財政状態を示す財務諸表です。左側に「資産」（何を持っているか）、右側に「負債」（いくら借りているか）と「純資産」（株主の持ち分）を配置します。",
  },
  {
    title: "バランスの原則",
    content:
      "BSの基本等式は「資産 = 負債 + 純資産」です。左右が必ず一致（バランス）するため「バランスシート」と呼ばれます。資金の調達源（右側）と運用先（左側）を対比して見ることができます。",
  },
  {
    title: "読み方のポイント",
    content:
      "BSを読む際は、①自己資本比率（純資産÷総資産）が十分か②流動比率（流動資産÷流動負債）で短期的な支払い能力は大丈夫か③利益剰余金が増えているか、の3点に注目しましょう。",
  },
];
