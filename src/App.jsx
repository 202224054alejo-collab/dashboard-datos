// Actualización en src/App.jsx
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import DashboardLayout from './components/DashboardLayout';
import PanelFiltros from './components/PanelFiltros';
import TarjetaMetrica from './components/TarjetaMetrica';
import TablaDatos from './components/TablaDatos';
import PanelAnalitico from './components/PanelAnalitico';
// Importar gráficos D3.js
import GraficoTendencia from './components/charts/GraficoTendencia';
import GraficoComparativo from './components/charts/GraficoComparativo';
import { obtenerDatosVisualizacion, procesarDatos } from './services/dataService';

function App() {
  const [datasetCompleto, setDatasetCompleto] = useState([]);
  const [datasetFiltrado, setDatasetFiltrado] = useState([]);
  const [metricas, setMetricas] = useState({
    totalModelos: 0,
    promedioPrecision: 0,
    mejorModelo: 'Cargando...',
    precisionMaxima: 0
  });
  const [loading, setLoading] = useState(true);
  const [filtros, setFiltros] = useState({
    categoria: 'todos',
    fecha: ''
  });

  useEffect(() => {
    const cargarDatosIniciales = async () => {
      try {
        const datosCrudos = await obtenerDatosVisualizacion();
        setDatasetCompleto(datosCrudos);
        setDatasetFiltrado(datosCrudos);
        const metricasProcesadas = procesarDatos(datosCrudos);
        setMetricas(metricasProcesadas);
      } catch (error) {
        console.error('Error al cargar datos:', error);
      } finally {
        setLoading(false);
      }
    };

    cargarDatosIniciales();
  }, []);

  useEffect(() => {
    if (datasetCompleto.length === 0) return;

    let datosTemp = [...datasetCompleto];

    if (filtros.categoria === 'activo') {
      datosTemp = datosTemp.filter(item => item.estado === 'Activo' || item.estado === 'Optimizado');
    } else if (filtros.categoria === 'revision') {
      datosTemp = datosTemp.filter(item => item.estado === 'En revisión');
    }

    setDatasetFiltrado(datosTemp);
    const nuevasMetricas = procesarDatos(datosTemp);
    setMetricas(nuevasMetricas);

  }, [filtros, datasetCompleto]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'sans-serif' }}>
        <h2>Cargando Dashboard de Visualización...</h2>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'sans-serif' }}>
      <Navbar />
      
      <DashboardLayout>
        <h2 style={{ color: '#1e293b', margin: 0 }}>Dashboard Avanzado de Ciencia de Datos</h2>

        <PanelFiltros filtros={filtros} setFiltros={setFiltros} />

        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          <TarjetaMetrica 
            titulo="Modelos Filtrados" 
            valor={metricas.totalModelos} 
            descripcion="Elementos activos en la vista" 
          />
          <TarjetaMetrica 
            titulo="Precisión Promedio" 
            valor={`${(metricas.promedioPrecision * 100).toFixed(0)}%`} 
            descripcion="Rendimiento medio global" 
          />
          <TarjetaMetrica 
            titulo="Destacado Actual" 
            valor={metricas.mejorModelo} 
            descripcion={`Con un ${metricas.precisionMaxima * 100}% de precisión`} 
          />
        </div>

        {/* Contenedor Flexbox para mostrar ambos gráficos lado a lado de forma responsiva */}
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          <GraficoTendencia datos={datasetFiltrado} />
          <GraficoComparativo datos={datasetFiltrado} />
        </div>

        <TablaDatos datos={datasetFiltrado} />

        <PanelAnalitico />
      </DashboardLayout>
    </div>
  );
}

export default App;