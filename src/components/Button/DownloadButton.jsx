// Importa React para poder usar JSX
import React from 'react';

// Importa el componente base Button de tu librería
import Button from './Button';

// Importa el icono de descarga desde la librería de iconos Tabler
import { IconDownload } from '@tabler/icons-react';

// Componente DownloadButton, reutiliza el componente Button
const DownloadButton = (props) => {
    return (
        // Componente Button con variante 'primary' y todas las props adicionales que se pasen
        <Button variant="primary" {...props}>
            {/* Icono de descarga con tamaño 16 y margen a la derecha para separar del texto */}
            <IconDownload size={16} style={{ marginRight: '5px', verticalAlign: 'middle' }} />
            {/* Texto que se muestra dentro del botón */}
            Download
        </Button>
    );
};

// Exporta el componente para poder usarlo en otros archivos
export default DownloadButton;
