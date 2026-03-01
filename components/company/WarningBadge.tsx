"use client";

import { HealthLevel } from "@/lib/types";

const levelConfig: Record<
  HealthLevel,
  {
    icon: string;
    bg: string;
    border: string;
    text: string;
    label: string;
  }
> = {
  good: {
    icon: "✓",
    bg: "bg-green-50",
    border: "border-green-300",
    text: "text-green-700",
    label: "良好",
  },
  caution: {
    icon: "△",
    bg: "bg-yellow-50",
    border: "border-yellow-300",
    text: "text-yellow-700",
    label: "注意",
  },
  warning: {
    icon: "!",
    bg: "bg-orange-50",
    border: "border-orange-300",
    text: "text-orange-700",
    label: "警戒",
  },
  danger: {
    icon: "✕",
    bg: "bg-red-50",
    border: "border-red-300",
    text: "text-red-700",
    label: "危険",
  },
};

type Props = {
  level: HealthLevel;
  metricName: string;
  value: string;
  benchmark?: string;
  showTrend?: boolean;
  trend?: "up" | "down" | "flat";
  trendLabel?: string;
};

export default function WarningBadge({
  level,
  metricName,
  value,
  benchmark,
  showTrend = false,
  trend,
  trendLabel,
}: Props) {
  const config = levelConfig[level];

  const trendIcon =
    trend === "up" ? "↑" : trend === "down" ? "↓" : "→";
  const trendColor =
    trend === "up"
      ? "text-green-600"
      : trend === "down"
      ? "text-red-600"
      : "text-gray-500";

  return (
    <div
      className={`rounded-xl border-2 p-3 ${config.bg} ${config.border}`}
      role="status"
      aria-label={`${metricName}: ${value} — ${config.label}`}
    >
      <div className="flex items-start gap-2">
        <span
          className={`text-lg font-bold leading-none mt-0.5 ${config.text}`}
          aria-hidden="true"
        >
          {config.icon}
        </span>
        <div className="flex-1 min-w-0">
          <p className={`text-xs font-medium ${config.text}`}>
            {config.label}
          </p>
          <p className="text-xs text-gray-600 truncate">{metricName}</p>
          <p className={`text-base font-bold ${config.text}`}>{value}</p>
          {benchmark && (
            <p className="text-xs text-gray-500 mt-0.5">
              目安: {benchmark}
            </p>
          )}
          {showTrend && trend && trendLabel && (
            <p className={`text-xs font-medium mt-1 ${trendColor}`}>
              <span aria-hidden="true">{trendIcon}</span> {trendLabel}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
