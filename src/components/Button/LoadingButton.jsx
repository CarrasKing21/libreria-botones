// Importa React para poder usar JSX
import React from 'react';
// Importa el componente base Button
import Button from './Button';
// Importa el icono de carga desde la librería de iconos Tabler
import { IconRefresh } from '@tabler/icons-react';

// Define el componente LoadingButton, que es una especialización de Button para indicar un estado de carga
const LoadingButton = (props) => {
    return (
        // Renderiza el componente Button con una variante 'primary' y pasa todas las demás props
        <Button variant="primary" {...props}>
            {/* Icono de recarga con tamaño 16px y estilos para alineación y margen */}
            <IconRefresh size={16} style={{ marginRight: '5px', verticalAlign: 'middle' }} />
            {/* Texto del botón */}
            Recargar
        </Button>
    );
};

// Exporta el componente para que pueda ser utilizado en otras partes de la aplicación
export default LoadingButton;
