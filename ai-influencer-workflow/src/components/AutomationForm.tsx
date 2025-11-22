import { useState } from "react";
import type { AutomationPlay } from "@/types/workflow";

type AutomationFormProps = {
  onCreate: (automation: AutomationPlay) => void;
};

const buildPreset = (): Omit<AutomationPlay, "id"> => ({
  name: "Pulse Post",
  trigger: "New long-form script approved",
  action:
    "Synthesize 3 micro-clips with dynamic captions and queue to TikTok",
  channel: "TikTok",
  cadence: "48h after script approval",
  tools: ["Runway", "CapCut API", "TikTok Scheduler"],
  status: "scheduled",
  nextRun: new Date(Date.now() + 1000 * 60 * 60 * 12).toLocaleString(),
  lastRun: undefined,
});

export function AutomationForm({ onCreate }: AutomationFormProps) {
  const [form, setForm] = useState(buildPreset);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `automation-${Math.random().toString(36).slice(2, 10)}`;
    onCreate({
      id,
      ...form,
    });
    setForm(buildPreset());
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-2xl border border-dashed border-sky-200 bg-sky-50/60 p-5 dark:border-sky-900 dark:bg-sky-950/30"
    >
      <div>
        <h3 className="text-lg font-semibold text-sky-900 dark:text-sky-100">
          Launch a new automation play
        </h3>
        <p className="mt-1 text-sm text-sky-700/80 dark:text-sky-200/80">
          Wire a trigger to an AI action. Plays ship to production immediately.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-1 text-xs font-semibold uppercase tracking-wide text-sky-900/80 dark:text-sky-200/70">
          Name
          <input
            required
            value={form.name}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, name: event.target.value }))
            }
            placeholder="Sunrise Drop"
            className="rounded-xl border border-transparent bg-white/90 px-3 py-2 text-sm font-normal text-sky-900 shadow-sm outline-none transition focus:border-sky-300 focus:ring-2 focus:ring-sky-200 dark:bg-sky-950/50 dark:text-sky-100 dark:focus:border-sky-700 dark:focus:ring-sky-900/60"
          />
        </label>
        <label className="flex flex-col gap-1 text-xs font-semibold uppercase tracking-wide text-sky-900/80 dark:text-sky-200/70">
          Channel
          <input
            required
            value={form.channel}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, channel: event.target.value }))
            }
            placeholder="Instagram Reels"
            className="rounded-xl border border-transparent bg-white/90 px-3 py-2 text-sm font-normal text-sky-900 shadow-sm outline-none transition focus:border-sky-300 focus:ring-2 focus:ring-sky-200 dark:bg-sky-950/50 dark:text-sky-100 dark:focus:border-sky-700 dark:focus:ring-sky-900/60"
          />
        </label>
      </div>

      <label className="flex flex-col gap-1 text-xs font-semibold uppercase tracking-wide text-sky-900/80 dark:text-sky-200/70">
        Trigger
        <textarea
          required
          value={form.trigger}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, trigger: event.target.value }))
          }
          rows={2}
          className="rounded-xl border border-transparent bg-white/90 px-3 py-2 text-sm font-normal text-sky-900 shadow-sm outline-none transition focus:border-sky-300 focus:ring-2 focus:ring-sky-200 dark:bg-sky-950/50 dark:text-sky-100 dark:focus:border-sky-700 dark:focus:ring-sky-900/60"
        />
      </label>

      <label className="flex flex-col gap-1 text-xs font-semibold uppercase tracking-wide text-sky-900/80 dark:text-sky-200/70">
        Action
        <textarea
          required
          value={form.action}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, action: event.target.value }))
          }
          rows={2}
          className="rounded-xl border border-transparent bg-white/90 px-3 py-2 text-sm font-normal text-sky-900 shadow-sm outline-none transition focus:border-sky-300 focus:ring-2 focus:ring-sky-200 dark:bg-sky-950/50 dark:text-sky-100 dark:focus:border-sky-700 dark:focus:ring-sky-900/60"
        />
      </label>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-1 text-xs font-semibold uppercase tracking-wide text-sky-900/80 dark:text-sky-200/70">
          Cadence
          <input
            required
            value={form.cadence}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, cadence: event.target.value }))
            }
            placeholder="Daily 9:00 AM PST"
            className="rounded-xl border border-transparent bg-white/90 px-3 py-2 text-sm font-normal text-sky-900 shadow-sm outline-none transition focus:border-sky-300 focus:ring-2 focus:ring-sky-200 dark:bg-sky-950/50 dark:text-sky-100 dark:focus:border-sky-700 dark:focus:ring-sky-900/60"
          />
        </label>
        <label className="flex flex-col gap-1 text-xs font-semibold uppercase tracking-wide text-sky-900/80 dark:text-sky-200/70">
          Tools
          <input
            required
            value={form.tools.join(", ")}
            onChange={(event) =>
              setForm((prev) => ({
                ...prev,
                tools: event.target.value
                  .split(",")
                  .map((item) => item.trim())
                  .filter(Boolean),
              }))
            }
            placeholder="Zapier, ElevenLabs, Canva API"
            className="rounded-xl border border-transparent bg-white/90 px-3 py-2 text-sm font-normal text-sky-900 shadow-sm outline-none transition focus:border-sky-300 focus:ring-2 focus:ring-sky-200 dark:bg-sky-950/50 dark:text-sky-100 dark:focus:border-sky-700 dark:focus:ring-sky-900/60"
          />
        </label>
      </div>

      <button
        type="submit"
        className="mt-2 inline-flex items-center justify-center rounded-full bg-sky-600 px-6 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 dark:bg-sky-500 dark:hover:bg-sky-400 dark:focus:ring-sky-700 dark:focus:ring-offset-zinc-950"
      >
        Deploy automation play
      </button>
    </form>
  );
}
