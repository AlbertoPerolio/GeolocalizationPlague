import express from "express";
import controller from "./index.js";
import { validateSchema } from "../../middleware/validator.middleware.js";
import jwt from "jsonwebtoken";
import config from "../../config.js";
import { loginSchema } from "../../schema/auth.schema.js";

const router = express.Router();

router.post("/login", validateSchema(loginSchema), async (req, res) => {
  try {
    const token = await controller.login(req.body.user, req.body.password);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.json({ error: false, body: { mensaje: "Login exitoso" }, token });
  } catch (err) {
    res
      .status(err.statusCode || 500)
      .json({ error: true, body: { mensaje: err.message } });
  }
});

router.get("/verify", (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .json({ error: true, mensaje: "No se encontró token" });
  }

  try {
    const decoded = jwt.verify(token, config.jwt.secret);
    res.json({ error: false, user: decoded });
  } catch (err) {
    res.status(401).json({ error: true, mensaje: "Token inválido o expirado" });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });
  res.json({ error: false, mensaje: "Sesión cerrada correctamente" });
});

export default router;
