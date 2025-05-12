
import * as React from "react";
import { RadioButton } from "primereact/radiobutton";
import { cn } from "@/lib/utils";

interface RadioGroupProps {
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  children?: React.ReactNode;
}

const RadioGroup = React.forwardRef<
  HTMLDivElement,
  RadioGroupProps
>(({ className, children, value, onChange, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("grid gap-2", className)}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        
        return React.cloneElement(child as React.ReactElement<any>, {
          name: props.name,
          checked: value === child.props.value,
          onChange: onChange ? (e: any) => onChange(e.value) : undefined
        });
      })}
    </div>
  );
});

RadioGroup.displayName = "RadioGroup";

interface RadioGroupItemProps {
  value: string;
  checked?: boolean;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
  onChange?: (e: any) => void;
}

const RadioGroupItem = React.forwardRef<
  HTMLInputElement,
  RadioGroupItemProps
>(({ className, children, ...props }, ref) => {
  return (
    <div className="flex items-center space-x-2">
      <RadioButton 
        inputRef={ref}
        {...props} 
      />
      {children && <label>{children}</label>}
    </div>
  );
});

RadioGroupItem.displayName = "RadioGroupItem";

export { RadioGroup, RadioGroupItem };
