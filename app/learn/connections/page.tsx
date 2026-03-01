import Link from "next/link";
import SectionBlock from "@/components/learn/SectionBlock";

const connections = [
  {
    from: "PL：当期純利益",
    to: "BS：利益剰余金",
    description: "PLで計算された当期純利益は、BSの純資産にある利益剰余金に加算される。利益が蓄積されるほど、企業の自己資本が厚くなる。",
    color: "border-green-500",
  },
  {
    from: "PL：当期純利益",
    to: "CF：営業CFの出発点",
    description: "間接法のCFでは、PLの当期純利益（税引前）を出発点として、非現金項目を調整して営業CFを算出する。",
    color: "border-blue-500",
  },
  {
    from: "CF：期末現金残高",
    to: "BS：現金及び預金",
    description: "CFで計算された期末の現金残高は、BSの流動資産にある現金及び預金と一致する。",
    color: "border-purple-500",
  },
  {
    from: "CF：投資CF",
    to: "BS：固定資産の増減",
    description: "投資CFでの設備投資や資産売却は、BSの固定資産の増減に対応する。",
    color: "border-orange-500",
  },
  {
    from: "CF：財務CF",
    to: "BS：負債・純資産の増減",
    description: "財務CFでの借入・返済はBSの負債に、増資・配当はBSの純資産に反映される。",
    color: "border-red-500",
  },
  {
    from: "PL：減価償却費",
    to: "BS：固定資産の減少",
    description: "PLに計上される減価償却費は、BSの固定資産の簿価を減少させる。ただし現金の流出は伴わないため、CFでは加算される。",
    color: "border-amber-500",
  },
];

export default function ConnectionsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">財務三表のつながり</h1>

      <SectionBlock title="なぜつながりを理解するのか？">
        <p>
          PL・BS・CFは独立した表ではなく、互いに連動しています。
          一つの取引が三表すべてに影響を与えることを理解すると、
          企業の全体像を立体的に把握できるようになります。
        </p>
      </SectionBlock>

      <div className="bg-gray-50 rounded-2xl p-6 mb-8">
        <h3 className="text-lg font-bold mb-4 text-gray-700">三表の関係図</h3>
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-100 rounded-xl p-4 text-center">
            <p className="font-bold text-blue-800">PL（損益計算書）</p>
            <p className="text-xs text-blue-600 mt-1">一定期間の損益</p>
          </div>
          <div className="bg-green-100 rounded-xl p-4 text-center">
            <p className="font-bold text-green-800">BS（貸借対照表）</p>
            <p className="text-xs text-green-600 mt-1">ある時点の財政状態</p>
          </div>
          <div className="bg-purple-100 rounded-xl p-4 text-center">
            <p className="font-bold text-purple-800">CF（キャッシュフロー計算書）</p>
            <p className="text-xs text-purple-600 mt-1">一定期間の現金の動き</p>
          </div>
        </div>
      </div>

      {/* Sakura trading link */}
      <div className="bg-orange-50 rounded-2xl border border-orange-200 p-5 mb-6">
        <p className="font-bold text-orange-800 mb-2">
          実例で確認：サクラ商事（架空企業）の3年間
        </p>
        <p className="text-sm text-orange-700 mb-3">
          三表のつながりを「ストーリー」として体験できます。売上が増えているのに倒産リスクが高まる——その理由が三表の連動で見えてきます。
        </p>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/company/pl"
            className="text-xs bg-white text-orange-600 border border-orange-300 px-3 py-1.5 rounded-lg hover:bg-orange-100 transition-colors"
          >
            PL分析を見る
          </Link>
          <Link
            href="/company/bs"
            className="text-xs bg-white text-orange-600 border border-orange-300 px-3 py-1.5 rounded-lg hover:bg-orange-100 transition-colors"
          >
            BS分析を見る
          </Link>
          <Link
            href="/company/cf"
            className="text-xs bg-white text-orange-600 border border-orange-300 px-3 py-1.5 rounded-lg hover:bg-orange-100 transition-colors"
          >
            CF分析を見る
          </Link>
          <Link
            href="/company/summary"
            className="text-xs bg-orange-500 text-white px-3 py-1.5 rounded-lg hover:bg-orange-600 transition-colors"
          >
            3年総括を見る →
          </Link>
        </div>
      </div>

      <SectionBlock title="主な連動ポイント">
        <div className="space-y-4">
          {connections.map((conn) => (
            <div
              key={conn.from + conn.to}
              className={`bg-white rounded-xl p-4 border-l-4 ${conn.color}`}
            >
              <div className="flex items-center gap-2 mb-2 text-sm font-bold">
                <span className="bg-gray-100 rounded px-2 py-1">{conn.from}</span>
                <span className="text-gray-400">→</span>
                <span className="bg-gray-100 rounded px-2 py-1">{conn.to}</span>
              </div>
              <p className="text-sm text-gray-700">{conn.description}</p>
            </div>
          ))}
        </div>
      </SectionBlock>
    </div>
  );
}
