import Link from "next/link";

const cards = [
  {
    href: "/learn/pl",
    title: "損益計算書 (PL)",
    description: "売上・費用・利益の関係を理解し、企業の「稼ぐ力」を読み解く",
    color: "border-blue-300 hover:border-blue-500",
  },
  {
    href: "/learn/bs",
    title: "貸借対照表 (BS)",
    description: "資産・負債・純資産のバランスから「財政状態」を把握する",
    color: "border-green-300 hover:border-green-500",
  },
  {
    href: "/learn/cf",
    title: "キャッシュフロー計算書 (CF)",
    description: "現金の流れから企業の「資金繰り」と「実力」を見抜く",
    color: "border-purple-300 hover:border-purple-500",
  },
  {
    href: "/learn/connections",
    title: "財務三表のつながり",
    description: "PL・BS・CFがどのように連動しているかを図解で理解する",
    color: "border-orange-300 hover:border-orange-500",
  },
  {
    href: "/learn/reading-guide",
    title: "決算書の読み方ガイド",
    description: "実際の決算書を読む手順とチェックポイントを学ぶ",
    color: "border-amber-300 hover:border-amber-500",
  },
];

export default function LearnPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">学習コンテンツ</h1>
      <p className="text-gray-600 mb-8">
        企業の財務状況を理解するための基礎知識を、図解と用語解説で学びましょう。
      </p>
      <div className="grid sm:grid-cols-2 gap-4">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className={`block p-6 bg-white rounded-2xl shadow-sm border-2 ${card.color} transition-all hover:shadow-md`}
          >
            <h2 className="text-lg font-bold mb-2 text-gray-800">{card.title}</h2>
            <p className="text-sm text-gray-600">{card.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
