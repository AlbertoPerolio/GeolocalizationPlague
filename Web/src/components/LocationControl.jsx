import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

function LocationControl() {
  const map = useMap();

  useEffect(() => {
    const locateControl = L.control({ position: "topleft" });
    locateControl.onAdd = () => {
      const btn = L.DomUtil.create("button", "btn-locate");
      btn.innerHTML = "📍";
      btn.onclick = () => {
        if (!navigator.geolocation) {
          return alert("Geolocalización no soportada");
        }
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const { latitude, longitude } = pos.coords;
            map.setView([latitude, longitude], 15);
          },
          (error) => {
            console.error("Error de geolocalización:", error);
            alert(
              "No se pudo obtener la ubicación. Asegúrate de que los servicios de geolocalización estén activados."
            );
          },
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
          }
        );
      };
      return btn;
    };
    locateControl.addTo(map);

    return () => {
      map.removeControl(locateControl);
    };
  }, [map]);

  return null;
}

export default LocationControl;
