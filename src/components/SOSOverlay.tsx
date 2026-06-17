import React from 'react';
import { useClinicalStore } from '../store/useClinicalStore';

export const SOSOverlay: React.FC = () => {
  const { sosAlert, acknowledgeSOS } = useClinicalStore();

  if (!sosAlert) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#C62828',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textAlign: 'center',
        animation: 'pulse-bg 1s infinite'
      }}
    >
      <style>
        {`
          @keyframes pulse-bg {
            0%, 100% { background: #C62828; }
            50% { background: #B71C1C; }
          }
        `}
      </style>
      <div style={{ fontSize: '48px', fontWeight: 900, letterSpacing: '-2px' }}>
        🚨 SOS ALERT
      </div>
      <div style={{ fontSize: '24px', marginTop: '8px', opacity: 0.9 }}>
        {sosAlert.patientName}
      </div>
      <div style={{ fontFamily: 'monospace', fontSize: '14px', marginTop: '16px', opacity: 0.8, lineHeight: 1.8 }}>
        {sosAlert.message}
      </div>
      <button
        onClick={acknowledgeSOS}
        style={{
          marginTop: '24px',
          fontSize: '16px',
          padding: '14px 32px',
          background: 'rgba(255,255,255,0.1)',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 600
        }}
        onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
        onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
      >
        ✔ ACKNOWLEDGE
      </button>
      <div style={{ marginTop: '12px', fontSize: '12px', opacity: 0.6 }}>
        Only acknowledging doctors/nurses can dismiss this alert
      </div>
    </div>
  );
};
