import React from 'react';
import { CheckCircle2, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  title: string;
  message?: string;
  type?: 'success' | 'info';
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-start gap-3 p-4 bg-stone-900 text-stone-100 border border-stone-800 shadow-xl rounded-lg animate-in fade-in slide-in-from-bottom-2 duration-200"
        >
          {toast.type === 'info' ? (
            <Info className="w-5 h-5 text-stone-300 shrink-0 mt-0.5" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-amber-200 shrink-0 mt-0.5" />
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium tracking-tight text-white">{toast.title}</p>
            {toast.message && (
              <p className="text-xs text-stone-300 mt-0.5 leading-relaxed">{toast.message}</p>
            )}
          </div>
          <button
            onClick={() => onDismiss(toast.id)}
            className="text-stone-400 hover:text-stone-200 p-1 shrink-0 transition-colors"
            aria-label="Dismiss notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
