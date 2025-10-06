import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Importa el nuevo componente para mostrar ejemplos
import ComponentShowcase from '../components/ComponentShowcase';

// Importa los botones que quieres documentar
import Button from '../components/Button/Button';
import SaveButton from '../components/Button/SaveButton';
import CancelButton from '../components/Button/CancelButton';
import DeleteButton from '../components/Button/DeleteButton';
import FilterButton from '../components/Button/FilterButton';
import SettingsButton from '../components/Button/SettingsButton';
import CreateButton from '../components/Button/CreateButton';
import EditButton from '../components/Button/EditButton';
import UploadButton from '../components/Button/UploadButton';
import DownloadButton from '../components/Button/DownloadButton';
import FavouriteButton from '../components/Button/FavouriteButton';
import LoadingButton from '../components/Button/LoadingButton';

// Importa los estilos del showcase
import '../components/ComponentShowcase.css';

function DocsPage({ theme }) {
  // Estado para el ejemplo interactivo del botón de eliminar
  const [isDeleting, setIsDeleting] = useState(false);
  // Estado para el ejemplo interactivo del botón de favorito
  const [isFavourited, setIsFavourited] = useState(false);

  // Define los strings de código para cada ejemplo
  const buttonCode = `const handleClick = () => {\n  // Aquí va tu lógica\n};\n\n<Button variant="primary" onClick={handleClick}>\n  Botón Primario\n</Button>`;
  const saveButtonCode = `const handleSave = () => {\n  // Aquí va tu lógica para guardar\n};\n\n<SaveButton onClick={handleSave} />`;
  const cancelButtonCode = `const handleCancel = () => {\n  // Aquí va tu lógica para cancelar\n};\n\n<CancelButton onClick={handleCancel} />`;
  const deleteButtonCode = `const [isConfirming, setIsConfirming] = useState(false);

const handleConfirmDelete = () => {
  // Aquí va tu lógica para eliminar el elemento
  // Ejemplo: api.deleteItem(itemId).then(...);
  setIsConfirming(false); // Resetea el estado del botón
};

<DeleteButton
  isConfirming={isConfirming}
  onClick={() => {
    if (isConfirming) {
      handleConfirmDelete();
    } else {
      setIsConfirming(true); // Activa el modo de confirmación
    }
  }}
/>`;
  const uiButtonsCode = `const openFilters = () => {\n  // Lógica para abrir el modal de filtros\n};\n\nconst openSettings = () => {\n  // Lógica para abrir el modal de ajustes\n};\n\n<FilterButton onClick={openFilters} />\n<SettingsButton onClick={openSettings} />`;
  const createEditCode = `const handleCreate = () => {\n  // Lógica para mostrar el formulario de creación\n};\n\nconst handleEdit = () => {\n  // Lógica para mostrar el formulario de edición\n};\n\n<CreateButton onClick={handleCreate} />\n<EditButton onClick={handleEdit} />`;
  const uploadDownloadCode = `const handleUpload = () => {\n  // Lógica para abrir el selector de archivos\n};\n\nconst handleDownload = () => {\n  // Lógica para iniciar la descarga de un archivo\n};\n\n<UploadButton onClick={handleUpload} />\n<DownloadButton onClick={handleDownload} />`;
  const favouriteCode = `const [isFavourited, setIsFavourited] = useState(false);\n\n<FavouriteButton\n  active={isFavourited}\n  onClick={() => setIsFavourited(prev => !prev)}\n/>`;
  const loadingCode = `const handleReload = () => {\n  // Lógica para recargar los datos\n};\n\n<LoadingButton onClick={handleReload} />`;

  return (
    <div className={`app-container theme-${theme}`}>
      <nav style={{ marginBottom: '20px' }}>
        <Link to="/" style={{ color: 'var(--text-color)', textDecoration: 'underline' }}>Volver a la Aplicación</Link>
      </nav>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1>Documentación de Componentes</h1>
        <p style={{ color: 'var(--text-color-secondary)' }}>
          Aquí encontrarás ejemplos de los componentes de botón disponibles en la librería, listos para copiar y pegar.
        </p>
      </div>

      {/* Ejemplo para el Botón Básico */}
      <ComponentShowcase
        title="Botón Básico"
        description="El componente `Button` es la base de todos los demás. Acepta `variant`, `size` y otras props estándar."
        code={buttonCode}
        theme={theme}
      >
        <Button variant="primary" onClick={() => alert('Clic!')}>Botón Primario</Button>
        <Button variant="secondary" onClick={() => alert('Clic!')}>Secundario</Button>
        <Button variant="outline" onClick={() => alert('Clic!')}>Outline</Button>
      </ComponentShowcase>

      {/* Ejemplo para Botones de Acción Comunes */}
      <ComponentShowcase
        title="Botones de Acción"
        description="Componentes pre-configurados para acciones comunes como Guardar, Cancelar y Eliminar."
        code={`${saveButtonCode}\n${cancelButtonCode}\n${deleteButtonCode}`}
        theme={theme}
      >
        <SaveButton onClick={() => alert('Guardando...')} />
        <CancelButton onClick={() => alert('Cancelando...')} />
        {/* Ejemplo interactivo del botón de eliminar */}
        <DeleteButton
          isConfirming={isDeleting}
          onClick={() => {
            if (isDeleting) {
              alert('¡Elemento eliminado!');
              setIsDeleting(false);
            } else {
              setIsDeleting(true);
              setTimeout(() => setIsDeleting(false), 3000); // Resetea después de 3s
            }
          }}
        />
      </ComponentShowcase>

      {/* Ejemplo para Botones de Interfaz */}
      <ComponentShowcase title="Botones de Interfaz" description="Botones para controlar elementos de la UI como filtros y ajustes." code={uiButtonsCode} theme={theme}>
        <FilterButton onClick={() => alert('Abriendo filtros...')} />
        <SettingsButton onClick={() => alert('Abriendo ajustes...')} />
      </ComponentShowcase>

      {/* Ejemplo para Botones de Creación y Edición */}
      <ComponentShowcase title="Creación y Edición" description="Botones para iniciar flujos de creación o edición de elementos." code={createEditCode} theme={theme}>
        <CreateButton onClick={() => alert('Creando...')} />
        <EditButton onClick={() => alert('Editando...')} />
      </ComponentShowcase>

      {/* Ejemplo para Botones de Archivos */}
      <ComponentShowcase title="Gestión de Archivos" description="Botones para subir y descargar archivos." code={uploadDownloadCode} theme={theme}>
        <UploadButton onClick={() => alert('Abriendo selector de archivos...')} />
        <DownloadButton onClick={() => alert('Iniciando descarga...')} />
      </ComponentShowcase>

      {/* Ejemplo para Botón de Estado (Favorito) */}
      <ComponentShowcase title="Botón de Estado: Favorito" description="Un ejemplo de botón que cambia visualmente según una prop booleana 'active'." code={favouriteCode} theme={theme}>
        <FavouriteButton
          active={isFavourited}
          onClick={() => setIsFavourited(prev => !prev)}
          title={isFavourited ? "Quitar de favoritos" : "Marcar como favorito"}
        />
      </ComponentShowcase>

      {/* Ejemplo para Botón de Recarga */}
      <ComponentShowcase
        title="Botón de Recarga"
        description="Un botón con un icono específico para acciones de recarga o refresco."
        code={loadingCode}
        theme={theme}
      >
        <LoadingButton onClick={() => alert('Recargando...')} />
      </ComponentShowcase>
    </div>
  );
}

export default DocsPage;