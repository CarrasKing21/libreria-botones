// Importa React para poder usar JSX
import React from 'react';
// Importa el componente base Button
import Button from './Button';
// Importa el icono de edición desde la librería de iconos Tabler
import { IconEdit } from '@tabler/icons-react';

// Define el componente EditButton, que es una especialización de Button
const EditButton = (props) => {
    return (
        // Renderiza el componente Button con una variante 'primary' y pasa todas las demás props
        <Button variant="primary" {...props}>
            {/* Icono de edición con un tamaño de 16px y estilos para alineación y margen */}
        <IconEdit size={16} />
            {/* Texto del botón */}
            Edit
        </Button>
    );
};

// Exporta el componente para que pueda ser utilizado en otras partes de la aplicación
export default EditButton;