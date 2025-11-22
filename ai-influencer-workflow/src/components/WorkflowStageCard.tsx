import type { WorkflowStage } from "@/types/workflow";

type WorkflowStageCardProps = {
  stage: WorkflowStage;
  index: number;
};

export function WorkflowStageCard({ stage, index }: WorkflowStageCardProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-zinc-100 bg-white/75 p-6 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/75">
      <span className="absolute -left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-sky-100 text-sm font-semibold text-sky-700 dark:bg-sky-900/60 dark:text-sky-200">
        {index + 1}
      </span>
      <div className="pl-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            {stage.title}
          </h3>
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium uppercase tracking-wide text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-100">
            {stage.durationMinutes} min sprint
          </span>
        </div>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          {stage.persona}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          {stage.objective}
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
              Content Focus
            </p>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
              {stage.contentFocus}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
              AI Prompt
            </p>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
              {stage.aiPrompt}
            </p>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
            Deliverables
          </p>
          <ul className="mt-2 space-y-1">
            {stage.deliverables.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-300"
              >
                <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-sky-400" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4 flex items-center justify-between rounded-xl bg-zinc-50 p-3 text-xs text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
          <span>AI confidence</span>
          <div className="flex items-center gap-2 font-semibold text-zinc-700 dark:text-zinc-200">
            <div className="h-2 w-24 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
              <div
                className="h-full rounded-full bg-sky-400 transition-all"
                style={{ width: `${stage.confidence}%` }}
              />
            </div>
            {stage.confidence}%
          </div>
        </div>
      </div>
    </div>
  );
}
