import React from 'react';

function Navbar() {
  return (
    <header style={{
      backgroundColor: '#1e293b',
      color: '#ffffff',
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Dashboard de Ciencia de Datos</h1>
      <p style={{ margin: 0, fontSize: '1rem' }}>Alumno: Emmanuel Alejo Vargas</p>
    </header>
  );
}

export default Navbar;