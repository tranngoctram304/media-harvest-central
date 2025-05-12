
import * as React from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const AlertDialog = ({ children, ...props }: { children: React.ReactNode, [key: string]: any }) => {
  return <>{children}</>;
};

const AlertDialogTrigger = ({ children, onClick }: { children: React.ReactNode, onClick?: () => void }) => {
  return React.cloneElement(children as React.ReactElement, {
    onClick: onClick
  });
};

const AlertDialogContent = ({ 
  children, 
  visible, 
  onHide,
  className,
  ...props 
}: { 
  children: React.ReactNode, 
  visible: boolean, 
  onHide: () => void,
  className?: string,
  [key: string]: any 
}) => {
  return (
    <Dialog
      visible={visible}
      onHide={onHide}
      modal
      className={cn("max-w-lg", className)}
      {...props}
    >
      {children}
    </Dialog>
  );
};

const AlertDialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col space-y-2 text-center sm:text-left", className)}
    {...props}
  />
);

const AlertDialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-4", className)}
    {...props}
  />
);

const AlertDialogTitle = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3
    className={cn("text-lg font-semibold", className)}
    {...props}
  />
);

const AlertDialogDescription = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
);

const AlertDialogAction = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Button>) => (
  <Button
    {...props}
    className={cn(className)}
  />
);

const AlertDialogCancel = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Button>) => (
  <Button
    variant="outline"
    className={cn("mt-2 sm:mt-0", className)}
    {...props}
  />
);

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
