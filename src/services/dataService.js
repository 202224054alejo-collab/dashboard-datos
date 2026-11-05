// src/services/dataService.js

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