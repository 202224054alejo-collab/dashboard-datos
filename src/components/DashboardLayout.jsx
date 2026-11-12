// src/components/DashboardLayout.jsx
import React from 'react';

function DashboardLayout({ children }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '1.5rem',
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem'
    }}>
      {/* Área principal estructurada en cuadrícula fluida */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
      }}>
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;