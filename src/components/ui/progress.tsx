
import * as React from "react";
import { ProgressBar } from "primereact/progressbar";
import { cn } from "@/lib/utils";

interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressBar> {
  value?: number;
}

const Progress = React.forwardRef<
  HTMLDivElement,
  ProgressProps
>(({ className, value = 0, ...props }, ref) => {
  return (
    <ProgressBar
      value={value}
      className={cn(
        "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
        className
      )}
      {...props}
    />
  );
});
Progress.displayName = "Progress";

export { Progress };
