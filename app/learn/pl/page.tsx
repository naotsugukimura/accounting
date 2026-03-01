import SectionBlock from "@/components/learn/SectionBlock";
import StatementDiagram from "@/components/learn/StatementDiagram";
import TermGrid from "@/components/learn/TermGrid";
import { plDiagram, plTerms, plSections } from "@/data/pl-content";

export default function PLPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">損益計算書 (PL)</h1>

      {plSections.map((section) => (
        <SectionBlock key={section.title} title={section.title}>
          <p>{section.content}</p>
        </SectionBlock>
      ))}

      <StatementDiagram items={plDiagram} title="PLの構造" />

      <SectionBlock title="主要用語">
        <TermGrid terms={plTerms} />
      </SectionBlock>
    </div>
  );
}
