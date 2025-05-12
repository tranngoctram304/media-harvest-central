
import * as React from "react";
import { Badge as PrimeBadge } from "primereact/badge";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const severity = variant === "destructive" ? "danger" : 
                   variant === "secondary" ? "secondary" : 
                   variant === "outline" ? "info" : "info";
                   
  return (
    <div className={cn("inline-flex items-center", className)}>
      <PrimeBadge
        severity={severity}
        {...props}
      />
    </div>
  );
}

export { Badge };
