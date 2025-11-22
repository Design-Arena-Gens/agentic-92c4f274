import { useState } from "react";
import type { WorkflowStage } from "@/types/workflow";

type WorkflowStageFormProps = {
  onCreate: (stage: WorkflowStage) => void;
};

const baseStage: Omit<WorkflowStage, "id" | "confidence"> = {
  title: "",
  persona: "",
  objective: "",
  contentFocus: "",
  aiPrompt: "",
  deliverables: [],
  durationMinutes: 30,
};

export function WorkflowStageForm({ onCreate }: WorkflowStageFormProps) {
  const [payload, setPayload] = useState(() => ({ ...baseStage }));
  const [confidence, setConfidence] = useState(80);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!payload.title.trim()) return;
    const id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `stage-${Math.random().toString(36).slice(2, 10)}`;

    onCreate({
      id,
      ...payload,
      deliverables: payload.deliverables.filter(Boolean),
      confidence,
    });

    setPayload({ ...baseStage });
    setConfidence(80);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white/80 p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/80"
    >
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Craft a workflow stage
          </h3>
          <p className="text-sm text-zinc-500">
            Define the voice, prompts, and output bundle for the AI talent.
          </p>
        </div>
        <button
          type="submit"
          className="rounded-full bg-zinc-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          Add Stage
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-1 text-xs font-semibold uppercase tracking-wide text-zinc-500">
          Stage title
          <input
            required
            value={payload.title}
            onChange={(event) =>
              setPayload((prev) => ({ ...prev, title: event.target.value }))
            }
            placeholder="Hook sculpting"
            className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-200 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-sky-500 dark:focus:ring-sky-900/60"
          />
        </label>
        <label className="flex flex-col gap-1 text-xs font-semibold uppercase tracking-wide text-zinc-500">
          Persona
          <input
            required
            value={payload.persona}
            onChange={(event) =>
              setPayload((prev) => ({ ...prev, persona: event.target.value }))
            }
            placeholder="High-energy futurist storyteller"
            className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-200 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-sky-500 dark:focus:ring-sky-900/60"
          />
        </label>
      </div>

      <label className="flex flex-col gap-1 text-xs font-semibold uppercase tracking-wide text-zinc-500">
        Objective
        <textarea
          required
          value={payload.objective}
          onChange={(event) =>
            setPayload((prev) => ({ ...prev, objective: event.target.value }))
          }
          rows={2}
          className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-200 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-sky-500 dark:focus:ring-sky-900/60"
        />
      </label>

      <label className="flex flex-col gap-1 text-xs font-semibold uppercase tracking-wide text-zinc-500">
        Content Focus
        <textarea
          required
          value={payload.contentFocus}
          onChange={(event) =>
            setPayload((prev) => ({
              ...prev,
              contentFocus: event.target.value,
            }))
          }
          rows={2}
          className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-200 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-sky-500 dark:focus:ring-sky-900/60"
        />
      </label>

      <label className="flex flex-col gap-1 text-xs font-semibold uppercase tracking-wide text-zinc-500">
        AI Prompt
        <textarea
          required
          value={payload.aiPrompt}
          onChange={(event) =>
            setPayload((prev) => ({ ...prev, aiPrompt: event.target.value }))
          }
          rows={3}
          className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-200 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-sky-500 dark:focus:ring-sky-900/60"
        />
      </label>

      <label className="flex flex-col gap-1 text-xs font-semibold uppercase tracking-wide text-zinc-500">
        Deliverables (comma separated)
        <input
          value={payload.deliverables.join(", ")}
          onChange={(event) =>
            setPayload((prev) => ({
              ...prev,
              deliverables: event.target.value
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean),
            }))
          }
          placeholder="5 high-impact hooks, 2 title variants"
          className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-200 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-sky-500 dark:focus:ring-sky-900/60"
        />
      </label>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-1 text-xs font-semibold uppercase tracking-wide text-zinc-500">
          Duration (minutes)
          <input
            type="number"
            min={5}
            max={240}
            value={payload.durationMinutes}
            onChange={(event) =>
              setPayload((prev) => ({
                ...prev,
                durationMinutes: Number(event.target.value),
              }))
            }
            className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-200 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-sky-500 dark:focus:ring-sky-900/60"
          />
        </label>

        <label className="flex flex-col gap-1 text-xs font-semibold uppercase tracking-wide text-zinc-500">
          AI Confidence (%)
          <input
            type="range"
            min={20}
            max={100}
            step={5}
            value={confidence}
            onChange={(event) => setConfidence(Number(event.target.value))}
            className="accent-sky-500"
          />
          <span className="text-sm text-zinc-600 dark:text-zinc-300">
            {confidence}%
          </span>
        </label>
      </div>
    </form>
  );
}
