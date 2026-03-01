import Link from "next/link";

const sections = [
  {
    href: "/learn",
    title: "学習コンテンツ",
    description: "PL（損益計算書）・BS（貸借対照表）・CF（キャッシュフロー計算書）の基礎を図解で学ぶ",
    icon: "📖",
  },
  {
    href: "/company",
    title: "企業分析（実践）",
    description: "架空企業サクラ商事の3年間を追い、PL・BS・CFを組み合わせた判断力を実践的に学ぶ",
    icon: "🏢",
    badge: "NEW",
  },
  {
    href: "/calculator",
    title: "財務指標計算ツール",
    description: "数値を入力するだけでROE・ROA・自己資本比率など主要指標を自動計算",
    icon: "🔢",
  },
  {
    href: "/quiz",
    title: "クイズ・練習問題",
    description: "PL・BS・CF・財務指標の理解度をチェック。カテゴリ別に出題",
    icon: "✏️",
  },
];

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">
          企業財務分析を
          <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
            学ぼう
          </span>
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          財務三表（PL・BS・CF）の読み方から財務指標の計算まで、
          企業分析に必要な知識をインタラクティブに学べます。
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="relative block p-6 bg-white rounded-2xl shadow-md border-2 border-orange-100 hover:border-orange-300 hover:shadow-lg transition-all"
          >
            {"badge" in section && section.badge && (
              <span className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {section.badge}
              </span>
            )}
            <div className="text-4xl mb-4">{section.icon}</div>
            <h2 className="text-xl font-bold mb-2 text-gray-800">{section.title}</h2>
            <p className="text-gray-600 text-sm">{section.description}</p>
          </Link>
        ))}
      </div>

      <div className="mt-16 bg-orange-50 rounded-2xl p-8">
        <h2 className="text-xl font-bold mb-4 text-gray-800">財務三表とは？</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h3 className="font-bold text-orange-600 mb-1">PL（損益計算書）</h3>
            <p className="text-sm text-gray-600">一定期間の収益と費用から「稼ぐ力」を示す</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h3 className="font-bold text-orange-600 mb-1">BS（貸借対照表）</h3>
            <p className="text-sm text-gray-600">ある時点の資産・負債・純資産で「財政状態」を示す</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h3 className="font-bold text-orange-600 mb-1">CF（キャッシュフロー計算書）</h3>
            <p className="text-sm text-gray-600">一定期間の現金の動きで「資金繰り」を示す</p>
          </div>
        </div>
      </div>
    </div>
  );
}
