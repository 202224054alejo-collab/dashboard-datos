// src/components/TarjetaMetrica.jsx
import React from 'react';

function TarjetaMetrica({ titulo, valor, descripcion }) {
  return (
    <div style={{
      background: '#ffffff',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      padding: '1.5rem',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      flex: '1',
      minWidth: '200px'
    }}>
      <h4 style={{ margin: '0 0 0.5rem 0', color: '#64748b', fontSize: '0.875rem', textTransform: 'uppercase' }}>
        {titulo}
      </h4>
      <p style={{ margin: '0 0 0.25rem 0', fontSize: '1.75rem', fontWeight: 'bold', color: '#0f172a' }}>
        {valor}
      </p>
      {descripcion && (
        <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{descripcion}</span>
      )}
    </div>
  );
}

export default TarjetaMetrica;