// Importa React para poder usar JSX
import React from "react";

// Define el componente PreviousButton, un botón para la paginación.
// A diferencia de otros botones, este no reutiliza el componente base `Button`,
// sino que es un botón nativo con estilos específicos para la paginación.
// Recibe dos props:
// - onClick: la función a ejecutar cuando se hace clic.
// - disabled: un booleano que indica si el botón está deshabilitado.
function PreviousButton({ onClick, disabled }) {
  return (
    // Renderiza un elemento <button> nativo.
    // Asigna las props recibidas a los atributos correspondientes del botón.
    <button onClick={onClick} disabled={disabled} className="pagination-button">
      {/* Texto del botón */}
      Anterior
    </button>
  );
}

// Exporta el componente para que pueda ser utilizado en otras partes de la aplicación.
export default PreviousButton;
