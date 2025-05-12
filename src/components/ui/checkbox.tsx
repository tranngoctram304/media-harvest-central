
import * as React from "react";
import { Checkbox as PrimeCheckbox } from "primereact/checkbox";

export interface CheckboxProps extends Omit<React.ComponentPropsWithoutRef<typeof PrimeCheckbox>, "onChange"> {
  onCheckedChange?: (checked: boolean) => void;
  onChange?: (checked: boolean) => void;
}

const Checkbox = React.forwardRef<HTMLDivElement, CheckboxProps>(
  ({ className, onCheckedChange, onChange, ...props }, ref) => {
    const handleChange = (e: any) => {
      if (onCheckedChange) onCheckedChange(e.checked);
      if (onChange) onChange(e.checked);
    };

    return (
      <PrimeCheckbox
        {...props}
        onChange={handleChange}
      />
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
