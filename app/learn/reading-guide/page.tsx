import SectionBlock from "@/components/learn/SectionBlock";

const steps = [
  {
    step: 1,
    title: "PLを読む：稼ぐ力を確認",
    items: [
      "売上高は成長しているか（前年比較）",
      "営業利益率は何%か（業界平均と比較）",
      "特別損益に大きな項目がないか",
      "当期純利益は安定しているか",
    ],
  },
  {
    step: 2,
    title: "BSを読む：財政状態を確認",
    items: [
      "自己資本比率は十分か（40%以上が目安）",
      "流動比率は100%以上あるか（短期の支払い能力）",
      "利益剰余金は増えているか（利益の蓄積）",
      "有利子負債は過大ではないか",
    ],
  },
  {
    step: 3,
    title: "CFを読む：現金の流れを確認",
    items: [
      "営業CFはプラスか（本業で現金を稼げているか）",
      "フリーキャッシュフロー（営業CF+投資CF）はプラスか",
      "CFパターンから企業の状況を判断",
      "現金残高は十分か",
    ],
  },
  {
    step: 4,
    title: "指標を計算：数値で比較",
    items: [
      "収益性指標（営業利益率、ROE、ROA）を算出",
      "安全性指標（自己資本比率、流動比率）を確認",
      "同業他社や業界平均と比較",
      "過去3〜5年の推移を確認",
    ],
  },
];

const redFlags = [
  "売上は増えているが営業利益率が下がっている → 安売りや費用増加の可能性",
  "営業CFが連続でマイナス → 本業でキャッシュを生めていない",
  "売掛金が売上以上に増加 → 回収リスクの増大",
  "棚卸資産が急増 → 在庫の滞留、評価損リスク",
  "有利子負債が自己資本を大きく上回る → 財務リスクが高い",
  "特別利益で最終利益を確保 → 本業の収益力が弱い可能性",
];

export default function ReadingGuidePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">決算書の読み方ガイド</h1>

      <SectionBlock title="決算書はどこで見られる？">
        <p className="mb-3">
          上場企業の決算書は以下で閲覧できます。
        </p>
        <ul className="list-disc list-inside text-sm space-y-1 text-gray-600">
          <li>EDINET（金融庁の電子開示システム）</li>
          <li>各企業のIR（投資家向け情報）ページ</li>
          <li>TDnet（適時開示情報閲覧サービス）</li>
          <li>証券会社の企業情報ページ</li>
        </ul>
      </SectionBlock>

      <SectionBlock title="読む手順">
        <div className="space-y-6">
          {steps.map((s) => (
            <div key={s.step} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                  {s.step}
                </span>
                <h3 className="font-bold text-gray-800">{s.title}</h3>
              </div>
              <ul className="list-disc list-inside text-sm space-y-1 text-gray-600">
                {s.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock title="要注意シグナル（レッドフラグ）">
        <div className="space-y-2">
          {redFlags.map((flag) => (
            <div
              key={flag}
              className="bg-red-50 rounded-lg p-3 text-sm text-red-800 border-l-4 border-red-400"
            >
              {flag}
            </div>
          ))}
        </div>
      </SectionBlock>
    </div>
  );
}
