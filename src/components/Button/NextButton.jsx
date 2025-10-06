// Importa React para poder usar JSX
import React from 'react';
// Importa el componente base Button
import Button from './Button';
// Importa el icono de flecha derecha desde la librería de iconos Tabler
import { IconArrowRight } from '@tabler/icons-react';

// Define el componente NextButton, que es una especialización de Button para navegación
const NextButton = (props) => {
    return (
        // Renderiza el componente Button con una variante 'primary' y pasa todas las demás props
        <Button variant="primary" {...props}>
            {/* Icono de flecha derecha con un tamaño de 16px y estilos para alineación y margen */}
            <IconArrowRight size={16} style={{ marginRight: '5px', verticalAlign: 'middle' }} />
            {/* Texto del botón */}
            Next
        </Button>
    );
};

// Exporta el componente para que pueda ser utilizado en otras partes de la aplicación
export default NextButton;