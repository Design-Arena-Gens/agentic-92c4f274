import type { AutomationPlay } from "@/types/workflow";

type AutomationCardProps = {
  automation: AutomationPlay;
  onRun?: (id: string) => void;
};

const statusStyles: Record<
  AutomationPlay["status"],
  { badge: string; dot: string }
> = {
  scheduled: {
    badge:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-200",
    dot: "bg-amber-400",
  },
  running: {
    badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200",
    dot: "bg-emerald-400",
  },
  idle: {
    badge: "bg-zinc-100 text-zinc-700 dark:bg-zinc-900/40 dark:text-zinc-200",
    dot: "bg-zinc-400",
  },
};

export function AutomationCard({ automation, onRun }: AutomationCardProps) {
  const { badge, dot } = statusStyles[automation.status];

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-zinc-100 bg-white/70 p-5 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/70">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            {automation.name}
          </h3>
          <p className="mt-1 text-xs uppercase tracking-wide text-zinc-400">
            {automation.channel}
          </p>
        </div>
        <span
          className={`flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${badge}`}
        >
          <span className={`h-2 w-2 rounded-full ${dot}`} />
          {automation.status}
        </span>
      </div>

      <div className="grid gap-3 text-sm text-zinc-600 dark:text-zinc-300 md:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
            Trigger
          </p>
          <p className="mt-1 leading-relaxed">{automation.trigger}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
            Action
          </p>
          <p className="mt-1 leading-relaxed">{automation.action}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
            Cadence
          </p>
          <p className="mt-1 leading-relaxed">{automation.cadence}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
            Tools
          </p>
          <p className="mt-1 leading-relaxed">{automation.tools.join(", ")}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-500">
        <div>
          <p>Last run: {automation.lastRun ?? "Not yet run"}</p>
          <p>Next run: {automation.nextRun ?? "Unscheduled"}</p>
        </div>
        {onRun && (
          <button
            onClick={() => onRun(automation.id)}
            className="rounded-full bg-zinc-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Run Play
          </button>
        )}
      </div>
    </div>
  );
}
