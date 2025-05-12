
import * as React from 'react';
import { cn } from "@/lib/utils";

const AspectRatio = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { ratio?: number }
>(({ ratio = 1, className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("relative w-full", className)}
      style={{ paddingBottom: `${100 / ratio}%` }}
      {...props}
    >
      <div className="absolute inset-0">{children}</div>
    </div>
  );
});

AspectRatio.displayName = "AspectRatio";

export { AspectRatio };
