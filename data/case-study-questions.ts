import { CaseStudyQuestion } from "@/lib/types";

export const caseStudyQuestions: CaseStudyQuestion[] = [
  // ==========================================
  // 基礎レベル (basic)
  // ==========================================
  {
    id: "cs-001",
    type: "multiple_choice",
    category: "case-study",
    companyId: "sakura-trading",
    targetYears: [2022, 2023, 2024],
    focusStatement: "PL",
    focusMetrics: ["revenue", "netIncome", "grossProfit"],
    difficulty: "basic",
    question:
      "サクラ商事のFY2022→FY2024を見ると、売上高は増加しているのに純利益が赤字転落しました。最も大きな原因はどれですか？",
    options: [
      "売上総利益率（粗利率）が25%から16.9%へ急低下した",
      "売上高の伸びが十分ではなかった",
      "法人税の税率が急上昇した",
      "営業外収益が減少した",
    ],
    correctAnswer: "売上総利益率（粗利率）が25%から16.9%へ急低下した",
    correctIndex: 0,
    explanation:
      "売上高は8,000→13,000百万円と62.5%増えましたが、粗利率は25%→16.9%へ急落しました。売れない在庫を値引き処分したことで原価率が上昇し、売上増加分を利益に変換できなくなったためです。売上が増えても「稼ぐ力（粗利率）」が落ちれば利益は消えます。",
    hint: "PLの上から順に「率」の変化を追いましょう。絶対額より変化率が重要です。",
  },
  {
    id: "cs-002",
    type: "multiple_choice",
    category: "case-study",
    companyId: "sakura-trading",
    targetYears: [2022, 2023],
    focusStatement: "PL",
    focusMetrics: ["revenue", "grossProfit", "costOfSales"],
    difficulty: "basic",
    question:
      "FY2023、サクラ商事の売上高は+50%増加したのに粗利率は25%→23.3%に低下しました。この時点での「警戒サイン」として最も適切な解釈はどれですか？",
    options: [
      "売上の伸びに見合った粗利が確保できておらず、仕入コスト増の懸念がある",
      "売上が増えたのだから利益も増え、特に問題はない",
      "粗利率の低下は一時的なもので、規模が大きくなれば自然に回復する",
      "粗利率23.3%は業界平均より高いため心配不要",
    ],
    correctAnswer:
      "売上の伸びに見合った粗利が確保できておらず、仕入コスト増の懸念がある",
    correctIndex: 0,
    explanation:
      "粗利率の低下は「仕入れコストが売価上昇を上回っている」または「値引き販売が始まっている」サインです。FY2023時点では粗利額は増えているため見逃しやすいですが、この「率の低下」がFY2024の赤字転落の伏線でした。PLを読む際は額と率の両方を確認することが重要です。",
  },
  {
    id: "cs-003",
    type: "multiple_choice",
    category: "case-study",
    companyId: "sakura-trading",
    targetYears: [2022, 2023],
    focusStatement: "BS",
    focusMetrics: ["inventory", "currentAssets", "currentLiabilities"],
    difficulty: "basic",
    question:
      "FY2023、サクラ商事の棚卸資産が800→2,000百万円に急増しました。これがBSに与える影響として正しいのはどれですか？",
    options: [
      "流動資産は増えるが、現金でないため資金繰りは改善しない",
      "在庫が増えると売上も比例して増えるため、利益が拡大する",
      "棚卸資産増加は固定資産に計上されるため流動比率は変化しない",
      "在庫が多いほど自己資本比率が高まり、財務安全性が向上する",
    ],
    correctAnswer:
      "流動資産は増えるが、現金でないため資金繰りは改善しない",
    correctIndex: 0,
    explanation:
      "棚卸資産は流動資産に含まれるため、流動資産の総額は増えます。しかし在庫は「まだ現金になっていない資産」であり、支払いには使えません。現金・売掛金とは異なり、在庫が膨らむほど「見た目の流動資産は大きいが手元現金は少ない」という危険な状態になります。",
  },

  // ==========================================
  // 中級レベル (intermediate)
  // ==========================================
  {
    id: "cs-004",
    type: "multiple_choice",
    category: "case-study",
    companyId: "sakura-trading",
    targetYears: [2022, 2023, 2024],
    focusStatement: "BS",
    focusMetrics: ["currentRatio", "currentAssets", "currentLiabilities"],
    difficulty: "intermediate",
    question:
      "サクラ商事の流動比率はFY2022:200%→FY2023:125%→FY2024:95%と推移しました。FY2024の「95%」が危険な理由はどれですか？",
    options: [
      "流動比率100%未満は、1年以内に支払う負債を流動資産でカバーできないことを意味する",
      "流動比率は200%以上が理想だが、95%でもキャッシュフローが良ければ問題ない",
      "流動比率95%は業界標準の範囲内で、危険な水準ではない",
      "流動比率の低下は景気サイクルによるもので、翌年には自然回復する",
    ],
    correctAnswer:
      "流動比率100%未満は、1年以内に支払う負債を流動資産でカバーできないことを意味する",
    correctIndex: 0,
    explanation:
      "流動比率 = 流動資産 ÷ 流動負債 × 100。100%未満は「今後1年以内に返済・支払う義務（流動負債4,200百万円）が、1年以内に現金化できる資産（流動資産4,000百万円）を上回る」状態です。差額200百万円分の資金ショートが発生するリスクがあり、黒字倒産の前兆となりえます。",
  },
  {
    id: "cs-005",
    type: "multiple_choice",
    category: "case-study",
    companyId: "sakura-trading",
    targetYears: [2022, 2023],
    focusStatement: "CF",
    focusMetrics: ["operatingCF", "inventory"],
    difficulty: "intermediate",
    question:
      "FY2023、営業利益は800→1,000百万円に増えたのに、営業CFは700→100百万円へ激減しました。最大の要因はどれですか？",
    options: [
      "棚卸資産が1,200百万円増加し、現金が在庫に変換されたため",
      "法人税の支払いが急増したため",
      "設備投資を大幅に増やしたため",
      "売上債権の回収が遅れたため",
    ],
    correctAnswer:
      "棚卸資産が1,200百万円増加し、現金が在庫に変換されたため",
    correctIndex: 0,
    explanation:
      "間接法の営業CFでは「棚卸資産の増加」はマイナス調整項目として扱われます。FY2023に棚卸資産が1,200百万円増えた（800→2,000）ため、利益は出ているのに現金がその分「在庫」に変換されました。これが「利益（PL）とキャッシュ（CF）のズレ」の典型例です。PLだけを見ていると危機を見逃します。",
  },
  {
    id: "cs-006",
    type: "multiple_choice",
    category: "case-study",
    companyId: "sakura-trading",
    targetYears: [2023, 2024],
    focusStatement: "CF",
    focusMetrics: ["operatingCF", "financingCF", "inventory"],
    difficulty: "intermediate",
    question:
      "FY2024、サクラ商事の財務CF +800百万円は何を意味しますか？このサインをどう読むべきですか？",
    options: [
      "営業CFがマイナスで現金が不足しているため、借入で補填している危険なサイン",
      "株主への配当を増やしたことによる資金流出のサイン",
      "好調な本業収益を活かして積極的に借入を活用している成長のサイン",
      "長期借入金の返済が進み、財務健全性が高まっているサイン",
    ],
    correctAnswer:
      "営業CFがマイナスで現金が不足しているため、借入で補填している危険なサイン",
    correctIndex: 0,
    explanation:
      "財務CFがプラス（+800）は「外部からの資金調達（借入や増資）が返済より多い」ことを示します。本来、健全な企業は営業CFで稼いだ現金から返済し、財務CFはマイナスになります。FY2024のサクラ商事は営業CF -300（本業での現金流出）を借入（財務CF +800）で穴埋めしており、「借金で生活費を賄う」危険な状態です。",
  },

  // ==========================================
  // 上級レベル (advanced)
  // ==========================================
  {
    id: "cs-007",
    type: "multiple_choice",
    category: "case-study",
    companyId: "sakura-trading",
    targetYears: [2024],
    focusStatement: "CF",
    focusMetrics: ["operatingCF", "investingCF", "financingCF"],
    difficulty: "advanced",
    question:
      "FY2024のCFパターンは「営業CF: -300 / 投資CF: -900 / 財務CF: +800」です。このパターンが示すリスクを最も正確に説明しているのはどれですか？",
    options: [
      "本業で現金を失いながら投資も続け、借入でしのいでいる最も危険なパターン",
      "投資積極型で一時的に借入が増えているが、将来の成長に向けた健全な戦略",
      "営業CFのマイナスは会計上の処理によるもので、実態の資金繰りは問題ない",
      "財務CFがプラスであるため、銀行からの信認が高い優良企業の証",
    ],
    correctAnswer:
      "本業で現金を失いながら投資も続け、借入でしのいでいる最も危険なパターン",
    correctIndex: 0,
    explanation:
      "CFのパターン診断：①営業CF+ / 投資CF- / 財務CF- = 健全成長型、②営業CF+ / 投資CF- / 財務CF+ = 積極投資型（要注意）、③営業CF- / 投資CF+ / 財務CF+ = 延命型（危険）、④営業CF- / 投資CF- / 財務CF+ = 最危険型。サクラ商事FY2024は④に近く、本業が赤字でかつ投資を継続し、全て借入に依存しています。FCF（営業+投資）= -1,200という壊滅的な状況です。",
  },
  {
    id: "cs-008",
    type: "multiple_choice",
    category: "case-study",
    companyId: "sakura-trading",
    targetYears: [2022, 2023, 2024],
    focusStatement: "BS",
    focusMetrics: ["equity", "totalAssets", "totalLiabilities"],
    difficulty: "advanced",
    question:
      "サクラ商事の自己資本比率はFY2022:66.7%→FY2023:42.9%→FY2024:35.4%と急低下しました。この変化を引き起こした主因の組み合わせはどれですか？",
    options: [
      "借入急増による総資産の拡大と、赤字による純資産の減少が同時に発生した",
      "株主への大幅な配当支払いにより純資産が急減した",
      "固定資産の評価損によって総資産が縮小した",
      "増資によって発行株式数が増加し、一株あたり純資産が希薄化した",
    ],
    correctAnswer:
      "借入急増による総資産の拡大と、赤字による純資産の減少が同時に発生した",
    correctIndex: 0,
    explanation:
      "自己資本比率 = 純資産 ÷ 総資産。この比率が下がるのは「分子（純資産）が減る」か「分母（総資産）が増える」かその両方。サクラ商事は①FY2023に大型借入1,200百万円で総資産が急拡大（分母増）、②FY2024に100百万円の最終赤字で純資産が減少（分子減）の両方が重なりました。財務レバレッジの過剰活用がもたらす典型的な自己資本比率の悪化パターンです。",
  },
  {
    id: "cs-009",
    type: "multiple_choice",
    category: "case-study",
    companyId: "sakura-trading",
    targetYears: [2022, 2023, 2024],
    focusStatement: "MULTI",
    focusMetrics: [
      "revenue",
      "operatingProfit",
      "operatingCF",
      "inventory",
      "currentRatio",
    ],
    difficulty: "advanced",
    question:
      "財務三表（PL・BS・CF）を総合的に見て、サクラ商事FY2024の最も深刻な問題点を一つ挙げるとすれば、どれですか？",
    options: [
      "営業CFがマイナスで、本業が現金を生み出せず運転資金を借入に依存している",
      "純利益が赤字になったことで、PLの「ボトムライン」が悪化した",
      "自己資本比率が35%に低下し、財務安全性の基準である50%を下回った",
      "売上高成長率が前年比+8.3%に鈍化し、成長の勢いが失われた",
    ],
    correctAnswer:
      "営業CFがマイナスで、本業が現金を生み出せず運転資金を借入に依存している",
    correctIndex: 0,
    explanation:
      "三表のつながりで見ると：PLの純利益赤字はすでに深刻ですが、さらに根本的な問題は「営業CFのマイナス（-300百万円）」です。利益の有無にかかわらず、本業で現金を稼げない企業は早晩資金ショートします。借入（財務CF+800）で補填していますが、これは持続不可能。棚卸資産2,500百万円が現金化されない限り、借入が増える一方で流動比率95%の危機状態が続きます。",
    hint: "CFが最も「現実の経営」を反映しています。PLは「利益」、BSは「財産の写真」、CFは「現金の動き」です。",
  },
  {
    id: "cs-010",
    type: "multiple_choice",
    category: "case-study",
    companyId: "sakura-trading",
    targetYears: [2022, 2023, 2024],
    focusStatement: "MULTI",
    focusMetrics: [
      "inventory",
      "operatingCF",
      "currentRatio",
      "grossProfit",
    ],
    difficulty: "advanced",
    question:
      "サクラ商事の再建を支援するため、最初に改善すべき指標はどれですか？その理由とともに最も適切な回答を選んでください。",
    options: [
      "棚卸資産の削減（→営業CFの改善→流動比率の回復という連鎖改善が見込める）",
      "売上高の拡大（→規模の経済で粗利率が自然回復する）",
      "新規借入による流動比率の改善（→安全性指標が直接改善する）",
      "販管費の削減（→営業利益率が回復し、PL上の数字が改善する）",
    ],
    correctAnswer:
      "棚卸資産の削減（→営業CFの改善→流動比率の回復という連鎖改善が見込める）",
    correctIndex: 0,
    explanation:
      "サクラ商事の問題の根本は「在庫の滞留」です。在庫を削減すれば：①棚卸資産↓→流動資産の現金化が進む、②CF計算書上の棚卸資産減少はプラス調整→営業CFが改善、③流動資産と流動負債の差が縮まり流動比率が回復、④値引き販売をやめれば粗利率も回復。「売上を増やして解決しようとする」のは在庫をさらに積み上げるリスクがあり逆効果です。財務三表は「連鎖」しており、根本原因（在庫）を特定することが再建の第一歩です。",
    hint: "どの指標を改善すれば、他の指標も連鎖的に改善するか考えてみましょう。",
  },
];

export const caseStudyCategory = {
  id: "case-study",
  name: "ケーススタディ（サクラ商事）",
  description:
    "架空企業サクラ商事の3年間の財務データから、PL・BS・CFを組み合わせた実践的な判断力を鍛える",
  questionCount: 10,
};
