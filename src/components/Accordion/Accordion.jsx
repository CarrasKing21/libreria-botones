// Importa React y los hooks useState para manejar el estado
import React, { useState, useEffect, useRef } from 'react';
// Importa un icono para el desplegable
import { IconChevronDown } from '@tabler/icons-react';
// Importa los estilos del acordeón
import './Accordion.css';

// Define el componente Accordion
// Recibe 'title' para la cabecera y 'children' para el contenido desplegable.
const Accordion = ({
  title,
  children,
  startOpen = false,
  isOpen: controlledIsOpen, // Prop para controlar el estado desde fuera
  onToggle, // Callback para notificar al padre del clic
}) => {
  // Generamos IDs únicos para la cabecera y el contenido para los atributos ARIA.
  const contentId = `accordion-content-${title.replace(/\s+/g, '-').toLowerCase()}`;
  const headerId = `accordion-header-${title.replace(/\s+/g, '-').toLowerCase()}`;

  // Estado interno para cuando el componente no es controlado
  const [internalIsOpen, setInternalIsOpen] = useState(startOpen);

  // Refs para medir la altura del contenido y aplicar la animación
  const contentRef = useRef(null);
  const [height, setHeight] = useState('0px');

  // Determina si el componente está controlado y cuál es su estado de apertura
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  // Función para manejar el clic en la cabecera
  const toggleAccordion = () => {
    if (isControlled) {
      onToggle(); // Si está controlado, llama a la función del padre
    } else {
      setInternalIsOpen(!internalIsOpen); // Si no, maneja su propio estado
    }
  };

  // Efecto para calcular y aplicar la altura para la animación
  useEffect(() => {
    const contentNode = contentRef.current;
    // Función para actualizar la altura
    const updateHeight = () => {
      if (isOpen && contentNode) {
        setHeight(`${contentNode.scrollHeight}px`);
      } else {
        setHeight('0px');
      }
    };

    // Observador para reaccionar a cambios de tamaño del contenido (ej: al abrir un acordeón anidado)
    const resizeObserver = new ResizeObserver(updateHeight);
    if (isOpen) {
      resizeObserver.observe(contentNode);
    }
    updateHeight(); // Llama una vez para establecer la altura inicial
    return () => resizeObserver.disconnect(); // Limpia el observador al desmontar
  }, [isOpen]);

  return (
    <div className="accordion">
      {/* La cabecera ahora es un botón para mejorar la accesibilidad. */}
      <button
        id={headerId}
        className="accordion-header"
        onClick={toggleAccordion}
        aria-expanded={isOpen}
        aria-controls={contentId}
      >
        <span className="accordion-title">{title}</span>
        <IconChevronDown className={`accordion-icon ${isOpen ? 'open' : ''}`} size={20} />
      </button>
      {/* El contenido que se muestra u oculta */}
      <div
        id={contentId}
        className={`accordion-content ${isOpen ? 'open' : ''}`}
        style={{ height: height }}
        role="region"
        aria-labelledby={headerId}>
        <div ref={contentRef} className="accordion-content-inner">{children}</div>
      </div>
    </div>
  );
};

export default Accordion;