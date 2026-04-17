import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";

interface SLAIndicatorProps {
  targetHours: number;
  elapsedHours: number;
  label?: string;
  className?: string;
}

export function SLAIndicator({
  targetHours,
  elapsedHours,
  label,
  className,
}: SLAIndicatorProps) {
  const remainingHours = Math.max(0, targetHours - elapsedHours);
  const progress = Math.min(100, (elapsedHours / targetHours) * 100);
  const isOverdue = elapsedHours > targetHours;
  const isWarning = progress >= 75 && !isOverdue;

  const formatRemaining = (hours: number): string => {
    if (hours >= 24) {
      const days = Math.floor(hours / 24);
      const h = Math.round(hours % 24);
      return h > 0 ? `${days} hari ${h} jam` : `${days} hari`;
    }
    return `${Math.round(hours)} jam`;
  };

  return (
    <div className={cn("space-y-1.5", className)}>
      {label && (
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">{label}</span>
          <span
            className={cn(
              "flex items-center gap-1 font-medium",
              isOverdue && "text-destructive",
              isWarning && "text-warning",
              !isOverdue && !isWarning && "text-primary"
            )}
          >
            <Clock className="size-3" />
            {isOverdue
              ? "Melewati SLA"
              : `${formatRemaining(remainingHours)} tersisa`}
          </span>
        </div>
      )}
      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500",
            isOverdue && "bg-destructive",
            isWarning && "bg-warning",
            !isOverdue && !isWarning && "bg-primary"
          )}
          style={{ width: `${Math.min(100, progress)}%` }}
        />
      </div>
    </div>
  );
}
