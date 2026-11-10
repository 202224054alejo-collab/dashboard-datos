// src/services/dataService.js
import apiClient from './apiClient';

// Dataset simulado con información para análisis
const datasetMock = [
  { id: 1, modelo: 'Regresión Lineal', precision: 0.89, error: 0.11, estado: 'Activo' },
  { id: 2, modelo: 'Árboles de Decisión', precision: 0.94, error: 0.06, estado: 'Activo' },
  { id: 3, modelo: 'Random Forest', precision: 0.96, error: 0.04, estado: 'Optimizado' },
  { id: 4, modelo: 'SVM (Support Vector)', precision: 0.91, error: 0.09, estado: 'En revisión' },
  { id: 5, modelo: 'Red Neuronal MLP', precision: 0.95, error: 0.05, estado: 'Optimizado' }
];

/**
 * Simula una petición HTTP devolviendo una Promesa con el dataset.
 */
export const obtenerDatosVisualizacion = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(datasetMock);
    }, 500); // Simula 0.5 segundos de red
  });
};

/**
 * Procesa los datos para extraer métricas o formatearlos.
 */
export const procesarDatos = (datos) => {
  if (!datos || datos.length === 0) return { promedioPrecision: 0, totalModelos: 0 };

  const totalModelos = datos.length;
  const sumaPrecision = datos.reduce((acc, curr) => acc + curr.precision, 0);
  const promedioPrecision = (sumaPrecision / totalModelos).toFixed(2);
  const mejorModelo = datos.reduce((prev, curr) => (curr.precision > prev.precision ? curr : prev));

  return {
    totalModelos,
    promedioPrecision,
    mejorModelo: mejorModelo.modelo,
    precisionMaxima: mejorModelo.precision
  };
};

/**
 * Obtiene datos meteorológicos/analíticos históricos de la API de Open-Meteo
 * @param {number} lat - Latitud
 * @param {number} lon - Longitud
 */
export const obtenerSerieDeTiempo = async (lat = 19.43, lon = -99.13) => {
  try {
    // Petición GET simulando análisis geoespacial / climático
    const response = await apiClient.get('/forecast', {
      params: {
        latitude: lat,
        longitude: lon,
        current: 'temperature_2m,relative_humidity_2m,wind_speed_10m',
        hourly: 'temperature_2m',
      },
    });

    // Extraer la carga útil (payload) y estructurarla limpiamente
    const data = response.data;
    
    return {
      ubicacion: `Lat: ${data.latitude}, Lon: ${data.longitude}`,
      zonaHoraria: data.timezone,
      temperaturaActual: data.current.temperature_2m,
      unidadTemperatura: data.current_units.temperature_2m,
      humedad: data.current.relative_humidity_2m,
      unidadHumedad: data.current_units.relative_humidity_2m,
      viento: data.current.wind_speed_10m,
      unidadViento: data.current_units.wind_speed_10m,
      // Tomamos una muestra de las últimas horas para una tabla analítica
      serieHoraria: data.hourly.time.slice(0, 5).map((tiempo, index) => ({
        id: index + 1,
        hora: tiempo.replace('T', ' '),
        temperatura: data.hourly.temperature_2m[index],
      })),
    };
  } catch (error) {
    console.error('Error en el servicio de datos:', error);
    throw new Error('No se pudo conectar con la API de ciencia de datos. Verifique su conexión.');
  }
};