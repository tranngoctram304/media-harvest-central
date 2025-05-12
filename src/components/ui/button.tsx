
import * as React from "react";
import { Button as PrimeButton } from "primereact/button";
import { classNames } from "primereact/utils";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ComponentPropsWithoutRef<typeof PrimeButton> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
}

const variantStyles = {
  default: { severity: undefined },
  destructive: { severity: 'danger' },
  outline: { outlined: true },
  secondary: { severity: 'secondary' },
  ghost: { text: true },
  link: { link: true },
};

const sizeStyles = {
  default: "p-button-md",
  sm: "p-button-sm",
  lg: "p-button-lg",
  icon: "p-button-icon-only",
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', asChild = false, ...props }, ref) => {
    const variantProps = variantStyles[variant] || {};
    const sizeClass = sizeStyles[size] || '';
    
    return (
      <PrimeButton
        ref={ref}
        className={cn(sizeClass, className)}
        {...variantProps}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
