
import * as React from 'react';
import { cn } from "@/lib/utils";

const Collapsible = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { open?: boolean }
>(({ open, className, children, ...props }, ref) => {
  const [isOpen, setIsOpen] = React.useState(open);

  React.useEffect(() => {
    if (open !== undefined) {
      setIsOpen(open);
    }
  }, [open]);

  return (
    <div
      ref={ref}
      className={cn(className)}
      {...props}
    >
      {React.Children.map(children, child => {
        if (!React.isValidElement(child)) return child;
        
        if (child.type === CollapsibleTrigger) {
          return React.cloneElement(child as React.ReactElement<any>, {
            onClick: () => setIsOpen(!isOpen)
          });
        }
        
        if (child.type === CollapsibleContent) {
          return React.cloneElement(child as React.ReactElement<any>, {
            open: isOpen
          });
        }
        
        return child;
      })}
    </div>
  );
});

Collapsible.displayName = "Collapsible";

const CollapsibleTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(className)}
    {...props}
  >
    {children}
  </button>
));

CollapsibleTrigger.displayName = "CollapsibleTrigger";

const CollapsibleContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { open?: boolean }
>(({ className, open, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "overflow-hidden transition-all",
      open ? "h-auto" : "h-0",
      className
    )}
    {...props}
  >
    {children}
  </div>
));

CollapsibleContent.displayName = "CollapsibleContent";

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
