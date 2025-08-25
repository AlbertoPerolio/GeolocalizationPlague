import PlagueReport from "../../models/plague_report.js";
import { uploadImageToCloudinary } from "../../utils/cloudinary.js";
import fs from "fs";

export const createMarker = async (req, res, next) => {
  try {
    const { title, description, id_reg, status, lat, lng } = req.body;
    let imgurl = null;

    if (!req.file) {
      return res.status(400).json({
        error: true,
        mensaje: "No se ha subido ningún archivo de imagen.",
      });
    }

    const result = await uploadImageToCloudinary(req.file.path);

    if (result && result.secure_url) {
      imgurl = result.secure_url;
      fs.unlinkSync(req.file.path);
    } else {
      throw new Error(
        "Error al subir la imagen a Cloudinary. Por favor, inténtelo de nuevo."
      );
    }

    const newMarker = await PlagueReport.create({
      title,
      description,
      id_reg: parseInt(id_reg, 10),
      status,
      imgurl,
      lat: parseFloat(lat),
      lng: parseFloat(lng),
    });

    return res.status(201).json(newMarker);
  } catch (error) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    next(error);
  }
};

export const getAllMarkers = async (req, res, next) => {
  try {
    const markers = await PlagueReport.findAll();
    res.status(200).json(markers);
  } catch (error) {
    next(error);
  }
};

// ✅ FUNCIÓN DE ACTUALIZACIÓN CORREGIDA
export const updateMarker = async (req, res, next) => {
  try {
    const { idplague } = req.params;
    const { title, description } = req.body;
    const marker = await PlagueReport.findByPk(idplague);

    if (!marker) {
      return res.status(404).json({ message: "Marker not found" });
    }

    // ✅ LÓGICA DE AUTORIZACIÓN: Solo el dueño o el admin pueden editar.
    const user = req.user; // Asumimos que la información del usuario está en req.user
    if (user.role !== "admin" && user.id_reg !== parseInt(marker.id_reg, 10)) {
      return res.status(403).json({
        error: true,
        mensaje: "No tienes privilegios para realizar esta acción",
      });
    } // Comprueba si se subió un nuevo archivo para actualizar la imagen

    if (req.file) {
      const result = await uploadImageToCloudinary(req.file.path);
      if (result && result.secure_url) {
        fs.unlinkSync(req.file.path);
        marker.imgurl = result.secure_url;
      }
    } // Actualiza los campos de texto

    marker.title = title;
    marker.description = description;

    await marker.save();
    res.status(200).json(marker);
  } catch (error) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    next(error);
  }
};

export const deleteMarker = async (req, res, next) => {
  try {
    const { idplague } = req.params;
    const marker = await PlagueReport.findByPk(idplague);
    if (!marker) {
      return res.status(404).json({ message: "Marker not found" });
    }
    await marker.destroy();
    res.status(200).json({ message: "Marker deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const approveMarker = async (req, res, next) => {
  try {
    const { idplague } = req.params;
    const marker = await PlagueReport.findByPk(idplague);
    if (!marker) {
      return res.status(404).json({ message: "Marker not found" });
    }
    marker.status = "aprobado";
    await marker.save();
    res.status(200).json(marker);
  } catch (error) {
    next(error);
  }
};
