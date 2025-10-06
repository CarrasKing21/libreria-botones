// Importamos React para poder usar JSX y el hook 'useState' para manejar el estado del componente.
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'; // Nuevo: Importar Router

// Importamos los estilos globales de la aplicación
import "./App.css";
import "./components/Accordion/Accordion.css";
import "./components/Modal/Modal.css";
import "./components/Button/Button.css";

// Nuevos componentes de página
import MainContent from './pages/MainContent'; // Nuevo: Contenido principal de la app
import DocsPage from './pages/DocsPage';     // Nuevo: Página de documentación

// ------------------------------
// COMPONENTE PRINCIPAL
// ------------------------------
function App() {
  // --- ESTADOS DEL COMPONENTE ---
  // El estado es la "memoria" del componente. Usamos `useState` para que React
  // vuelva a renderizar la vista cuando estos valores cambian.

  // `theme`: Controla el tema de color de la aplicación ('dark' o 'light').
  // Lee el tema guardado de localStorage al iniciar, o usa 'dark' por defecto.
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('app-theme');
    return savedTheme || 'dark';
  });

  // --- EFECTO PARA PERSISTIR EL TEMA ---
  // Guarda el tema seleccionado en localStorage cada vez que cambia.
  useEffect(() => {
    localStorage.setItem('app-theme', theme);
  }, [theme]);

  // --- RENDERIZADO DEL COMPONENTE PRINCIPAL (JSX) ---
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta para la aplicación principal */}
        <Route path="/" element={<MainContent theme={theme} setTheme={setTheme} />} />
        {/* Ruta para la página de documentación */}
        <Route path="/docs" element={<DocsPage theme={theme} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
