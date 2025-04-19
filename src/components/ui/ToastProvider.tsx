import React, { createContext, useContext, useState, useMemo } from 'react';
import Toast from './Toast';

type ToastImageType = {
  type: 'icon' | 'image' | 'lottie';
  source: any;
};

type ToastType = 'success' | 'error' | 'info';

interface ToastContextType {
  showToast: (
    title: string,
    options?: {
      description?: string;
      type?: ToastType;
      duration?: number;
      image?: ToastImageType;
    }
  ) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: React.ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toast, setToast] = useState<{
    title: string;
    description?: string;
    type: ToastType;
    duration: number;
    image?: ToastImageType;
  } | null>(null);

  const showToast = (
    title: string,
    options: {
      description?: string;
      type?: ToastType;
      duration?: number;
      image?: ToastImageType;
    } = {}
  ) => {
    setToast({
      title,
      description: options.description,
      type: options.type ?? 'info',
      duration: options.duration ?? 3000,
      image: options.image,
    });
  };

  const value = useMemo(() => ({ showToast }), []);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {toast && (
        <Toast
          title={toast.title}
          description={toast.description}
          type={toast.type}
          duration={toast.duration}
          image={toast.image}
          onHide={() => setToast(null)}
        />
      )}
    </ToastContext.Provider>
  );
}; 