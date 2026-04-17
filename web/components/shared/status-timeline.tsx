import { Check, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimelineStep {
  label: string;
  date?: string;
  isCompleted: boolean;
  isCurrent: boolean;
}

interface StatusTimelineProps {
  steps: TimelineStep[];
  className?: string;
}

export function StatusTimeline({ steps, className }: StatusTimelineProps) {
  return (
    <div className={cn("flex items-center gap-0", className)}>
      {steps.map((step, i) => (
        <div key={step.label} className="flex items-center">
          <div className="flex flex-col items-center gap-1.5">
            <div
              className={cn(
                "flex size-8 items-center justify-center rounded-full border-2 transition-colors",
                step.isCompleted && "border-primary bg-primary text-primary-foreground",
                step.isCurrent && !step.isCompleted && "border-primary bg-primary/10 text-primary",
                !step.isCompleted && !step.isCurrent && "border-muted-foreground/30 text-muted-foreground/50"
              )}
            >
              {step.isCompleted ? (
                <Check className="size-4" />
              ) : (
                <Circle className="size-3" />
              )}
            </div>
            <div className="flex flex-col items-center">
              <span
                className={cn(
                  "text-xs font-medium",
                  step.isCompleted || step.isCurrent
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
              {step.date && (
                <span className="text-[10px] text-muted-foreground">
                  {step.date}
                </span>
              )}
            </div>
          </div>

          {i < steps.length - 1 && (
            <div
              className={cn(
                "mx-1 mt-[-1.5rem] h-0.5 w-8 sm:w-12",
                step.isCompleted ? "bg-primary" : "bg-muted-foreground/20"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}
