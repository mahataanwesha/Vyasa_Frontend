import React from 'react';
import { useToastStore } from '../../store/useToastStore';
import { CheckCircle, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

const icons = {
  success: <CheckCircle size={20} className="text-emerald-500" style={{ color: '#10b981' }} />,
  error: <AlertCircle size={20} className="text-rose-500" style={{ color: '#f43f5e' }} />,
  warning: <AlertTriangle size={20} className="text-amber-500" style={{ color: '#f59e0b' }} />,
  info: <Info size={20} className="text-cyan-500" style={{ color: '#06b6d4' }} />,
};

const toastColors = {
  success: {
    borderLeft: '4px solid #10b981',
    background: 'rgba(255, 255, 255, 0.95)',
  },
  error: {
    borderLeft: '4px solid #f43f5e',
    background: 'rgba(255, 255, 255, 0.95)',
  },
  warning: {
    borderLeft: '4px solid #f59e0b',
    background: 'rgba(255, 255, 255, 0.95)',
  },
  info: {
    borderLeft: '4px solid #06b6d4',
    background: 'rgba(255, 255, 255, 0.95)',
  },
};

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToastStore();

  if (toasts.length === 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        maxWidth: '400px',
        width: 'calc(100% - 40px)',
      }}
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="animate-slide-up"
          style={{
            ...toastColors[toast.type],
            borderRadius: '10px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            color: '#0c1a30', // dark text for readability
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            fontWeight: 500,
            transition: 'all 0.3s ease',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {icons[toast.type]}
            <span>{toast.message}</span>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#94a3b8',
              display: 'flex',
              alignItems: 'center',
              padding: '2px',
            }}
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};
export default ToastContainer;
