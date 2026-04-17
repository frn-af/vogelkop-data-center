"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface MultiStepWrapperProps {
  steps: string[];
  currentStep: number;
  children: React.ReactNode;
  className?: string;
}

export function MultiStepWrapper({
  steps,
  currentStep,
  children,
  className,
}: MultiStepWrapperProps) {
  return (
    <div className={cn("space-y-8", className)}>
      <nav aria-label="Progress">
        <ol className="flex items-center justify-center gap-2">
          {steps.map((step, i) => {
            const stepNum = i + 1;
            const isCompleted = stepNum < currentStep;
            const isCurrent = stepNum === currentStep;

            return (
              <li key={step} className="flex items-center">
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "flex size-8 items-center justify-center rounded-full border-2 text-xs font-semibold transition-colors",
                      isCompleted && "border-primary bg-primary text-primary-foreground",
                      isCurrent && "border-primary text-primary",
                      !isCompleted && !isCurrent && "border-muted-foreground/30 text-muted-foreground/50"
                    )}
                  >
                    {isCompleted ? <Check className="size-4" /> : stepNum}
                  </div>
                  <span
                    className={cn(
                      "hidden text-sm font-medium sm:inline",
                      isCurrent && "text-foreground",
                      isCompleted && "text-primary",
                      !isCompleted && !isCurrent && "text-muted-foreground"
                    )}
                  >
                    {step}
                  </span>
                </div>

                {i < steps.length - 1 && (
                  <div
                    className={cn(
                      "ml-2 h-0.5 w-6 sm:w-10",
                      isCompleted ? "bg-primary" : "bg-muted-foreground/20"
                    )}
                  />
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      <div>{children}</div>
    </div>
  );
}
