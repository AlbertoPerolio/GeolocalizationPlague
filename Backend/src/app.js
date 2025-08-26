import cors from "cors";
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import config from "./config.js";

// rutas
import register from "./modules/register/routes.js";
import auth from "./modules/auth/routes.js";
import markers from "./modules/plague-map/routes.js";
import error from "./red/errors.js";

// Sequelize
import { connect } from "./DB/sequelize.js";
await connect();

const app = express();

// middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// configuración
app.set("port", config.app.port);

// rutas
app.use("/api/register", register);
app.use("/api/auth", auth);
app.use("/api", markers);
app.use(error);

export default app;
