import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom'; // Nuevo: Importar Link para navegación
import Button from '../components/Button/Button';

// Importamos todos los componentes de botón individuales
// Cada uno tiene su propio comportamiento visual y funcional.
import CancelButton from '../components/Button/CancelButton';
import SaveButton from '../components/Button/SaveButton';
// Importamos los nuevos botones
import FilterButton from "../components/Button/FilterButton";
import SettingsButton from "../components/Button/SettingsButton";
// Importamos los iconos para la nueva galería de formato
import {
  IconBold,
  IconItalic,
  IconUnderline,
  IconLink,
  IconList,
} from "@tabler/icons-react";
// Importamos el nuevo componente Accordion
import Accordion from "../components/Accordion/Accordion";
// Importamos el nuevo componente Modal
import Modal from "../components/Modal/Modal";
// Importamos el nuevo componente de la tabla
import ItemTable from '../components/Table/ItemTable';

// No necesitamos importar los estilos globales aquí, App.jsx ya los importa.
// import "../App.css";
// import "../components/Accordion/Accordion.css";
// import "../components/Modal/Modal.css";
// import "../components/Button/Button.css";

// ------------------------------
// COMPONENTE PRINCIPAL DE CONTENIDO
// ------------------------------
function MainContent({ theme, setTheme }) { // Recibe theme y setTheme como props
  // --- ESTADOS DEL COMPONENTE ---
  // El estado es la "memoria" del componente. Usamos `useState` para que React
  // vuelva a renderizar la vista cuando estos valores cambian.

  // `isFilterModalOpen`: Controla la visibilidad del modal de filtros.
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // `isSettingsModalOpen`: Controla la visibilidad del modal de ajustes.
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  // `isLinkModalOpen`: Controla la visibilidad del modal para añadir un enlace.
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);

  // `currentUrl`: Almacena la URL introducida en el modal de enlace.
  const [currentUrl, setCurrentUrl] = useState('');

  // `filterByFavourite`: Controla si la tabla debe filtrar por favoritos.
  const [filterByFavourite, setFilterByFavourite] = useState(false);

  // `filterByHasFile`: Controla si la tabla debe filtrar por items con archivo.
  const [filterByHasFile, setFilterByHasFile] = useState(false);

  // Estados temporales para el modal de filtros
  const [tempFilterByFavourite, setTempFilterByFavourite] = useState(filterByFavourite);
  const [tempFilterByHasFile, setTempFilterByHasFile] = useState(filterByHasFile);

  // `itemsPerPage`: Define cuántos elementos se mostrarán por página.
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [tempItemsPerPage, setTempItemsPerPage] = useState(itemsPerPage);
  const [tempTheme, setTempTheme] = useState(theme); // Usa el theme inicial de las props

  // `openAccordion`: Controla cuál de los acordeones anidados está abierto.
  const [openAccordion, setOpenAccordion] = useState(null);

  // `message`: Estado para mostrar mensajes de feedback de la galería.
  const [message, setMessage] = useState("");

  // `textFormats`: Unifica el estado de todos los formatos de texto en un solo objeto.
  const [textFormats, setTextFormats] = useState({
    bold: false,
    italic: false,
    underline: false,
    link: null, // Ahora almacenará la URL del enlace, o null si no hay enlace.
    list: false,
  });

  // --- MANEJADORES PARA BOTONES DE GALERÍA ---

  // Manejador para abrir el modal de filtros
  const handleFilterClick = () => {
    // Sincroniza los filtros temporales con los activos al abrir el modal
    setTempFilterByFavourite(filterByFavourite);
    setTempFilterByHasFile(filterByHasFile);
    setIsFilterModalOpen(true);
  };

  const handleApplyFilters = () => {
    setFilterByFavourite(tempFilterByFavourite);
    setFilterByHasFile(tempFilterByHasFile);
    setIsFilterModalOpen(false);
  };

  // Manejador para limpiar los filtros en el modal
  const handleClearModalFilters = () => {
    setTempFilterByFavourite(false);
    setTempFilterByHasFile(false);
  };

  // Manejador para el botón de Ajustes
  const handleSettingsClick = () => {
    setTempItemsPerPage(itemsPerPage); // Sincroniza el estado temporal con el actual
    setTempTheme(theme);               // Sincroniza el tema temporal con el actual
    setIsSettingsModalOpen(true);      // Abre el modal de ajustes
  };

  // Manejador para guardar los ajustes del modal
  const handleSaveSettings = () => {
    // Asegura que el valor sea un número válido y mayor que cero
    const newItemsPerPageValue = Number(tempItemsPerPage);
    if (!isNaN(newItemsPerPageValue) && newItemsPerPageValue > 0) {
      setItemsPerPage(newItemsPerPageValue);
      setTheme(tempTheme); // Aplica el nuevo tema (viene de las props)
    }
    setIsSettingsModalOpen(false); // Cierra el modal
  };

  // --- EFECTO PARA LIMPIAR EL MENSAJE ---
  // Limpia el mensaje después de 3 segundos.
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // --- MANEJADORES PARA LA GALERÍA DE FORMATO ---

  // Manejador genérico para alternar los formatos de texto.
  const toggleTextFormat = useCallback((format) => {
    setTextFormats(prevFormats => {
      const isActivating = !prevFormats[format];
      let newFormats;

      // Lógica específica para el botón de enlace
      if (format === 'link') {
        if (prevFormats.link) {
          // Si ya hay un enlace, lo quitamos
          newFormats = { ...prevFormats, link: null };
        } else {
          // Si no hay enlace, abrimos el modal para crearlo
          setCurrentUrl('https://'); // Pre-rellena el input
          setIsLinkModalOpen(true);
          return prevFormats; // No cambiamos el estado todavía
        }
      }
      // Si se activa el modo lista, desactivamos los demás formatos.
      if (format === 'list' && isActivating) {
        newFormats = { bold: false, italic: false, underline: false, link: null, list: true };
      } else if (format !== 'list' && prevFormats.list) {
        // Si el modo lista está activo y se pulsa otro botón, desactivamos la lista y activamos el nuevo formato.
        newFormats = { ...prevFormats, list: false, [format]: true };
      } else {
        // Comportamiento normal para los demás casos.
        newFormats = { ...prevFormats, [format]: isActivating };
      }

      // Nombres amigables para los mensajes
      const formatNames = {
        bold: 'negrita',
        italic: 'cursiva',
        underline: 'subrayado',
        link: 'enlace',
        list: 'lista',
      };

      const status = newFormats[format] ? (format === 'link' ? 'añadido' : 'aplicado') : 'quitado';
      setMessage(format === 'link' ? `Enlace ${status}.` : `Formato ${formatNames[format]} ${status}.`);

      return newFormats;
    });
  }, [setMessage]); // Dependencias de useCallback

  // Manejador para guardar la URL del modal de enlace
  const handleSetLink = () => {
    if (currentUrl && currentUrl !== 'https://') {
      setTextFormats(prev => ({ ...prev, link: currentUrl }));
      setMessage('Enlace añadido.');
    }
    setIsLinkModalOpen(false);
  };

  // --- EFECTO PARA LOS ATAJOS DE TECLADO ---
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Comprueba si se presiona Ctrl (Windows/Linux) o Cmd (Mac)
      if (event.ctrlKey || event.metaKey) {
        const key = event.key.toLowerCase();

        // Manejo especial para el atajo de enlace (Ctrl+K)
        if (key === 'k') {
          event.preventDefault();
          setCurrentUrl(textFormats.link || 'https://'); // Rellena con la URL actual o el valor por defecto
          setIsLinkModalOpen(true);
          return; // Termina la ejecución aquí para el caso 'k'
        }

        // Manejo para los otros atajos de formato
        switch (event.key.toLowerCase()) {
          case 'b':
          case 'i':
          case 'u':
            event.preventDefault(); // Previene la acción por defecto del navegador
            toggleTextFormat({ b: 'bold', i: 'italic', u: 'underline' }[key]);
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Limpia el event listener cuando el componente se desmonta
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [toggleTextFormat, textFormats.link]); // Añadimos textFormats.link a las dependencias

  // --- RENDERIZADO DEL COMPONENTE (JSX) ---
  return (
    <div className={`app-container theme-${theme}`}>
      <nav style={{ marginBottom: '20px' }}>
        <Link to="/docs" style={{ color: 'var(--text-color)', textDecoration: 'underline' }}>Ir a Documentación</Link>
      </nav>

      {/* Renderizamos el componente de la tabla, pasándole los items por página */}
      <ItemTable
        initialItemsPerPage={itemsPerPage}
        filterByFavourite={filterByFavourite}
        filterByHasFile={filterByHasFile}
      />

      {/* Área para mostrar mensajes de feedback de la galería */}
      <p className={`message ${message ? 'visible' : ''}`}>{message}</p>

      {/* Acordeón para mostrar una galería de botones adicionales */}
      <Accordion title="Galería de Botones Adicionales">
        {/* Acordeón anidado para botones de UI */}
        <Accordion
          title="Botones de Interfaz"
          isOpen={openAccordion === 'interfaz'}
          onToggle={() => setOpenAccordion(openAccordion === 'interfaz' ? null : 'interfaz')}
        >
          <div className="button-gallery">
            <p>Botones para controlar elementos de la interfaz de usuario.</p>
            <div className="gallery-row">
              <FilterButton onClick={handleFilterClick} />
              <SettingsButton onClick={handleSettingsClick} />
            </div>
          </div>
        </Accordion>

        {/* Acordeón anidado para botones de Formato de Texto */}
        <Accordion
          title="Botones de Formato"
          isOpen={openAccordion === 'formato'}
          onToggle={() => setOpenAccordion(openAccordion === 'formato' ? null : 'formato')}
        >
          <div className="button-gallery">
            {/* Construimos las clases dinámicamente para el texto de ejemplo */}
            <div
              className={[
                'format-demo',
                textFormats.bold ? 'text-bold' : '',
                textFormats.italic ? 'text-italic' : '',
                textFormats.underline ? 'text-underline' : ''
              ].filter(Boolean).join(' ')}
            >
              {textFormats.list ? (
                <ul>
                  <li>Primer elemento de la lista.</li>
                  <li>Segundo elemento de la lista.</li>
                  <li>Tercer elemento de la lista.</li>
                </ul>
              ) : (
                <p>
                  {textFormats.link ? (
                    <a href={textFormats.link} target="_blank" rel="noopener noreferrer">
                      Este es un texto de ejemplo para probar el formato.
                    </a>
                  ) : (
                    'Este es un texto de ejemplo para probar el formato.'
                  )}
                </p>
              )}
            </div>
            <p>Botones para una barra de herramientas de edición de texto.</p>
            <div className="gallery-row">
              <Button
                variant={textFormats.bold ? 'primary' : 'outline'}
                size="small"
                onClick={() => toggleTextFormat('bold')}
                title={textFormats.bold ? "Quitar negrita (Ctrl+B)" : "Aplicar negrita (Ctrl+B)"}
              ><IconBold size={16} /></Button>
              <Button
                variant={textFormats.italic ? 'primary' : 'outline'}
                size="small"
                onClick={() => toggleTextFormat('italic')}
                title={textFormats.italic ? "Quitar cursiva (Ctrl+I)" : "Aplicar cursiva (Ctrl+I)"}
              ><IconItalic size={16} /></Button>
              <Button
                variant={textFormats.underline ? 'primary' : 'outline'}
                size="small"
                onClick={() => toggleTextFormat('underline')}
                title={textFormats.underline ? "Quitar subrayado (Ctrl+U)" : "Aplicar subrayado (Ctrl+U)"}
              ><IconUnderline size={16} /></Button>
              <Button
                variant={textFormats.link ? 'primary' : 'outline'}
                size="small"
                onClick={() => toggleTextFormat('link')}
                title={textFormats.link ? "Quitar enlace" : "Crear enlace (Ctrl+K)"}
              ><IconLink size={16} /></Button>
              <Button variant={textFormats.list ? 'primary' : 'outline'} size="small" onClick={() => toggleTextFormat('list')} title={textFormats.list ? "Quitar formato de lista" : "Convertir en lista"}><IconList size={16} /></Button>
            </div>
          </div>
        </Accordion>

      </Accordion>

      {/* Modal de Filtros */}
      {/* Se renderiza aquí pero es invisible hasta que `isFilterModalOpen` es true */}
      <Modal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        title="Opciones de Filtro"
      >
        <div className="filter-options">
          <label>
            <input
              type="checkbox"
              checked={tempFilterByFavourite}
              onChange={(e) => setTempFilterByFavourite(e.target.checked)}
            />
            Mostrar solo favoritos
          </label>
          <label>
            <input
              type="checkbox"
              checked={tempFilterByHasFile}
              onChange={(e) => setTempFilterByHasFile(e.target.checked)}
            />
            Mostrar solo con archivo
          </label>
        </div>
        <div className="modal-actions">
          {/* Este botón limpia los checkboxes del modal */}
          <Button variant="outline" onClick={handleClearModalFilters}>
            Limpiar
          </Button>
          <SaveButton onClick={handleApplyFilters}>Aplicar Filtros</SaveButton>
        </div>
      </Modal>

      {/* Modal de Ajustes */}
      <Modal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        title="Ajustes de la Aplicación"
      >
        <div className="settings-form">
          <div>
            <label htmlFor="items-per-page-input">Items por página:</label>
            <input
              id="items-per-page-input"
              type="number"
              value={tempItemsPerPage}
              onChange={(e) => setTempItemsPerPage(e.target.value)}
              min="1"
            />
          </div>
          <div>
            <label htmlFor="theme-select">Tema:</label>
            <select id="theme-select" value={tempTheme} onChange={(e) => setTempTheme(e.target.value)}>
              <option value="dark">Oscuro</option>
              <option value="light">Claro</option>
            </select>
          </div>
        </div>
        <div className="modal-actions">
          <CancelButton onClick={() => setIsSettingsModalOpen(false)}>Cancelar</CancelButton>
          <SaveButton onClick={handleSaveSettings}>Guardar Ajustes</SaveButton>
        </div>
      </Modal>

      {/* Modal para añadir URL de enlace */}
      <Modal
        isOpen={isLinkModalOpen}
        onClose={() => setIsLinkModalOpen(false)}
        title="Crear Enlace"
      >
        <div className="settings-form">
          <div>
            <label htmlFor="url-input">URL del enlace:</label>
            <input
              id="url-input"
              type="text"
              value={currentUrl}
              onChange={(e) => setCurrentUrl(e.target.value)}
              placeholder="https://ejemplo.com"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSetLink();
                }
              }}
            />
          </div>
        </div>
        <div className="modal-actions">
          <CancelButton onClick={() => setIsLinkModalOpen(false)}>Cancelar</CancelButton>
          <SaveButton onClick={handleSetLink}>Guardar Enlace</SaveButton>
        </div>
      </Modal>
    </div>
  );
}

export default MainContent;