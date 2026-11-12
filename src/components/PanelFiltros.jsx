// src/components/PanelFiltros.jsx
import React from 'react';

function PanelFiltros({ filtros, setFiltros }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiltros((prevFiltros) => ({
      ...prevFiltros,
      [name]: value,
    }));
  };

  return (
    <div style={{
      background: '#ffffff',
      padding: '1.25rem',
      borderRadius: '8px',
      border: '1px solid #e2e8f0',
      marginBottom: '2rem',
      display: 'flex',
      gap: '1.5rem',
      alignItems: 'center',
      flexWrap: 'wrap',
      boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
    }}>
      <h4 style={{ margin: 0, color: '#1e293b', fontSize: '1rem', width: '100%', marginBottom: '0.25rem' }}>
        🔍 Filtros Interactivos del Dashboard
      </h4>
      
      {/* Filtro de Categoría / Región */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', flex: '1', minWidth: '200px' }}>
        <label style={{ fontSize: '0.8125rem', color: '#64748b', fontWeight: '500' }}>
          Categoría / Modelo:
        </label>
        <select
          name="categoria"
          value={filtros.categoria}
          onChange={handleChange}
          style={{
            padding: '0.625rem',
            borderRadius: '6px',
            border: '1px solid #cbd5e1',
            fontSize: '0.875rem',
            backgroundColor: '#f8fafc',
            color: '#0f172a',
            outline: 'none'
          }}
        >
          <option value="todos">Todos los Modelos</option>
          <option value="activo">Solo Activos / Optimizados</option>
          <option value="revision">En Revisión</option>
        </select>
      </div>

      {/* Filtro de Fecha / Rango */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', flex: '1', minWidth: '200px' }}>
        <label style={{ fontSize: '0.8125rem', color: '#64748b', fontWeight: '500' }}>
          Fecha de Análisis:
        </label>
        <input
          type="date"
          name="fecha"
          value={filtros.fecha}
          onChange={handleChange}
          style={{
            padding: '0.55rem',
            borderRadius: '6px',
            border: '1px solid #cbd5e1',
            fontSize: '0.875rem',
            backgroundColor: '#f8fafc',
            color: '#0f172a',
            outline: 'none'
          }}
        />
      </div>
    </div>
  );
}

export default PanelFiltros;