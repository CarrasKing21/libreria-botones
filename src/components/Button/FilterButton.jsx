// Importa React para poder usar JSX
import React from 'react';

// Importa el componente base Button de tu librería
import Button from './Button'; // Esta ruta es correcta ahora que el archivo está en la carpeta Button

// Importa el icono de filtro desde la librería de iconos Tabler
import { IconFilter } from '@tabler/icons-react';

// Componente FilterButton, reutiliza el componente Button
const FilterButton = (props) => {
  return (
    // Componente Button con variante 'outline' y todas las props adicionales que se pasen
    <Button variant="outline" {...props}>
      <IconFilter size={16} style={{ marginRight: '5px', verticalAlign: 'middle' }} />
      Filtrar
    </Button>
  );
};

// Exporta el componente para poder usarlo en otros archivos
export default FilterButton;