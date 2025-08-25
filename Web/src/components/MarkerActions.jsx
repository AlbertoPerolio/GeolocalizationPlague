// En src/components/MarkerActions.jsx
import React from "react";

const MarkerActions = ({ marker, user, onEdit, onDelete, onApprove }) => {
  if (!user) {
    return null;
  } // Compara la clave del usuario con la clave foránea del marcador

  const canModify = user.role === "admin" || user.id_reg === marker.id_reg; // Si el usuario no puede modificar, no se renderiza nada.

  if (!canModify) {
    return null;
  }

  return (
    <div className="marker-actions">
      {" "}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onEdit(marker.idplague); // Usa idplague, el ID de tu marcador
        }}
      >
        Editar{" "}
      </button>{" "}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(marker.idplague); // Usa idplague, el ID de tu marcador
        }}
      >
        Eliminar{" "}
      </button>{" "}
      {user.role === "admin" && marker.status === "pendiente" && (
        <button onClick={() => onApprove(marker.idplague)}>Aprobar</button>
      )}{" "}
    </div>
  );
};

export default MarkerActions;
