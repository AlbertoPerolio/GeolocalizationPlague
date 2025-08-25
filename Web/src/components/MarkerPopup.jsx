import React, {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import ReactDOM from "react-dom/client";
import { Marker } from "react-leaflet";
import L from "leaflet";
import MarkerActions from "./MarkerActions";

// Usa forwardRef para poder pasar una ref al componente
const MarkerPopup = forwardRef(
  ({ marker, user, defaultIcon, onEdit, onDelete, onApprove }, ref) => {
    const markerRef = useRef();
    const rootRef = useRef(null);

    // Expone la función para cerrar el popup
    useImperativeHandle(ref, () => ({
      closePopup() {
        if (markerRef.current) {
          markerRef.current.closePopup();
        }
      },
    }));

    useEffect(() => {
      if (markerRef.current) {
        const popupContentNode = document.createElement("div");
        const root = ReactDOM.createRoot(popupContentNode);
        rootRef.current = root;

        root.render(
          <div>
            <b>{marker.title}</b>
            <br />
            {marker.description}
            <br />
            {marker.imgurl && (
              <img src={marker.imgurl} width="100" alt="Marcador" />
            )}
            <p>Estado: {marker.status}</p>
            <MarkerActions
              marker={marker}
              user={user}
              onEdit={onEdit}
              onDelete={onDelete}
              onApprove={onApprove}
            />
          </div>
        );

        markerRef.current.bindPopup(popupContentNode);

        return () => {
          if (rootRef.current) {
            rootRef.current.unmount();
          }
        };
      }
    }, [marker, user, onEdit, onDelete, onApprove]);

    return (
      <Marker
        position={[marker.lat, marker.lng]}
        icon={defaultIcon}
        ref={markerRef}
      />
    );
  }
);

export default MarkerPopup;
