// Importa React para poder usar JSX
import React from 'react';
// Importa el componente base Button
import Button from './Button';
// Importa el icono de subir desde la librería de iconos Tabler
import { IconUpload } from '@tabler/icons-react';

// Define el componente UploadButton, que es una especialización de Button
const UploadButton = (props) => {
    return (
        // Renderiza el componente Button con una variante 'primary' y pasa todas las demás props
        <Button variant="primary" {...props}>
            {/* Icono de subir con un tamaño de 16px y estilos para alineación y margen */}
            <IconUpload size={16} style={{ marginRight: '5px', verticalAlign: 'middle' }} />
            {/* Texto del botón */}
            Upload
        </Button>
    );
};

// Exporta el componente para que pueda ser utilizado en otras partes de la aplicación
export default UploadButton;