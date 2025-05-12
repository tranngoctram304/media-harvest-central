
import { useRef } from 'react';
import { Toast, ToastMessage } from 'primereact/toast';

export type ToastProps = {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  variant?: 'default' | 'destructive';
};

export function useToast() {
  const toastRef = useRef<Toast>(null);

  const show = (props: ToastProps) => {
    const { title, description, variant = 'default' } = props;
    
    const severity = variant === 'destructive' ? 'error' : 'info';
    
    const message: ToastMessage = {
      severity,
      summary: title,
      detail: description,
      life: 3000
    };
    
    toastRef.current?.show(message);
  };
  
  return {
    toast: {
      toastRef,
      show,
      error: (props: Omit<ToastProps, 'variant'>) => show({ ...props, variant: 'destructive' }),
      success: (props: Omit<ToastProps, 'variant'>) => show(props),
    }
  };
}

export const toast = {
  show: (props: ToastProps) => {
    // This is a global toast method that can be used without the hook
    // In a real implementation, this would need to use a toast queue
    console.log('Toast:', props);
  },
  error: (props: Omit<ToastProps, 'variant'>) => {
    toast.show({ ...props, variant: 'destructive' });
  },
  success: (props: Omit<ToastProps, 'variant'>) => {
    toast.show(props);
  },
};
