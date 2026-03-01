import { TermDefinition } from "@/lib/types";

export default function TermCard({ term }: { term: TermDefinition }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div className="flex items-baseline gap-2 mb-2">
        <h3 className="font-bold text-orange-600">{term.term}</h3>
        {term.english && (
          <span className="text-xs text-gray-400">{term.english}</span>
        )}
      </div>
      <p className="text-sm text-gray-700 mb-2">{term.definition}</p>
      {term.formula && (
        <div className="bg-orange-50 rounded-lg px-3 py-2 text-sm font-mono text-orange-700">
          {term.formula}
        </div>
      )}
    </div>
  );
}
