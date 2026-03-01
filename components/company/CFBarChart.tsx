"use client";

import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  Line,
  ResponsiveContainer,
} from "recharts";
import { CFChartDataPoint } from "@/lib/types";

type Props = {
  data: CFChartDataPoint[];
};

const formatValue = (v: number) =>
  `${v >= 0 ? "+" : ""}${v.toLocaleString()}百万円`;

export default function CFBarChart({ data }: Props) {
  return (
    <div>
      <ResponsiveContainer width="100%" height={320}>
        <ComposedChart
          data={data}
          margin={{ top: 10, right: 20, left: 10, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="year" tick={{ fontSize: 12 }} />
          <YAxis
            tickFormatter={(v) => `${v}`}
            tick={{ fontSize: 11 }}
            label={{
              value: "百万円",
              angle: -90,
              position: "insideLeft",
              offset: 10,
              style: { fontSize: 11, fill: "#6b7280" },
            }}
          />
          <Tooltip
            formatter={(value: number | string | undefined, name: string | undefined) => {
              const labels: Record<string, string> = {
                operating: "営業CF",
                investing: "投資CF",
                financing: "財務CF",
                netChange: "現金増減",
              };
              const v = typeof value === "number" ? value : 0;
              const n = name ?? "";
              return [formatValue(v), labels[n] ?? n];
            }}
          />
          <Legend
            formatter={(value) => {
              const labels: Record<string, string> = {
                operating: "営業CF",
                investing: "投資CF",
                financing: "財務CF",
                netChange: "現金増減",
              };
              return labels[value] ?? value;
            }}
          />
          <ReferenceLine y={0} stroke="#374151" strokeWidth={1.5} />
          <Bar dataKey="operating" fill="#2563eb" name="operating" barSize={20} />
          <Bar dataKey="investing" fill="#f97316" name="investing" barSize={20} />
          <Bar dataKey="financing" fill="#8b5cf6" name="financing" barSize={20} />
          <Line
            type="monotone"
            dataKey="netChange"
            stroke="#059669"
            strokeWidth={2}
            dot={{ r: 4, fill: "#059669" }}
            name="netChange"
          />
        </ComposedChart>
      </ResponsiveContainer>
      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-gray-500 justify-center">
        <span>
          <span className="inline-block w-3 h-3 bg-blue-600 rounded-sm mr-1" />
          営業CF: 本業のキャッシュ創出力
        </span>
        <span>
          <span className="inline-block w-3 h-3 bg-orange-500 rounded-sm mr-1" />
          投資CF: 設備投資・売却
        </span>
        <span>
          <span className="inline-block w-3 h-3 bg-violet-600 rounded-sm mr-1" />
          財務CF: 借入・返済
        </span>
      </div>
    </div>
  );
}
