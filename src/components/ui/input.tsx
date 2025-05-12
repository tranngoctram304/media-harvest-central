
import * as React from "react";
import { InputText } from "primereact/inputtext";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentPropsWithoutRef<typeof InputText>>(
  ({ className, ...props }, ref) => {
    return (
      <InputText
        ref={ref}
        className={cn("p-inputtext", className)}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
