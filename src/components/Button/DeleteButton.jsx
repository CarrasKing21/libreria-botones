// Importa React para poder usar JSX
import React from 'react';
// Importa el componente base Button de tu librería
import Button from './Button';
// Importa el icono de papelera desde la librería de iconos Tabler
import { IconTrash } from '@tabler/icons-react';

// Componente DeleteButton, reutiliza el componente Button
const DeleteButton = ({ isConfirming = false, ...props }) => {
  // Determina la clase, el texto y el icono en función del estado de confirmación.
  const buttonText = isConfirming ? 'Confirmar' : 'Eliminar';
  const buttonClassName = isConfirming ? 'confirm' : '';

  return (
    // Componente Button con variante 'danger' y las props calculadas.
    <Button
      variant="danger"
      className={buttonClassName}
      {...props}
    >
      {/* Icono de papelera con tamaño 16 y margen a la derecha para separar del texto */}
      <IconTrash size={16} style={{ marginRight: '5px', verticalAlign: 'middle' }} />
      {/* El texto cambia dinámicamente */}
      {buttonText}
    </Button>
  );
};

// Exporta el componente para poder usarlo en otros archivos
export default DeleteButton;
