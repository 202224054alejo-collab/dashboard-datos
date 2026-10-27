import Navbar from './components/Navbar';

function App() {
  return (
    <div>
      <Navbar />
      <main style={{ padding: '2rem' }}>
        <h2>Bienvenido al entorno frontend</h2>
        <p>El componente base se ha cargado correctamente.</p>
      </main>
    </div>
  );
}

export default App;