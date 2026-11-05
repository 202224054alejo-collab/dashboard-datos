// src/components/TablaDatos.jsx
import React from 'react';

function TablaDatos({ datos }) {
  return (
    <div style={{ background: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden', marginTop: '2rem' }}>
      <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
        <h3 style={{ margin: 0, fontSize: '1.125rem', color: '#1e293b' }}>Dataset de Modelos de Machine Learning</h3>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9', color: '#475569' }}>
              <th style={{ padding: '0.75rem 1.5rem' }}>ID</th>
              <th style={{ padding: '0.75rem 1.5rem' }}>Modelo</th>
              <th style={{ padding: '0.75rem 1.5rem' }}>Precisión</th>
              <th style={{ padding: '0.75rem 1.5rem' }}>Error</th>
              <th style={{ padding: '0.75rem 1.5rem' }}>Estado</th>
            </tr>
          </thead>
          <tbody>
            {datos.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '0.75rem 1.5rem', color: '#64748b' }}>{item.id}</td>
                <td style={{ padding: '0.75rem 1.5rem', fontWeight: '500', color: '#0f172a' }}>{item.modelo}</td>
                <td style={{ padding: '0.75rem 1.5rem', color: '#059669' }}>{item.precision * 100}%</td>
                <td style={{ padding: '0.75rem 1.5rem', color: '#dc2626' }}>{item.error * 100}%</td>
                <td style={{ padding: '0.75rem 1.5rem' }}>
                  <span style={{
                    padding: '0.25rem 0.5rem',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    background: item.estado === 'Optimizado' ? '#dcfce7' : '#e0f2fe',
                    color: item.estado === 'Optimizado' ? '#166534' : '#0369a1'
                  }}>
                    {item.estado}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TablaDatos;