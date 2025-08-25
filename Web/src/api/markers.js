import axios from "./axios";

// Petición para obtener todos los marcadores
export const getMarkersRequest = () => axios.get("/markers");

// Petición para crear un nuevo marcador
export const createMarkerRequest = (markerData) =>
  axios.post("/markers", markerData);

// Petición para actualizar un marcador
export const updateMarkerRequest = (markerId, markerData) =>
  axios.put(`/markers/${markerId}`, markerData);

// Petición para aprobar un marcador
export const approveMarkerRequest = (markerId) =>
  axios.put(`/markers/${markerId}/approve`);

// Petición para eliminar un marcador
export const deleteMarkerRequest = (markerId) =>
  axios.delete(`/markers/${markerId}`);
