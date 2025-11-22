import type { PerformanceMetric } from "@/types/workflow";

type MetricCardProps = {
  metric: PerformanceMetric;
};

export function MetricCard({ metric }: MetricCardProps) {
  const isPositive = metric.change >= 0;
  return (
    <div className="rounded-2xl border border-zinc-100 bg-white/70 p-5 shadow-sm backdrop-blur transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/70">
      <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
        {metric.label}
      </p>
      <p className="mt-3 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
        {metric.value}
      </p>
      <div className="mt-3 flex items-center gap-2 text-sm">
        <span
          className={`rounded-full px-2 py-1 text-xs font-semibold ${isPositive ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200" : "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-200"}`}
        >
          {isPositive ? "+" : ""}
          {metric.change}%
        </span>
        <span className="text-zinc-500 dark:text-zinc-400">
          {metric.helperText}
        </span>
      </div>
    </div>
  );
}
