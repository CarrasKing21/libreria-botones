// Importa React para poder usar JSX
import React from 'react';

// Importa el componente base Button de tu librería
import Button from './Button';

// Importa el icono "+" desde la librería de iconos Tabler
import { IconPlus } from '@tabler/icons-react';

// Componente CreateButton, reutiliza el componente Button
const CreateButton = (props) => {
  return (
    // Cambiamos la variante a 'primary' para que se vea azul
    <Button variant="primary" {...props}>
      {/* Icono "+" con tamaño 16 y margen a la derecha para separar del texto */}
      <IconPlus size={16} style={{ marginRight: '5px', verticalAlign: 'middle' }} />
      {/* Texto que se muestra dentro del botón */}
      Create
    </Button>
  );
};

// Exporta el componente para poder usarlo en otros archivos
export default CreateButton;
