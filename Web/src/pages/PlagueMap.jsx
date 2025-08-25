import { useEffect, useState, useRef, useCallback } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder";
import L from "leaflet";
import { useAuth } from "../context/AuthContext";
import "../styles/PlagueMap.css";

import GeocoderControl from "../components/GeocoderControl";
import LocationControl from "../components/LocationControl";
import MarkerForm from "../components/MarkerForm";
import MarkerPopup from "../components/MarkerPopup";
import MapClickHandler from "../components/MapClickHandler";

// Importa las funciones de la API
import {
  getMarkersRequest,
  createMarkerRequest,
  updateMarkerRequest,
  deleteMarkerRequest,
  approveMarkerRequest, // ✅ Asegúrate de importar la nueva función
} from "../api/markers";

const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function PlagueMap() {
  const { user } = useAuth();
  const [markers, setMarkers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newMarkerPosition, setNewMarkerPosition] = useState(null);
  const [temporaryMarker, setTemporaryMarker] = useState(null);
  const [editingMarker, setEditingMarker] = useState(null);
  const popupRefs = useRef({});

  // Función para obtener los marcadores desde la API
  const fetchMarkers = useCallback(async () => {
    try {
      const response = await getMarkersRequest();
      const filteredMarkers = response.data.filter((m) =>
        !user
          ? m.status === "aprobado"
          : user.role === "admin"
          ? true
          : m.status === "aprobado" || m.id_reg === user.id_reg
      );
      setMarkers(filteredMarkers);
    } catch (error) {
      console.error("Error al obtener los marcadores:", error);
    }
  }, [user]);

  useEffect(() => {
    fetchMarkers();
  }, [fetchMarkers]);

  // Manejador para la creación de marcadores
  const handleAddMarkerFromForm = async (newMarkerData) => {
    try {
      const response = await createMarkerRequest(newMarkerData);
      setMarkers((prev) => [...prev, response.data]);
      setShowForm(false);
      setTemporaryMarker(null);
    } catch (error) {
      console.error("Error al crear el marcador:", error);
    }
  };

  // Manejador para la edición de marcadores
  const handleEdit = async (idplague) => {
    if (popupRefs.current[idplague]) {
      popupRefs.current[idplague].closePopup();
    }
    const markerToEdit = markers.find((marker) => marker.idplague === idplague);
    if (markerToEdit) {
      setEditingMarker(markerToEdit);
      setNewMarkerPosition({
        // Convierte las cadenas a números antes de pasarlas a MarkerForm
        lat: parseFloat(markerToEdit.lat),
        lng: parseFloat(markerToEdit.lng),
      });
      setShowForm(true);
    }
  };

  // Manejador para la eliminación de marcadores
  const handleDelete = async (idplague) => {
    try {
      await deleteMarkerRequest(idplague);
      setMarkers(markers.filter((marker) => marker.idplague !== idplague));
    } catch (error) {
      console.error("Error al eliminar el marcador:", error);
    }
  };

  // Manejador para la aprobación de marcadores
  const handleApprove = async (idplague) => {
    try {
      const response = await approveMarkerRequest(idplague);
      setMarkers(
        markers.map((marker) =>
          marker.idplague === idplague
            ? { ...marker, status: response.data.status }
            : marker
        )
      );
    } catch (error) {
      console.error("Error al aprobar el marcador:", error);
    }
  };

  // Manejador para la actualización de marcadores
  const handleUpdateMarker = async (idplague, updatedMarkerData) => {
    try {
      const response = await updateMarkerRequest(idplague, updatedMarkerData);
      setMarkers(
        markers.map((marker) =>
          marker.idplague === response.data.idplague ? response.data : marker
        )
      );
      setEditingMarker(null);
      setShowForm(false);
    } catch (error) {
      console.error("Error al actualizar el marcador:", error);
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setNewMarkerPosition(null);
    setTemporaryMarker(null);
    setEditingMarker(null);
  };

  return (
    <div className="plague-map-wrapper">
      <MapContainer center={[-22.2437, -63.7342]} zoom={15} className="map">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeocoderControl />
        <LocationControl />
        <MapClickHandler
          user={user}
          setShowForm={setShowForm}
          setNewMarkerPosition={setNewMarkerPosition}
          setTemporaryMarker={setTemporaryMarker}
        />
        {temporaryMarker && (
          <Marker position={temporaryMarker} icon={defaultIcon} />
        )}
        {markers.map((marker) => (
          <MarkerPopup
            key={marker.idplague}
            marker={marker}
            user={user}
            defaultIcon={defaultIcon}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onApprove={handleApprove}
            ref={(el) => (popupRefs.current[marker.idplague] = el)}
          />
        ))}
      </MapContainer>
      {showForm && (
        <MarkerForm
          position={newMarkerPosition}
          user={user}
          markerToEdit={editingMarker}
          onClose={handleFormClose}
          onAddMarker={handleAddMarkerFromForm}
          onUpdateMarker={handleUpdateMarker}
        />
      )}
    </div>
  );
}

export default PlagueMap;
