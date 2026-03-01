import SectionBlock from "@/components/learn/SectionBlock";
import StatementDiagram from "@/components/learn/StatementDiagram";
import TermGrid from "@/components/learn/TermGrid";
import { bsLeftDiagram, bsRightDiagram, bsTerms, bsSections } from "@/data/bs-content";

export default function BSPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">貸借対照表 (BS)</h1>

      {bsSections.map((section) => (
        <SectionBlock key={section.title} title={section.title}>
          <p>{section.content}</p>
        </SectionBlock>
      ))}

      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <StatementDiagram items={bsLeftDiagram} title="資産（左側）" />
        <StatementDiagram items={bsRightDiagram} title="負債・純資産（右側）" />
      </div>

      <div className="bg-orange-50 rounded-2xl p-6 mb-8 text-center">
        <p className="text-lg font-bold text-orange-700">
          資産 = 負債 + 純資産
        </p>
        <p className="text-sm text-gray-600 mt-1">
          左右は必ず一致する（バランスする）
        </p>
      </div>

      <SectionBlock title="主要用語">
        <TermGrid terms={bsTerms} />
      </SectionBlock>
    </div>
  );
}
