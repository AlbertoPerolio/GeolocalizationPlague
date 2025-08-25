import jwt from "jsonwebtoken";
import config from "../config.js";
import createError from "../middleware/errors.js";

const secret = config.jwt.secret;

export function assignToken(data) {
  return jwt.sign(data, secret); // token
}

export function verifyToken(token) {
  return jwt.verify(token, secret);
}

export const checkToken = {
  confToken(req, id) {
    if (id === 0) return; // permite la creación de un usuario
    const decrypt = decryptHeader(req);
    if (decrypt.idauth !== id) {
      throw createError("No tienes privilegios para hacer esto", 401);
    }
  },
};

function getToken(authHeader) {
  if (!authHeader) {
    throw createError("No hay token", 401);
  }
  if (!authHeader.includes("Bearer")) {
    throw createError("Formato invalido", 401);
  }
  return authHeader.replace("Bearer", "").trim();
}

function decryptHeader(req) {
  const authHeader = req.headers.authorization || "";
  const token = getToken(authHeader);
  const decrypted = verifyToken(token);

  req.user = decrypted;

  return decrypted;
}
