
import * as React from "react";
import { Dialog as PrimeDialog } from "primereact/dialog";
import { cn } from "@/lib/utils";

const Dialog = ({ children, ...props }: { children: React.ReactNode, [key: string]: any }) => {
  return <>{children}</>;
};

const DialogTrigger = ({ children, onClick }: { children: React.ReactNode, onClick?: () => void }) => {
  return React.cloneElement(children as React.ReactElement, {
    onClick: onClick
  });
};

const DialogContent = ({ 
  children, 
  className,
  ...props 
}: { 
  children: React.ReactNode,
  className?: string,
  [key: string]: any 
}) => {
  return (
    <PrimeDialog
      modal
      className={cn("p-0", className)}
      {...props}
    >
      {children}
    </PrimeDialog>
  );
};

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col space-y-2 text-center sm:text-left p-4 border-b", className)}
    {...props}
  />
);

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 p-4 border-t", className)}
    {...props}
  />
);

const DialogTitle = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3
    className={cn("text-lg font-semibold", className)}
    {...props}
  />
);

const DialogDescription = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
);

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
