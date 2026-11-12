// src/App.jsx
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import DashboardLayout from './components/DashboardLayout';
import PanelFiltros from './components/PanelFiltros';
import TarjetaMetrica from './components/TarjetaMetrica';
import TablaDatos from './components/TablaDatos';
import PanelAnalitico from './components/PanelAnalitico';
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

  // Estado global para los filtros interactivos
  const [filtros, setFiltros] = useState({
    categoria: 'todos',
    fecha: ''
  });

  // 1. Carga inicial de datos al montar la aplicación
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

  // 2. useEffect que "escucha" los cambios en el estado filtros para recalcular las vistas en tiempo real
  useEffect(() => {
    if (datasetCompleto.length === 0) return;

    let datosTemp = [...datasetCompleto];

    // Aplicar filtro por categoría / estado
    if (filtros.categoria === 'activo') {
      datosTemp = datosTemp.filter(item => item.estado === 'Activo' || item.estado === 'Optimizado');
    } else if (filtros.categoria === 'revision') {
      datosTemp = datosTemp.filter(item => item.estado === 'En revisión');
    }

    // Simulación de filtrado por fecha si el usuario selecciona una
    if (filtros.fecha) {
      console.log(`Filtrando datos para la fecha: ${filtros.fecha}`);
    }

    // Actualizar dataset filtrado y recalcular métricas simultáneamente
    setDatasetFiltrado(datosTemp);
    const nuevasMetricas = procesarDatos(datosTemp);
    setMetricas(nuevasMetricas);

  }, [filtros, datasetCompleto]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'sans-serif' }}>
        <h2>Cargando Dashboard Interactivo...</h2>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'sans-serif' }}>
      <Navbar />
      
      <DashboardLayout>
        <h2 style={{ color: '#1e293b', margin: 0 }}>Dashboard de Ciencia de Datos - Panel Analítico</h2>

        {/* Panel de Filtros Interactivos (Estado Compartido) */}
        <PanelFiltros filtros={filtros} setFiltros={setFiltros} />

        {/* Tarjetas de Métricas que se actualizan en tiempo real */}
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          <TarjetaMetrica 
            titulo="Modelos Filtrados" 
            valor={metricas.totalModelos} 
            descripcion="Elementos activos en la vista actual" 
          />
          <TarjetaMetrica 
            titulo="Precisión Promedio" 
            valor={`${(metricas.promedioPrecision * 100).toFixed(0)}%`} 
            descripcion="Rendimiento medio filtrado" 
          />
          <TarjetaMetrica 
            titulo="Destacado Actual" 
            valor={metricas.mejorModelo} 
            descripcion={`Con un ${metricas.precisionMaxima * 100}% de precisión`} 
          />
        </div>

        {/* Tabla de Datos Dinámica conectada al estado filtrado */}
        <TablaDatos datos={datasetFiltrado} />

        {/* Panel de API Externa desarrollado en la Práctica 3 */}
        <PanelAnalitico />
      </DashboardLayout>
    </div>
  );
}

export default App;