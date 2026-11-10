// src/App.jsx
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import TarjetaMetrica from './components/TarjetaMetrica';
import TablaDatos from './components/TablaDatos';
import PanelAnalitico from './components/PanelAnalitico'; // <-- Importar componente nuevo
import { obtenerDatosVisualizacion, procesarDatos } from './services/dataService';

function App() {
  const [dataset, setDataset] = useState([]);
  const [metricas, setMetricas] = useState({
    totalModelos: 0,
    promedioPrecision: 0,
    mejorModelo: 'Cargando...',
    precisionMaxima: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const datosCrudos = await obtenerDatosVisualizacion();
        setDataset(datosCrudos);
        const datosProcesados = procesarDatos(datosCrudos);
        setMetricas(datosProcesados);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'sans-serif' }}>
        <h2>Cargando datos del dashboard...</h2>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'sans-serif' }}>
      <Navbar />
      
      <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ color: '#1e293b', marginBottom: '1.5rem' }}>Resumen General del Dataset</h2>

        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          <TarjetaMetrica 
            titulo="Total de Modelos" 
            valor={metricas.totalModelos} 
            descripcion="Modelos evaluados en el sistema" 
          />
          <TarjetaMetrica 
            titulo="Precisión Promedio" 
            valor={`${(metricas.promedioPrecision * 100).toFixed(0)}%`} 
            descripcion="Rendimiento medio global" 
          />
          <TarjetaMetrica 
            titulo="Mejor Modelo" 
            valor={metricas.mejorModelo} 
            descripcion={`Con un ${metricas.precisionMaxima * 100}% de precisión`} 
          />
        </div>

        <TablaDatos datos={dataset} />

        {/* Nuevo Panel de Integración con API Externa */}
        <PanelAnalitico />
      </main>
    </div>
  );
}

export default App;