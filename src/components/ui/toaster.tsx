
import React from 'react';
import { Toast } from 'primereact/toast';
import { useToast } from './use-toast';

export function Toaster() {
  const { toastRef } = useToast();
  
  return <Toast ref={toastRef} position="top-right" />;
}
