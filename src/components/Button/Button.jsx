// Importamos React para poder crear componentes y usar JSX
import React, { Children } from 'react';

// Importamos el archivo de estilos CSS asociado a este componente
// Aquí definiremos las clases .btn, .primary, .secondary, etc.
import './Button.css';

// Definimos un componente funcional llamado Button
// Este componente es reutilizable y configurable mediante props
const Button = ({
  variant = 'primary',   // Variante de estilo (por ejemplo: 'primary', 'secondary', 'danger'…)
  size = 'medium',       // Tamaño del botón ('small', 'medium', 'large')
  disabled = false,      // Define si el botón está deshabilitado o no
  children,              // Contenido interno del botón (texto o incluso íconos)
  onClick,               // Función que se ejecutará al hacer clic
  className = '',        // Clases CSS adicionales opcionales que el desarrollador quiera añadir
  title,                 // El title se usará para el tooltip y como aria-label si no hay texto
  ...props               // Resto de props para pasarlas al elemento button
}) => {

  // Combinamos dinámicamente las clases CSS
  // - 'btn' es la clase base para todos los botones
  // - 'variant' y 'size' cambian el color, borde y tamaño según el tipo de botón
  // - 'className' permite añadir clases personalizadas externas
  const classNames = `btn ${variant} ${size} ${className}`;
  
  // Determina si el botón tiene contenido de texto visible.
  // Esto nos ayuda a decidir si necesitamos un aria-label.
  const hasVisibleText = Children.toArray(children).some(child => typeof child === 'string' && child.trim() !== '');

  // Prepara los props de accesibilidad.
  // Si no hay texto visible y hay un 'title', lo usamos como 'aria-label'.
  const accessibilityProps = !hasVisibleText && title ? { 'aria-label': title } : {};

  // Renderizamos el botón con sus propiedades dinámicas
  return (
    <button
      className={classNames}   // Aplica las clases calculadas
      title={title}            // Mantenemos el title para el tooltip visual
      disabled={disabled}      // Desactiva el botón si disabled es true
      onClick={onClick}        // Ejecuta la función onClick al hacer clic
      {...props}               // Pasa todas las demás props, como 'title'
      {...accessibilityProps}  // Añade el aria-label si es necesario
    >
      {/* children representa el contenido dentro del botón (por ejemplo: <Button>Guardar</Button>) */}
      {children}
    </button>
  );
};

// Exportamos el componente para poder usarlo en otros archivos o proyectos
export default Button;
