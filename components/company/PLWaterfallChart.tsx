"use client";

import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from "recharts";
import { PLStatement, WaterfallDataPoint } from "@/lib/types";

type Props = {
  pl: PLStatement;
  title?: string;
};

function buildWaterfallData(pl: PLStatement): WaterfallDataPoint[] {
  const adjustment = pl.operatingProfit - pl.netIncome; // combined nonOp + extraordinary + tax
  const isNetLoss = pl.netIncome < 0;

  return [
    {
      name: "売上高",
      base: 0,
      value: pl.revenue,
      type: "positive",
      displayValue: pl.revenue,
    },
    {
      name: "売上原価",
      base: pl.grossProfit,
      value: pl.costOfSales,
      type: "negative",
      displayValue: -pl.costOfSales,
    },
    {
      name: "売上総利益",
      base: 0,
      value: pl.grossProfit,
      type: "subtotal",
      displayValue: pl.grossProfit,
    },
    {
      name: "販管費",
      base: pl.operatingProfit,
      value: pl.sellingAdminExpenses,
      type: "negative",
      displayValue: -pl.sellingAdminExpenses,
    },
    {
      name: "営業利益",
      base: 0,
      value: pl.operatingProfit,
      type: "subtotal",
      displayValue: pl.operatingProfit,
    },
    {
      name: "営業外・税等",
      base: Math.min(pl.netIncome, 0),
      value: adjustment,
      type: "negative",
      displayValue: -adjustment,
    },
    {
      name: "純利益",
      base: isNetLoss ? pl.netIncome : 0,
      value: Math.abs(pl.netIncome),
      type: isNetLoss ? "loss" : "end",
      displayValue: pl.netIncome,
    },
  ];
}

const typeColor: Record<WaterfallDataPoint["type"], string> = {
  positive: "#2563eb",   // blue-600
  negative: "#ef4444",   // red-500
  subtotal: "#6b7280",   // gray-500
  end: "#16a34a",        // green-600
  loss: "#ef4444",       // red-500 (for loss bar)
};

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { payload: WaterfallDataPoint }[];
  label?: string;
}) {
  if (!active || !payload || !payload[0]) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 shadow text-xs">
      <p className="font-bold text-gray-700 mb-1">{d.name}</p>
      <p className="text-gray-700">
        {d.displayValue >= 0 ? "+" : ""}
        {d.displayValue.toLocaleString()} 百万円
      </p>
    </div>
  );
}

export default function PLWaterfallChart({ pl, title }: Props) {
  const data = buildWaterfallData(pl);

  // Determine y-axis domain to handle negative values
  const minVal = Math.min(0, pl.netIncome) * 1.2;
  const maxVal = pl.revenue * 1.05;

  return (
    <div>
      {title && (
        <p className="text-sm font-medium text-gray-600 mb-2">{title}</p>
      )}
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart
          data={data}
          margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11 }}
            interval={0}
            angle={-10}
            textAnchor="end"
            height={50}
          />
          <YAxis
            domain={[minVal, maxVal]}
            tickFormatter={(v) => v.toLocaleString()}
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
          <ReferenceLine y={0} stroke="#374151" strokeWidth={1.5} />

          {/* Transparent base bar (creates the waterfall offset) */}
          <Bar dataKey="base" stackId="wf" fill="transparent" />

          {/* Visible value bar — color determined by type */}
          <Bar dataKey="value" stackId="wf" radius={[3, 3, 0, 0]}>
            {data.map((entry) => (
              <Cell
                key={entry.name}
                fill={typeColor[entry.type]}
              />
            ))}
          </Bar>
        </ComposedChart>
      </ResponsiveContainer>

      {/* Color legend */}
      <div className="flex flex-wrap gap-4 mt-2 text-xs text-gray-600 justify-center">
        <span>
          <span className="inline-block w-3 h-3 bg-blue-600 rounded-sm mr-1" />
          収益（プラス）
        </span>
        <span>
          <span className="inline-block w-3 h-3 bg-red-500 rounded-sm mr-1" />
          費用（マイナス）
        </span>
        <span>
          <span className="inline-block w-3 h-3 bg-gray-500 rounded-sm mr-1" />
          小計
        </span>
        <span>
          <span className="inline-block w-3 h-3 bg-green-600 rounded-sm mr-1" />
          純利益
        </span>
      </div>
    </div>
  );
}
