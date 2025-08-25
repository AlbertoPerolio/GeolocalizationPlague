import * as auth from "../../authlog/index.js";
import createError from "../../middleware/errors.js";

export default function checkToken() {
  return function middleware(req, res, next) {
    try {
      // Permitir creación de usuario sin token
      if (!req.headers.authorization) {
        if (req.body.id_reg === 0) return next();
        throw createError("Token requerido", 401);
      }

      const id = req.body.id_reg;
      auth.checkToken.confToken(req, id);

      next();
    } catch (err) {
      next(err);
    }
  };
}
