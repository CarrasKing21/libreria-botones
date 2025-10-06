// Importa React para poder usar JSX
import React from 'react';
// Importa el componente base Button
import Button from './Button'; // Esta ruta es correcta ahora que el archivo está en la carpeta Button
// Importa el icono de 'X' desde la librería de iconos Tabler
import { IconX } from '@tabler/icons-react';

// Define el componente ClearButton
const ClearButton = (props) => {
  return (
    // Renderiza un botón con la variante 'secondary' y un tamaño pequeño.
    // Pasa todas las demás props, como onClick y title.
    <Button variant="secondary" size="small" {...props}>
      <IconX size={16} />
    </Button>
  );
};

export default ClearButton;