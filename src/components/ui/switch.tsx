
import * as React from "react";
import { InputSwitch } from "primereact/inputswitch";
import { cn } from "@/lib/utils";

const Switch = React.forwardRef<
  HTMLInputElement, 
  Omit<React.ComponentPropsWithoutRef<typeof InputSwitch>, "onChange"> & { 
    onChange?: (checked: boolean) => void;
  }
>(({ className, onChange, ...props }, ref) => {
  const handleChange = (e: any) => {
    if (onChange) {
      onChange(e.value);
    }
  };

  return (
    <InputSwitch
      className={cn(className)}
      onChange={handleChange}
      {...props}
    />
  );
});

Switch.displayName = "Switch";

export { Switch };
