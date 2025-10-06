// Importa React para poder usar JSX
import React from 'react';
// Importa el componente base Button
import Button from './Button';
// Importa el icono de disquete (guardar) desde la librería de iconos Tabler
import { IconDeviceFloppy } from '@tabler/icons-react';

// Define el componente SaveButton, que es una especialización de Button
// Recibe 'children' para el texto y cualquier otra prop para el botón base.
const SaveButton = ({ children, ...props }) => {
  return (
    <Button variant="success" {...props}>
      <IconDeviceFloppy size={16} style={{ marginRight: '5px', verticalAlign: 'middle' }} />
      {/* Si se pasa texto, se usa; si no, se usa "Guardar" por defecto */}
      {children || 'Guardar'}
    </Button>
  );
};

// Exporta el componente para que pueda ser utilizado en otras partes de la aplicación
export default SaveButton;
