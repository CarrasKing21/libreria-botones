import React, { useState, useEffect, useRef } from 'react';
import { IconLoader } from '@tabler/icons-react';

// Importamos todos los componentes de botón individuales
import SaveButton from "../Button/SaveButton";
import DeleteButton from "../Button/DeleteButton";
import SendButton from "../Button/SendButton";
import CancelButton from "../Button/CancelButton";
import UploadButton from "../Button/UploadButton";
import DownloadButton from "../Button/DownloadButton";
import EditButton from "../Button/EditButton";
import SearchButton from "../Button/SearchButton";
import NextButton from "../Button/NextButton";
import PreviousButton from "../Button/PreviousButton";
import LoadingButton from "../Button/LoadingButton";
import FavouriteButton from "../Button/FavouriteButton";
import CreateButton from "../Button/CreateButton";
import ClearButton from '../Button/ClearButton';

// Componente que encapsula toda la lógica y renderizado de la tabla
const ItemTable = ({ initialItems, initialItemsPerPage, filterByFavourite, filterByHasFile }) => {
  // --- ESTADOS DEL COMPONENTE ---
  const defaultItems = [
    { id: 1, name: "Item 1", favourite: false, uploadedFile: null },
    { id: 2, name: "Item 2", favourite: false, uploadedFile: null },
    { id: 3, name: "Item 3", favourite: false, uploadedFile: null },
  ];

  // Usa los `initialItems` si se proporcionan, si no, usa los `defaultItems`.
  const [items, setItems] = useState(initialItems || defaultItems);

  const [message, setMessage] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  // Nuevo estado para el término de búsqueda que se aplica al pulsar el botón
  const [activeSearchTerm, setActiveSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);
  const [deletingItems, setDeletingItems] = useState([]);
  const [confirmingDeleteId, setConfirmingDeleteId] = useState(null);
  const [sendingItemId, setSendingItemId] = useState(null);
  const [uploadingItemId, setUploadingItemId] = useState(null);
  const fileInputRef = useRef(null);

  // --- EFECTO PARA SINCRONIZAR PROPS ---
  // Si la prop `initialItemsPerPage` cambia desde fuera, actualizamos el estado interno.
  useEffect(() => {
    setItemsPerPage(initialItemsPerPage);
  }, [initialItemsPerPage]);

  // --- LÓGICA DE RENDERIZADO ---
  const filteredItems = items.filter((item) => {
    // 1. Filtro por término de búsqueda (siempre se aplica)
    const searchMatch = item.name.toLowerCase().includes(activeSearchTerm.toLowerCase());
    if (!searchMatch) {
      return false;
    }

    // 2. Lógica para los filtros de checkbox
    const isFavourite = item.favourite === true;
    const hasFile = item.uploadedFile !== null;

    // Si ambos filtros están activos, se aplica una lógica OR
    if (filterByFavourite && filterByHasFile) {
      return isFavourite || hasFile;
    }

    // Si solo uno de los filtros está activo (o ninguno)
    return (!filterByFavourite || isFavourite) && (!filterByHasFile || hasFile);
  });
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // --- MANEJADORES DE EVENTOS (HANDLERS) ---
  const handleCreate = () => {
    const newId = items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1;
    setEditingItem({ id: newId, name: "", favourite: false, uploadedFile: null });
  };

  const handleSave = (item) => {
    if (!item.name.trim()) return;
    const exists = items.find((i) => i.id === item.id);
    if (exists) {
      setItems(items.map((i) => (i.id === item.id ? item : i)));
    } else {
      setItems([...items, item]);
    }
    setEditingItem(null);
    setMessage(`Elemento ${item.id} guardado`);
  };

  const handleCancel = () => setEditingItem(null);

  const handleDelete = (id) => {
    if (confirmingDeleteId === id) {
      setDeletingItems((prev) => [...prev, id]);
      setMessage(`Eliminando elemento ${id}...`);
      setConfirmingDeleteId(null);
      setTimeout(() => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
        setDeletingItems((prev) => prev.filter((deletingId) => deletingId !== id));
        setMessage("");
      }, 500);
    } else {
      setConfirmingDeleteId(id);
      setMessage(`Haz clic de nuevo para confirmar la eliminación del Elemento ${id}.`);
      setTimeout(() => {
        setConfirmingDeleteId((currentId) => (currentId === id ? null : currentId));
      }, 3000);
    }
  };

  const handleEdit = (item) => setEditingItem(item);

  const handleSend = (id) => {
    setSendingItemId(id);
    setMessage(`Enviando elemento ${id}...`);
    setTimeout(() => {
      setSendingItemId(null);
      setMessage(`¡Elemento ${id} enviado con éxito!`);
    }, 2000);
  };

  const handleUpload = (id) => {
    setUploadingItemId(id);
    fileInputRef.current.click();
  };

  const handleFileSelected = (e) => {
    const file = e.target.files[0];
    if (file && uploadingItemId) {
      const fileUrl = URL.createObjectURL(file);
      setItems(prevItems =>
        prevItems.map(item =>
          item.id === uploadingItemId
            ? { ...item, uploadedFile: { name: file.name, url: fileUrl } }
            : item
        )
      );
      setMessage(`Archivo "${file.name}" asociado al Elemento ${uploadingItemId}.`);
    }
    e.target.value = null;
    setUploadingItemId(null);
  };

  const handleDownload = (item) => {
    if (!item.uploadedFile) return;
    const link = document.createElement('a');
    link.href = item.uploadedFile.url;
    link.download = item.uploadedFile.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setMessage(`Descargando "${item.uploadedFile.name}"...`);
  };

  const handleRemoveFile = (id) => {
    setItems(prevItems =>
      prevItems.map(item => (item.id === id ? { ...item, uploadedFile: null } : item))
    );
    setMessage(`Archivo desvinculado del Elemento ${id}.`);
  };

  const handleFavourite = (id) => {
    setItems(prevItems =>
      prevItems.map(item => {
        if (item.id === id) {
          const isNowFavourite = !item.favourite;
          setMessage(`Elemento ${id} ${isNowFavourite ? "marcado" : "desmarcado"} como favorito`);
          return { ...item, favourite: isNowFavourite };
        }
        return item;
      })
    );
  };

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  // Nuevo manejador para el clic del botón de búsqueda
  const handleSearchClick = () => {
    setActiveSearchTerm(searchTerm);
    setCurrentPage(1); // Reinicia a la primera página en cada nueva búsqueda
    setMessage(`Resultados para "${searchTerm}"`);
  };
  const handleNextPage = () => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));

  // Nuevo manejador para limpiar la búsqueda
  const handleClearSearch = () => {
    setSearchTerm("");
    setActiveSearchTerm("");
    setCurrentPage(1);
  };
  const handleLoading = () => {
    window.location.reload();
  };
  const handlePrevPage = () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));

  // --- EFECTOS ---
  useEffect(() => {
    if (paginatedItems.length === 0 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [paginatedItems, currentPage]);

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(""), 3000);
    return () => clearTimeout(timer);
  }, [message]);

  return (
    <>
      {/* Input oculto para la subida de archivos */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileSelected}
      />

      {/* Barra de herramientas superior */}
      <div className="top-bar">
        <div className="create-container">
          <CreateButton onClick={handleCreate} />
        </div>
        <div className="search-loading">
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <SearchButton onClick={handleSearchClick} />
          {/* El botón de limpiar solo aparece si hay una búsqueda activa */}
          {activeSearchTerm && <ClearButton onClick={handleClearSearch} title="Limpiar búsqueda" />}
          <LoadingButton onClick={handleLoading} />
        </div>
      </div>

      {/* Área para mostrar mensajes de feedback */}
      <p className={`message ${message ? 'visible' : ''}`}>{message}</p>

      {/* Tabla de items */}
      <div className="table-container">
        {editingItem && !items.find((i) => i.id === editingItem.id) && (
          <div className="table-row">
            <input
              type="text"
              value={editingItem.name}
              onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
              style={{ flexGrow: 1, padding: "3px" }}
              autoFocus
            />
            <SaveButton onClick={() => handleSave(editingItem)} />
            <CancelButton onClick={handleCancel} />
          </div>
        )}

        {paginatedItems.map((item) => (
          <div
            key={item.id}
            className={`table-row ${deletingItems.includes(item.id) ? "fade-out" : ""}`}
          >
            {editingItem && editingItem.id === item.id ? (
              <>
                <input
                  type="text"
                  value={editingItem.name}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  style={{ flexGrow: 1, padding: "3px" }}
                  autoFocus
                />
                <SaveButton onClick={() => handleSave(editingItem)} />
                <CancelButton onClick={handleCancel} />
              </>
            ) : (
              <>
                <span className="item-name">{item.name}</span>
                <EditButton onClick={() => handleEdit(item)} title="Editar nombre del item" />
                <UploadButton onClick={() => handleUpload(item.id)} title="Subir un archivo para este item" />
                <DownloadButton onClick={() => handleDownload(item)} disabled={!item.uploadedFile} title="Descargar el archivo asociado" />
                <FavouriteButton
                  onClick={() => handleFavourite(item.id)}
                  active={item.favourite}
                  title={item.favourite ? "Quitar de favoritos" : "Marcar como favorito"}
                />
                <SendButton
                  onClick={() => handleSend(item.id)}
                  disabled={sendingItemId === item.id}
                  title="Enviar este item"
                >
                  {sendingItemId === item.id ? (
                    <><IconLoader className="spin" size={16} style={{ marginRight: '5px' }} /> Enviando...</>
                  ) : (
                    "Enviar"
                  )}
                </SendButton>
                <DeleteButton
                  isConfirming={confirmingDeleteId === item.id}
                  onClick={() => handleDelete(item.id)}
                  title="Eliminar este item"
                />
                {item.uploadedFile && (
                  <div className="file-info">
                    <span className="file-name">{item.uploadedFile.name}</span>
                    <DeleteButton
                      size="small"
                      onClick={() => handleRemoveFile(item.id)}
                      title="Quitar archivo asociado"
                    />
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      {/* Controles de paginación */}
      {totalPages > 1 && (
        <div className="pagination">
          <PreviousButton
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          />
          <span>
            Página {currentPage} de {totalPages}
          </span>
          <NextButton
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          />
        </div>
      )}
    </>
  );
};

export default ItemTable;