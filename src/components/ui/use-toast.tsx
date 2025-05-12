
import * as React from "react";
import { Toast as PrimeToast } from "primereact/toast";

export type ToastProps = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  variant?: "default" | "destructive";
};

const useToast = () => {
  const toastRef = React.useRef<PrimeToast>(null);

  const show = (props: ToastProps) => {
    if (toastRef.current) {
      toastRef.current.show({
        severity: props.variant === "destructive" ? "error" : "info",
        summary: props.title,
        detail: props.description,
        life: 3000,
      });
    }
  };

  const error = (props: Omit<ToastProps, "variant">) => {
    if (toastRef.current) {
      toastRef.current.show({
        severity: "error",
        summary: props.title,
        detail: props.description,
        life: 3000,
      });
    }
  };

  const success = (props: Omit<ToastProps, "variant">) => {
    if (toastRef.current) {
      toastRef.current.show({
        severity: "success",
        summary: props.title,
        detail: props.description,
        life: 3000,
      });
    }
  };

  return {
    toastRef,
    show,
    error,
    success
  };
};

export { useToast };
