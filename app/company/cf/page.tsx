import Link from "next/link";
import { sakuraTrading } from "@/data/sakura-trading";
import CFBarChart from "@/components/company/CFBarChart";
import WarningBadge from "@/components/company/WarningBadge";
import { HealthLevel, CFChartDataPoint } from "@/lib/types";

const phasePatternDiagnosis: Record<
  number,
  { label: string; bg: string; border: string; text: string; desc: string }
> = {
  2022: {
    label: "健全成長型",
    bg: "bg-green-50",
    border: "border-green-300",
    text: "text-green-800",
    desc: "本業で稼ぎ（営業+）、設備投資し（投資-）、借入返済（財務-）。最も健全なパターン。",
  },
  2023: {
    label: "積極投資型（要注意）",
    bg: "bg-yellow-50",
    border: "border-yellow-300",
    text: "text-yellow-800",
    desc: "本業でのCF創出が激減（営業+100）し、借入で投資資金を賄う。成長期待があるが棚卸膨張が懸念。",
  },
  2024: {
    label: "危機型（最要注意）",
    bg: "bg-red-50",
    border: "border-red-300",
    text: "text-red-800",
    desc: "本業がCFを消費（営業-300）しながら投資継続。借入（財務+800）で生命維持。FCF= -1,200百万円という壊滅的水準。",
  },
};

function getOpCFHealth(val: number): HealthLevel {
  if (val >= 500) return "good";
  if (val >= 200) return "caution";
  if (val >= 0) return "warning";
  return "danger";
}

function getFreeCFHealth(operating: number, investing: number): HealthLevel {
  const fcf = operating + investing;
  if (fcf >= 200) return "good";
  if (fcf >= 0) return "caution";
  if (fcf >= -500) return "warning";
  return "danger";
}

export default function CFPage() {
  const { years } = sakuraTrading;

  const chartData: CFChartDataPoint[] = years.map((y) => ({
    year: y.label,
    operating: y.cf.operatingCF,
    investing: y.cf.investingCF,
    financing: y.cf.financingCF,
    netChange: y.cf.netCashChange,
  }));

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/company" className="hover:text-orange-600">
          企業分析（サクラ商事）
        </Link>
        <span>/</span>
        <span className="text-gray-700">CF分析</span>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        キャッシュフロー（CF）分析 — サクラ商事
      </h1>

      {/* CF Bar Chart */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <h2 className="text-base font-bold text-gray-800 mb-2">
          3区分CFと現金増減の推移（百万円）
        </h2>
        <p className="text-xs text-gray-500 mb-4">
          ゼロラインより上がプラス（流入）、下がマイナス（流出）。営業CFの急落に注目。
        </p>
        <CFBarChart data={chartData} />
      </div>

      {/* Health badges per year */}
      <h2 className="text-base font-bold text-gray-800 mb-3">
        CF健全性指標の推移
      </h2>
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        {years.map((year) => {
          const fcf = year.cf.operatingCF + year.cf.investingCF;
          return (
            <div
              key={year.fiscalYear}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4"
            >
              <p className="font-bold text-gray-800 mb-3">{year.label}</p>
              <div className="space-y-2">
                <WarningBadge
                  level={getOpCFHealth(year.cf.operatingCF)}
                  metricName="営業CF"
                  value={`${year.cf.operatingCF >= 0 ? "+" : ""}${year.cf.operatingCF.toLocaleString()}百万円`}
                  benchmark="プラスが必須"
                />
                <WarningBadge
                  level={getFreeCFHealth(
                    year.cf.operatingCF,
                    year.cf.investingCF
                  )}
                  metricName="フリーCF"
                  value={`${fcf >= 0 ? "+" : ""}${fcf.toLocaleString()}百万円`}
                  benchmark="プラスが目安"
                />
                <WarningBadge
                  level={
                    year.cf.financingCF > 500
                      ? "warning"
                      : year.cf.financingCF > 0
                      ? "caution"
                      : "good"
                  }
                  metricName="財務CF（借入傾向）"
                  value={`${year.cf.financingCF >= 0 ? "+" : ""}${year.cf.financingCF.toLocaleString()}百万円`}
                  benchmark="過大なプラスは要注意"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* CF Pattern diagnosis */}
      <h2 className="text-base font-bold text-gray-800 mb-3">
        CFパターン診断
      </h2>
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        {years.map((year) => {
          const diag = phasePatternDiagnosis[year.fiscalYear];
          return (
            <div
              key={year.fiscalYear}
              className={`rounded-2xl border-2 p-4 ${diag.bg} ${diag.border}`}
            >
              <p className="text-xs text-gray-500 mb-1">{year.label}</p>
              <p className={`font-bold text-base mb-2 ${diag.text}`}>
                {diag.label}
              </p>
              <div className="text-xs space-y-1 mb-2">
                <p>
                  営業CF:{" "}
                  <span
                    className={
                      year.cf.operatingCF >= 0
                        ? "text-blue-600"
                        : "text-red-600"
                    }
                  >
                    {year.cf.operatingCF >= 0 ? "▲+" : "▼"}
                    {Math.abs(year.cf.operatingCF).toLocaleString()}
                  </span>
                </p>
                <p>
                  投資CF:{" "}
                  <span
                    className={
                      year.cf.investingCF >= 0
                        ? "text-blue-600"
                        : "text-orange-600"
                    }
                  >
                    {year.cf.investingCF >= 0 ? "▲+" : "▼"}
                    {Math.abs(year.cf.investingCF).toLocaleString()}
                  </span>
                </p>
                <p>
                  財務CF:{" "}
                  <span
                    className={
                      year.cf.financingCF > 200
                        ? "text-yellow-600"
                        : "text-gray-600"
                    }
                  >
                    {year.cf.financingCF >= 0 ? "▲+" : "▼"}
                    {Math.abs(year.cf.financingCF).toLocaleString()}
                  </span>
                </p>
              </div>
              <p className={`text-xs ${diag.text}`}>{diag.desc}</p>
            </div>
          );
        })}
      </div>

      {/* CF detail table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6 overflow-x-auto">
        <h2 className="text-base font-bold text-gray-800 mb-4">
          CF詳細比較（百万円）
        </h2>
        <table className="w-full text-sm min-w-[400px]">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-2 text-gray-600">項目</th>
              {years.map((y) => (
                <th key={y.fiscalYear} className="text-right py-2 text-gray-600">
                  {y.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { label: "営業活動によるCF", key: "operatingCF" as const, bold: true },
              { label: "投資活動によるCF", key: "investingCF" as const, bold: true },
              { label: "財務活動によるCF", key: "financingCF" as const, bold: true },
              { label: "現金増減額", key: "netCashChange" as const },
              { label: "期末現金残高", key: "endingCash" as const, topBorder: true },
            ].map((row) => (
              <tr
                key={row.label}
                className={`border-b border-gray-100 ${row.topBorder ? "border-t-2 border-gray-300" : ""}`}
              >
                <td
                  className={`py-2 text-gray-700 ${row.bold ? "font-medium" : ""}`}
                >
                  {row.label}
                </td>
                {years.map((y) => {
                  const val = y.cf[row.key];
                  return (
                    <td
                      key={y.fiscalYear}
                      className={`py-2 text-right ${
                        val < 0 ? "text-red-600" : val > 0 ? "text-blue-600" : "text-gray-500"
                      } ${row.bold ? "font-medium" : ""}`}
                    >
                      {val >= 0 ? "+" : ""}
                      {val.toLocaleString()}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Narrative callout */}
      <div className="bg-blue-50 rounded-2xl border border-blue-200 p-5 mb-6">
        <h3 className="font-bold text-blue-800 mb-3">
          なぜ「利益があるのにCFがマイナス」になるのか？
        </h3>
        <div className="text-sm text-blue-900 space-y-2">
          <p>
            間接法のCF計算では、当期純利益を出発点に<strong>非現金項目を調整</strong>して営業CFを算出します。
          </p>
          <p>
            サクラ商事の場合：<br />
            営業利益 +800（FY2022）→ 棚卸資産増加 -1,200（FY2023）→ 営業CF ≈ +100
          </p>
          <p>
            <strong>棚卸資産の増加は「現金が在庫に変換された」</strong>ことを意味し、CF計算上マイナス調整されます。
            売れない在庫が増えるほど、利益は出ているのに現金が出ていく状態になります。
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex flex-wrap gap-3 justify-between items-center">
        <Link
          href="/company/bs"
          className="text-sm text-orange-600 hover:underline"
        >
          ← BS分析に戻る
        </Link>
        <div className="flex gap-3">
          <Link
            href="/company/summary"
            className="bg-white border-2 border-orange-300 text-orange-600 font-bold px-4 py-2 rounded-xl text-sm hover:bg-orange-50 transition-colors"
          >
            3年総括 →
          </Link>
          <Link
            href="/quiz/case-study"
            className="bg-orange-500 text-white font-bold px-4 py-2 rounded-xl text-sm hover:bg-orange-600 transition-colors"
          >
            クイズを解く
          </Link>
        </div>
      </div>
    </div>
  );
}
