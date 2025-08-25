import bcrypt from "bcrypt";
import RegInf from "../../models/RegInf.js";

export default function registerController() {
  // Crear usuario
  async function add(data) {
    try {
      // Revisamos si es el primer usuario
      const userCount = await RegInf.count();
      const role = userCount === 0 ? "admin" : "user";

      // Hasheamos la contraseña
      const hashedPassword = await bcrypt.hash(data.password.toString(), 5);

      const user = await RegInf.create({
        name: data.name,
        email: data.email,
        user: data.user,
        password: hashedPassword,
        role: role, // asignamos rol automáticamente
      });

      return user;
    } catch (err) {
      if (err.name === "SequelizeUniqueConstraintError") {
        const messages = err.errors.map((e) => {
          if (e.path === "user") return "El nombre de usuario ya existe";
          if (e.path === "email") return "El email ya está registrado";
          return e.message;
        });
        const error = new Error(messages);
        error.statusCode = 409;
        throw error;
      }
      throw err;
    }
  }

  async function all() {
    const users = await RegInf.findAll({
      attributes: { exclude: ["password"] }, // no devolver contraseñas
    });
    return users;
  }

  return { add, all };
}
