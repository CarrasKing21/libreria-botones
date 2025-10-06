// Importa React para poder usar JSX
import React from 'react';
// Importa el componente base Button
import Button from './Button';
// Importa el icono de enviar desde la librería de iconos Tabler
import { IconSend } from '@tabler/icons-react';

// Define el componente SendButton, que es una especialización de Button
const SendButton = ({ children, ...props }) => {
    return (
        // Renderiza el componente Button con una variante 'primary' y pasa todas las demás props
        <Button variant="primary" {...props}>
            {/* Icono de enviar con un tamaño de 16px y estilos para alineación y margen */}
            <IconSend size={16} style={{ marginRight: '5px', verticalAlign: 'middle' }} />
            {children || 'Send'}
        </Button>
    );
};

// Exporta el componente para que pueda ser utilizado en otras partes de la aplicación
export default SendButton;