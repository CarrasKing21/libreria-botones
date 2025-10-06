// Importa React para poder usar JSX
import React from 'react';
// Importa el componente base Button
import Button from './Button';
// Importa el icono de búsqueda desde la librería de iconos Tabler
import { IconSearch } from '@tabler/icons-react';

// Define el componente SearchButton, que es una especialización de Button
const SearchButton = (props) => {
    return (
        // Renderiza el componente Button con una variante 'primary' y pasa todas las demás props
        <Button variant="primary" {...props}>
            {/* Icono de búsqueda con un tamaño de 16px y estilos para alineación y margen */}
            <IconSearch size={16} style={{ marginRight: '5px', verticalAlign: 'middle' }} />
            {/* Texto del botón */}
            Search
        </Button>
    );
};

// Exporta el componente para que pueda ser utilizado en otras partes de la aplicación
export default SearchButton;