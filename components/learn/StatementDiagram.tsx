import { DiagramItem } from "@/lib/types";

function DiagramRow({ item }: { item: DiagramItem }) {
  return (
    <div className="mb-1">
      <div className={`${item.color} text-white rounded-lg px-4 py-2 flex justify-between items-center`}>
        <span className="font-bold text-sm">{item.label}</span>
        {item.sublabel && (
          <span className="text-xs opacity-80">{item.sublabel}</span>
        )}
      </div>
      {item.children && (
        <div className="ml-6 mt-1 space-y-1">
          {item.children.map((child) => (
            <div
              key={child.label}
              className={`${child.color} rounded px-3 py-1 text-xs text-gray-700`}
            >
              {child.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function StatementDiagram({
  items,
  title,
}: {
  items: DiagramItem[];
  title: string;
}) {
  return (
    <div className="bg-gray-50 rounded-2xl p-6 mb-8">
      <h3 className="text-lg font-bold mb-4 text-gray-700">{title}</h3>
      <div className="space-y-1">
        {items.map((item) => (
          <DiagramRow key={item.label} item={item} />
        ))}
      </div>
    </div>
  );
}
