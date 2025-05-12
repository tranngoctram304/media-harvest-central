
import * as React from "react";
import { Calendar as PrimeCalendar } from "primereact/calendar";
import { cn } from "@/lib/utils";

export type CalendarProps = React.ComponentProps<typeof PrimeCalendar>;

function Calendar({
  className,
  ...props
}: CalendarProps) {
  return (
    <PrimeCalendar
      className={cn("p-3", className)}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
