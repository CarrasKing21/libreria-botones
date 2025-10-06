// Importa React para poder usar JSX
import React from 'react';
// Importa el componente base Button
import Button from './Button';
// Importa el icono "X" desde la librería de iconos Tabler
import { IconX } from '@tabler/icons-react';

// Define el componente CancelButton, que es una especialización de Button
const CancelButton = (props) => {
    return (
        // Renderiza el componente Button con una variante 'secondary' y pasa todas las demás props
        <Button variant="secondary" {...props}>
            {/* Icono "X" con un tamaño de 16px y estilos para alineación y margen */}
            <IconX size={16} style={{ marginRight: '5px', verticalAlign: 'middle' }} />
            {/* Texto del botón */}
            Cancel
        </Button>
    );
};

// Exporta el componente para que pueda ser utilizado en otras partes de la aplicación
export default CancelButton;
