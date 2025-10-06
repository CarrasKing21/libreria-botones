// Importa React y el icono de cierre
import React, { useState } from 'react';
import { IconX } from '@tabler/icons-react';
// Importa los estilos del modal
import './Modal.css';

// Define el componente Modal
// Recibe 'isOpen' para saber si debe mostrarse, 'onClose' para cerrarse, 'title' y 'children' para el contenido.
const Modal = ({ isOpen, onClose, title, children }) => {
  const [isClosing, setIsClosing] = useState(false);

  // Si no está abierto, no renderiza nada.
  if (!isOpen) {
    return null;
  }

  const handleClose = () => {
    setIsClosing(true);
    // Espera a que la animación de cierre termine antes de llamar a onClose
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300); // Debe coincidir con la duración de la animación CSS
  };

  // Renderiza el modal
  return (
    // El fondo oscuro que cubre la pantalla. Al hacer clic, se cierra el modal.
    <div className={`modal-overlay ${isClosing ? 'closing' : ''}`} onClick={handleClose}>
      {/* El contenedor del contenido del modal. Evita que el clic se propague al fondo. */}
      <div className={`modal-content ${isClosing ? 'closing' : ''}`} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button className="modal-close-button" onClick={handleClose}><IconX size={24} /></button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;