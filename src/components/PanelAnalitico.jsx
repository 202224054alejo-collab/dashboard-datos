// src/components/PanelAnalitico.jsx
import React, { useState } from 'react';
import { obtenerSerieDeTiempo } from '../services/dataService';
import TarjetaMetrica from './TarjetaMetrica';
import TablaDatos from './TablaDatos';

function PanelAnalitico() {
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const ejecutarConsultaAPI = async () => {
    setCargando(true);
    setError(null);
    setDatos(null);

    try {
      // Simulamos un pequeño retraso opcional o llamamos directamente
      const resultado = await obtenerSerieDeTiempo();
      setDatos(resultado);
    } catch (err) {
      setError(err.message || 'Ocurrió un error inesperado al procesar los datos.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div style={{ background: '#ffffff', borderRadius: '8px', padding: '1.5rem', border: '1px solid #e2e8f0', marginTop: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h3 style={{ margin: 0, color: '#1e293b', fontSize: '1.25rem' }}>Panel de Análisis de Datos en Tiempo Real</h3>
          <p style={{ margin: '0.25rem 0 0 0', color: '#64748b', fontSize: '0.875rem' }}>Conexión externa vía API REST (Open-Meteo)</p>
        </div>
        <button
          onClick={ejecutarConsultaAPI}
          disabled={cargando}
          style={{
            backgroundColor: cargando ? '#94a3b8' : '#2563eb',
            color: '#ffffff',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '6px',
            fontWeight: '600',
            cursor: cargando ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.2s'
          }}
        >
          {cargando ? 'Analizando datos...' : 'Consultar Dataset Externo'}
        </button>
      </div>

      {/* 1. Estado de Carga (Loading) */}
      {cargando && (
        <div style={{ padding: '3rem', textAlign: 'center', color: '#2563eb', fontSize: '1rem', fontWeight: '500' }}>
          <div style={{ marginBottom: '0.5rem' }}>🔄 Analizando datos y generando métricas...</div>
          <span style={{ fontSize: '0.8125rem', color: '#64748b' }}>Estableciendo comunicación segura con el servidor remoto</span>
        </div>
      )}

      {/* 2. Manejo de Errores */}
      {error && (
        <div style={{ backgroundColor: '#fef2f2', border: '1px solid #f87171', color: '#dc2626', padding: '1rem', borderRadius: '6px', marginBottom: '1rem' }}>
          <strong>⚠️ Error de Conexión / Procesamiento:</strong> {error}
        </div>
      )}

      {/* 3. Renderizado de Datos Exitosos */}
      {datos && !cargando && (
        <div>
          <div style={{ marginBottom: '1rem', fontSize: '0.875rem', color: '#059669', fontWeight: '500' }}>
            ✅ Datos obtenidos exitosamente para la región ({datos.ubicacion}) - Zona: {datos.zonaHoraria}
          </div>

          {/* Tarjetas de Métricas basadas en la API */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            <TarjetaMetrica 
              titulo="Temperatura Actual" 
              valor={`${datos.temperaturaActual} ${datos.unidadTemperatura}`} 
              descripcion="Métrica registrada en vivo" 
            />
            <TarjetaMetrica 
              titulo="Humedad Relativa" 
              valor={`${datos.humedad} ${datos.unidadHumedad}`} 
              descripcion="Nivel ambiental analizado" 
            />
            <TarjetaMetrica 
              titulo="Velocidad de Viento" 
              valor={`${datos.viento} ${datos.unidadViento}`} 
              descripcion="Indicador meteorológico" 
            />
          </div>

          {/* Tabla reutilizando la estructura anterior */}
          <h4 style={{ color: '#334155', marginBottom: '0.75rem' }}>Serie de Tiempo Reciente (Horaria)</h4>
          <TablaDatos datos={datos.serieHoraria.map(item => ({
            id: item.id,
            modelo: `Registro temporal`,
            precision: item.temperatura / 50, // Conversión simulada para la tabla
            error: 0.05,
            estado: item.hora
          }))} />
        </div>
      )}
    </div>
  );
}

export default PanelAnalitico;