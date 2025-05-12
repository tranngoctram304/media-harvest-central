
import React from 'react';
import { Toast } from 'primereact/toast';
import { useToast } from './use-toast';

export function Toaster() {
  const { toast } = useToast();
  
  return <Toast ref={toast.toastRef} position="top-right" />;
}
