"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ReferenceArea,
  ResponsiveContainer,
} from "recharts";

export type MetricConfig = {
  key: string;
  label: string;
  color: string;
  unit?: string;
};

type DataPoint = {
  year: number;
  [key: string]: number;
};

type PhaseArea = {
  x1: number;
  x2: number;
  phase: "good" | "warning" | "crisis";
};

type Props = {
  data: DataPoint[];
  metrics: MetricConfig[];
  phaseAreas?: PhaseArea[];
  unit?: string;
  title?: string;
};

const phaseColors: Record<string, string> = {
  good: "#bbf7d0",
  warning: "#fef08a",
  crisis: "#fecaca",
};

export default function YearComparisonChart({
  data,
  metrics,
  phaseAreas,
  unit = "百万円",
  title,
}: Props) {
  return (
    <div>
      {title && (
        <p className="text-sm font-medium text-gray-600 mb-2">{title}</p>
      )}
      <ResponsiveContainer width="100%" height={260}>
        <LineChart
          data={data}
          margin={{ top: 10, right: 20, left: 10, bottom: 0 }}
        >
          {phaseAreas &&
            phaseAreas.map((area) => (
              <ReferenceArea
                key={`${area.x1}-${area.x2}`}
                x1={area.x1}
                x2={area.x2}
                fill={phaseColors[area.phase]}
                fillOpacity={0.4}
                stroke="none"
              />
            ))}
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="year"
            tickFormatter={(v) => `FY${v}`}
            tick={{ fontSize: 12 }}
            type="number"
            domain={["dataMin - 0.5", "dataMax + 0.5"]}
          />
          <YAxis
            tick={{ fontSize: 11 }}
            tickFormatter={(v) => v.toLocaleString()}
            label={{
              value: unit,
              angle: -90,
              position: "insideLeft",
              offset: 10,
              style: { fontSize: 11, fill: "#6b7280" },
            }}
          />
          <Tooltip
            labelFormatter={(v) => `FY${v}`}
            formatter={(value: number | string | undefined, name: string | undefined) => {
              const metric = metrics.find((m) => m.key === (name ?? ""));
              const u = metric?.unit ?? unit;
              const v = typeof value === "number" ? value : 0;
              return [`${v.toLocaleString()}${u}`, metric?.label ?? (name ?? "")];
            }}
          />
          <Legend
            formatter={(value) =>
              metrics.find((m) => m.key === value)?.label ?? value
            }
          />
          <ReferenceLine y={0} stroke="#9ca3af" strokeDasharray="4 2" />
          {metrics.map((m) => (
            <Line
              key={m.key}
              type="monotone"
              dataKey={m.key}
              stroke={m.color}
              strokeWidth={2}
              dot={{ r: 5, fill: m.color }}
              activeDot={{ r: 7 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
