// Importa React para poder usar JSX
import React from "react";

// Define el componente FavouriteButton, un botón especializado para marcar/desmarcar favoritos.
// Recibe dos props:
// - onClick: la función a ejecutar cuando se hace clic.
// - active: un booleano que indica si el botón está en estado "activo" (favorito).
function FavouriteButton({ onClick, active }) {
  return (
    // Renderiza un elemento <button> nativo.
    <button
      // Asigna la función recibida al evento onClick.
      onClick={onClick}
      // Define las clases CSS del botón.
      // - 'favourite-button' es la clase base.
      // - 'active' se añade condicionalmente si la prop `active` es true.
      className={`favourite-button ${active ? "active" : ""}`}
    >
      {/* Icono de estrella en formato SVG. */}
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor" // El color del SVG se heredará del color de texto del CSS del botón.
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21 12 17.27Z" />
      </svg>
    </button>
  );
}

// Exporta el componente para que pueda ser utilizado en otras partes de la aplicación.
export default FavouriteButton;
