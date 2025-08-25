import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
// ❌ ¡Elimina estas importaciones! La llamada a la API la hace el componente padre.
// import { createMarkerRequest, updateMarkerRequest } from "../api/markers";

function MarkerForm({
  position,
  onClose,
  onAddMarker,
  onUpdateMarker,
  markerToEdit,
}) {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const lat = position ? position.lat : "";
  const lng = position ? position.lng : "";

  useEffect(() => {
    if (markerToEdit) {
      setTitle(markerToEdit.title);
      setDescription(markerToEdit.description);
    } else {
      setTitle("");
      setDescription("");
      setImage(null);
    }
  }, [markerToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (markerToEdit) {
        // Lógica para ACTUALIZAR un marcador
        if (image) {
          // Si el usuario selecciona una nueva imagen, usamos FormData
          const updateFormData = new FormData();
          updateFormData.append("title", title);
          updateFormData.append("description", description);
          updateFormData.append("image", image);
          // ✅ Pasa los datos al componente padre a través del prop
          await onUpdateMarker(markerToEdit.idplague, updateFormData);
        } else {
          // Si no hay nueva imagen, enviamos solo los datos como JSON
          const updateData = {
            title: title,
            description: description,
          };
          // ✅ Pasa los datos al componente padre a través del prop
          await onUpdateMarker(markerToEdit.idplague, updateData);
        }
      } else {
        // Lógica para CREAR un nuevo marcador
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("id_reg", user.id_reg);
        formData.append("status", "pendiente");
        formData.append("lat", lat);
        formData.append("lng", lng);

        if (image) {
          formData.append("image", image);
        } else {
          throw new Error("Por favor, sube una imagen para crear un marcador.");
        }
        // ✅ Pasa los datos al componente padre a través del prop
        await onAddMarker(formData);
      }
      onClose();
    } catch (err) {
      console.error(err);
      setError("Error al guardar el marcador. Por favor, intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="marker-form">
      <h3>{markerToEdit ? "Editar marcador" : "Nuevo marcador"}</h3>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <p>Latitud: {position ? lat.toFixed(4) : "Selecciona una ubicación"}</p>
        <p>
          Longitud: {position ? lng.toFixed(4) : "Selecciona una ubicación"}
        </p>
        <button type="submit" disabled={loading}>
          {loading
            ? "Cargando..."
            : markerToEdit
            ? "Guardar cambios"
            : "Agregar"}
        </button>
        <button type="button" onClick={onClose} disabled={loading}>
          Cancelar
        </button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default MarkerForm;
