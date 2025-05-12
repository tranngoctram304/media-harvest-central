
import * as React from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.ComponentPropsWithoutRef<typeof InputTextarea> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <InputTextarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={(el) => {
          if (ref && el && el.getInput) {
            const inputElement = el.getInput();
            if (inputElement) {
              if (typeof ref === 'function') {
                ref(inputElement as HTMLTextAreaElement);
              } else {
                ref.current = inputElement as HTMLTextAreaElement;
              }
            }
          }
        }}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
