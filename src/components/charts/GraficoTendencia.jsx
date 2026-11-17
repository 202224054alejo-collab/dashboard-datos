// src/components/charts/GraficoTendencia.jsx
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function GraficoTendencia({ datos }) {
  const svgRef = useRef();

  useEffect(() => {
    if (!datos || datos.length === 0) return;

    // Limpiar lienzo anterior para evitar duplicados al actualizar el estado
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = 500;
    const height = 250;
    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg
      .attr('viewBox', `0 0 ${width} ${height}`)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Extraer etiquetas y valores
    const labels = datos.map(d => d.modelo || d.hora || `ID ${d.id}`);
    const values = datos.map(d => d.precision ? d.precision * 100 : (d.temperatura || 0));

    // Escalas
    const xScale = d3.scalePoint()
      .domain(labels)
      .range([0, innerWidth])
      .padding(0.5);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(values) ? d3.max(values) * 1.1 : 100])
      .nice()
      .range([innerHeight, 0]);

    // Ejes
    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale))
      .selectAll('text')
      .style('font-size', '10px')
      .attr('transform', 'rotate(-15)')
      .style('text-anchor', 'end');

    g.append('g')
      .call(d3.axisLeft(yScale).ticks(5))
      .style('font-size', '10px');

    // Línea de tendencia
    const line = d3.line()
      .x((d, i) => xScale(labels[i]))
      .y(d => yScale(d))
      .curve(d3.curveMonotoneX);

    g.append('path')
      .datum(values)
      .attr('fill', 'none')
      .attr('stroke', '#2563eb')
      .attr('stroke-width', 3)
      .attr('d', line);

    // Puntos interactivos con Tooltips visuales
    g.selectAll('circle')
      .data(values)
      .enter()
      .append('circle')
      .attr('cx', (d, i) => xScale(labels[i]))
      .attr('cy', d => yScale(d))
      .attr('r', 5)
      .attr('fill', '#1d4ed8')
      .append('title') // Tooltip nativo al pasar el cursor
      .text((d, i) => `${labels[i]}: ${d}`);

  }, [datos]);

  return (
    <div style={{ background: '#ffffff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0', flex: 1, minWidth: '300px' }}>
      <h4 style={{ margin: '0 0 1rem 0', color: '#1e293b', fontSize: '1rem' }}>📈 Tendencia de Rendimiento (Línea)</h4>
      <svg ref={svgRef} style={{ width: '100%', height: 'auto', display: 'block' }}></svg>
    </div>
  );
}

export default GraficoTendencia;