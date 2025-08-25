import express from "express";
import multer from "multer";
import {
  createMarker,
  getAllMarkers,
  updateMarker,
  deleteMarker,
  approveMarker,
} from "./controller.js";
import checkOwnershipOrAdmin from "../../middleware/checkOwnershipOrAdmin.js";
import { requireRole } from "../../middleware/role.middleware.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Rutas para los marcadores
router.get("/markers", getAllMarkers);

// Ruta para CREAR un marcador:
// Espera un archivo y datos en el cuerpo de la petición.
router.post(
  "/markers",
  upload.single("image"),
  (req, res, next) => {
    next(); // Pasa al siguiente middleware (createMarker)
  },
  createMarker
);

// ✅ Ruta para ACTUALIZAR un marcador:
//    AHORA usa multer para procesar el archivo si se envía.
router.put(
  "/markers/:idplague",
  checkOwnershipOrAdmin(),
  upload.single("image"),
  (req, res, next) => {
    next(); // Pasa al siguiente middleware (updateMarker)
  },
  updateMarker
);

// ✅ Ruta para ELIMINAR un marcador:
router.delete("/markers/:idplague", checkOwnershipOrAdmin(), deleteMarker);

// ✅ Ruta para APROBAR un marcador:
router.put("/markers/:idplague/approve", requireRole("admin"), approveMarker);

export default router;
