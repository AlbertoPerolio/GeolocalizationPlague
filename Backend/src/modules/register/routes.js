import express from "express";
import { requireRole } from "../../middleware/role.middleware.js";
import checkOwnershipOrAdmin from "../../middleware/checkOwnershipOrAdmin.js";
import * as answers from "../../red/answer.js";
import controller from "./index.js";
import { registerSchema } from "../../schema/auth.schema.js";
import { validateSchema } from "../../middleware/validator.middleware.js";

const router = express.Router();

// Ver todos los usuarios -> solo admin
router.get("/", requireRole("admin"), all);

// Ahora:
router.get("/:id", checkOwnershipOrAdmin, one); // <--- Quita los paréntesis

// 1. RUTA DE CREACIÓN: POST /
// Esta ruta solo crea un usuario. No necesita token.
router.post("/", validateSchema(registerSchema), addCreate);

// 2. RUTA DE ACTUALIZACIÓN: PUT /
// Esta ruta actualiza un usuario y está protegida por un token.
router.put(
  "/",
  validateSchema(registerSchema),
  checkOwnershipOrAdmin,
  addUpdate
);

// Eliminar usuario -> solo admin
router.delete("/", requireRole("admin"), del);

// --- Funciones de tu controlador ---

async function all(req, res, next) {
  try {
    const items = await controller.all();
    answers.success(req, res, items, 200);
  } catch (err) {
    next(err);
  }
}

async function one(req, res, next) {
  try {
    const item = await controller.one(req.params.id);
    answers.success(req, res, item, 200);
  } catch (err) {
    next(err);
  }
}

// Nueva función para CREAR un usuario
async function addCreate(req, res, next) {
  try {
    await controller.add(req.body);
    answers.success(req, res, "Usuario Creado", 201);
  } catch (err) {
    next(err);
  }
}

// Nueva función para ACTUALIZAR un usuario
async function addUpdate(req, res, next) {
  try {
    await controller.add(req.body);
    answers.success(req, res, "Usuario Actualizado", 201);
  } catch (err) {
    next(err);
  }
}

async function del(req, res, next) {
  try {
    await controller.del(req.body);
    answers.success(req, res, "Usuario eliminado", 200);
  } catch (err) {
    next(err);
  }
}

export default router;
