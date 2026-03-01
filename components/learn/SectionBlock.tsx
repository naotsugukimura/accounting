export default function SectionBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-3 pb-2 border-b-2 border-orange-300 text-gray-800">
        {title}
      </h2>
      <div className="text-gray-700 leading-relaxed">{children}</div>
    </div>
  );
}
