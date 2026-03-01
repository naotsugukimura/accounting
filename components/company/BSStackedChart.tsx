"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { BSChartDataPoint } from "@/lib/types";

type Props = {
  data: BSChartDataPoint[];
};

const formatBillion = (v: number) =>
  v > 0 ? `${v.toLocaleString()}百万円` : "";

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { name: string; value: number; fill: string }[];
  label?: string;
}) {
  if (!active || !payload) return null;
  const filtered = payload.filter((p) => p.value > 0);
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 shadow text-xs">
      <p className="font-bold mb-1 text-gray-700">{label}</p>
      {filtered.map((p) => (
        <p key={p.name} style={{ color: p.fill }}>
          {p.name}: {p.value.toLocaleString()}百万円
        </p>
      ))}
    </div>
  );
}

export default function BSStackedChart({ data }: Props) {
  return (
    <div>
      <ResponsiveContainer width="100%" height={340}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
          barCategoryGap="20%"
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="period"
            tick={{ fontSize: 10 }}
            interval={0}
            angle={-10}
          />
          <YAxis
            tickFormatter={(v) => `${v.toLocaleString()}`}
            tick={{ fontSize: 11 }}
            label={{
              value: "百万円",
              angle: -90,
              position: "insideLeft",
              offset: 10,
              style: { fontSize: 11, fill: "#6b7280" },
            }}
          />
          <Tooltip content={<CustomTooltip />} />

          {/* Asset side — stackId="a" */}
          <Bar dataKey="cash" stackId="a" fill="#93c5fd" name="現金・預金" />
          <Bar dataKey="receivables" stackId="a" fill="#60a5fa" name="売掛金" />
          <Bar
            dataKey="inventory"
            stackId="a"
            fill="#f59e0b"
            name="棚卸資産"
          />
          <Bar
            dataKey="otherCurrent"
            stackId="a"
            fill="#bfdbfe"
            name="その他流動資産"
          />
          <Bar
            dataKey="nonCurrentAssets"
            stackId="a"
            fill="#1d4ed8"
            name="固定資産"
          />

          {/* Liabilities + Equity side — stackId="l" */}
          <Bar
            dataKey="currentLiabilities"
            stackId="l"
            fill="#fca5a5"
            name="流動負債"
          />
          <Bar
            dataKey="nonCurrentLiabilities"
            stackId="l"
            fill="#f87171"
            name="固定負債"
          />
          <Bar dataKey="equity" stackId="l" fill="#86efac" name="純資産" />
        </BarChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-1 text-xs text-gray-600">
        <div className="col-span-2 font-bold text-gray-700 mb-1">
          【資産側】
        </div>
        <div className="col-span-2 font-bold text-gray-700 mb-1">
          【負債・純資産側】
        </div>
        <span>
          <span className="inline-block w-3 h-3 bg-[#93c5fd] rounded-sm mr-1" />
          現金・預金
        </span>
        <span>
          <span className="inline-block w-3 h-3 bg-[#fca5a5] rounded-sm mr-1" />
          流動負債
        </span>
        <span>
          <span className="inline-block w-3 h-3 bg-amber-400 rounded-sm mr-1" />
          棚卸資産 ★
        </span>
        <span>
          <span className="inline-block w-3 h-3 bg-[#86efac] rounded-sm mr-1" />
          純資産
        </span>
        <span>
          <span className="inline-block w-3 h-3 bg-blue-700 rounded-sm mr-1" />
          固定資産
        </span>
        <span className="text-amber-600 text-xs">★ 棚卸資産に注目</span>
      </div>
    </div>
  );
}
