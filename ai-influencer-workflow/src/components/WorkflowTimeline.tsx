import type { WorkflowStage } from "@/types/workflow";
import { WorkflowStageCard } from "./WorkflowStageCard";

type WorkflowTimelineProps = {
  stages: WorkflowStage[];
};

export function WorkflowTimeline({ stages }: WorkflowTimelineProps) {
  return (
    <div className="relative space-y-6">
      <div className="absolute left-6 top-8 bottom-12 hidden w-px bg-gradient-to-b from-sky-200 via-sky-300 to-transparent dark:from-sky-900 dark:via-sky-800 md:block" />
      {stages.map((stage, index) => (
        <WorkflowStageCard key={stage.id} stage={stage} index={index} />
      ))}
    </div>
  );
}
