import { TermDefinition } from "@/lib/types";
import TermCard from "./TermCard";

export default function TermGrid({ terms }: { terms: TermDefinition[] }) {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {terms.map((term) => (
        <TermCard key={term.term} term={term} />
      ))}
    </div>
  );
}
