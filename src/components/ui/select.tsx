
import * as React from "react";
import { Dropdown, DropdownProps } from "primereact/dropdown";
import { cn } from "@/lib/utils";

const Select = Dropdown;
const SelectValue = ({ placeholder }: { placeholder: string }) => <>{placeholder}</>;
const SelectTrigger = React.forwardRef<HTMLButtonElement, React.HTMLAttributes<HTMLButtonElement>>(
  ({ className, children, ...props }, ref) => {
    return <>{children}</>; // This is handled by Dropdown directly
  }
);
SelectTrigger.displayName = "SelectTrigger";

const SelectContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return <>{children}</>; // This is handled by Dropdown directly
  }
);
SelectContent.displayName = "SelectContent";

const SelectItem = ({ value, children }: { value: string, children: React.ReactNode }) => {
  return { label: children, value }; // PrimeReact expects options in this format
};

export { Select, SelectValue, SelectTrigger, SelectContent, SelectItem };
