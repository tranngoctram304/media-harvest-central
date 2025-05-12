
import * as React from "react";
import { Button as PrimeButton } from "primereact/button";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ComponentPropsWithoutRef<typeof PrimeButton> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', asChild = false, ...props }, ref) => {
    
    // Map variants to PrimeReact properties
    const getVariantProps = () => {
      switch (variant) {
        case 'destructive':
          return { severity: 'danger' };
        case 'outline':
          return { outlined: true };
        case 'secondary':
          return { severity: 'secondary' };
        case 'ghost':
          return { text: true };
        case 'link':
          return { link: true };
        default:
          return {};
      }
    };

    // Map sizes to className
    const getSizeClass = () => {
      switch (size) {
        case 'sm':
          return 'p-button-sm';
        case 'lg':
          return 'p-button-lg';
        case 'icon':
          return 'p-button-icon-only';
        default:
          return '';
      }
    };
    
    const variantProps = getVariantProps();
    const sizeClass = getSizeClass();
    
    return (
      <PrimeButton
        ref={(el) => {
          // Forward the ref to the button element
          if (ref && el && el.getElement) {
            const buttonElement = el.getElement();
            if (buttonElement) {
              if (typeof ref === 'function') {
                ref(buttonElement as HTMLButtonElement);
              } else {
                ref.current = buttonElement as HTMLButtonElement;
              }
            }
          }
        }}
        className={cn(sizeClass, className)}
        {...variantProps}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
