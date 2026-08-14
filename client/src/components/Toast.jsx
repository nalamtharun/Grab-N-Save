import React from 'react';
import { useCoupons } from '../context/CouponContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts, removeToast } = useCoupons();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.5rem',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        maxWidth: '380px',
        width: '100%',
        pointerEvents: 'none',
      }}
    >
      {toasts.map((toast) => {
        let Icon = CheckCircle2;
        let borderColor = 'rgba(16, 185, 129, 0.4)';
        let iconColor = '#10B981';

        if (toast.type === 'error') {
          Icon = AlertCircle;
          borderColor = 'rgba(244, 63, 94, 0.4)';
          iconColor = '#F43F5E';
        } else if (toast.type === 'info') {
          Icon = Info;
          borderColor = 'rgba(99, 102, 241, 0.4)';
          iconColor = '#6366F1';
        }

        return (
          <div
            key={toast.id}
            style={{
              pointerEvents: 'auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '0.75rem',
              background: '#131b2e',
              border: `1px solid ${borderColor}`,
              borderRadius: '12px',
              padding: '0.85rem 1.15rem',
              boxShadow: '0 12px 30px rgba(0, 0, 0, 0.5)',
              color: '#F8FAFC',
              fontSize: '0.9rem',
              animation: 'fadeIn 0.2s ease-out',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <Icon size={18} color={iconColor} style={{ flexShrink: 0 }} />
              <span>{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#94A3B8',
                cursor: 'pointer',
                display: 'flex',
                padding: '0.2rem',
              }}
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
