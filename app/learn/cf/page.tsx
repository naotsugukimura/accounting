import SectionBlock from "@/components/learn/SectionBlock";
import StatementDiagram from "@/components/learn/StatementDiagram";
import TermGrid from "@/components/learn/TermGrid";
import { cfDiagram, cfTerms, cfSections } from "@/data/cf-content";

export default function CFPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">キャッシュフロー計算書 (CF)</h1>

      {cfSections.map((section) => (
        <SectionBlock key={section.title} title={section.title}>
          <p>{section.content}</p>
        </SectionBlock>
      ))}

      <StatementDiagram items={cfDiagram} title="CFの構造" />

      <div className="bg-gray-50 rounded-2xl p-6 mb-8">
        <h3 className="text-lg font-bold mb-4 text-gray-700">CFパターン分析</h3>
        <div className="space-y-3">
          <div className="bg-white rounded-xl p-4 border-l-4 border-green-500">
            <p className="font-bold text-sm text-green-700">健全な成長企業</p>
            <p className="text-xs text-gray-500 mt-1">
              営業CF(+) 投資CF(-) 財務CF(-) → 本業で稼ぎ、投資しつつ借入を返済
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 border-l-4 border-blue-500">
            <p className="font-bold text-sm text-blue-700">積極投資企業</p>
            <p className="text-xs text-gray-500 mt-1">
              営業CF(+) 投資CF(-) 財務CF(+) → 借入も活用して大きく投資
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 border-l-4 border-red-500">
            <p className="font-bold text-sm text-red-700">要注意企業</p>
            <p className="text-xs text-gray-500 mt-1">
              営業CF(-) 投資CF(+) 財務CF(+) → 本業が苦しく資産売却と借入に依存
            </p>
          </div>
        </div>
      </div>

      <SectionBlock title="主要用語">
        <TermGrid terms={cfTerms} />
      </SectionBlock>
    </div>
  );
}
