import jwt from "jsonwebtoken";
import config from "../config.js";
import createError from "./errors.js";
import PlagueReport from "../models/plague_report.js"; // ✅ Importa el modelo

const checkOwnershipOrAdmin = () => async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      throw createError("Token no proporcionado", 401);
    }

    const decoded = jwt.verify(token, config.jwt.secret);
    req.user = decoded;

    // Si el usuario es un administrador, le da acceso inmediatamente.
    if (decoded.role === "admin") {
      return next();
    }

    // Si no es admin, verifica si es el dueño del marcador
    const targetIdplague = req.params.idplague;

    if (targetIdplague) {
      const marker = await PlagueReport.findByPk(targetIdplague);

      if (!marker) {
        throw createError("Marcador no encontrado", 404);
      }

      // Compara el id_reg del usuario con el del marcador de la DB
      // ✅ Asegúrate de convertir a número para una comparación correcta
      if (decoded.id_reg === parseInt(marker.id_reg, 10)) {
        return next(); // ¡El usuario es el dueño!
      }
    }

    // Si no es admin y no es el dueño (o si no hay id en la URL), deniega el acceso
    throw createError("No tienes privilegios para realizar esta acción", 403);
  } catch (err) {
    let statusCode = 500;
    let message = "Error interno del servidor";

    if (err) {
      if (err instanceof jwt.TokenExpiredError) {
        statusCode = 401;
        message = "Token expirado, por favor inicie sesión de nuevo.";
      } else if (err instanceof jwt.JsonWebTokenError) {
        statusCode = 401;
        message = "Token inválido.";
      } else if (err.status) {
        statusCode = err.status;
        message = err.message;
      } else if (err.message) {
        message = err.message;
      }
    }

    return res.status(statusCode).json({ error: true, mensaje: message });
  }
};

export default checkOwnershipOrAdmin;
