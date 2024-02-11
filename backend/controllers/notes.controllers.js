import db from "../db.js";
import dotenv from "dotenv";
import passport from "passport";
import bodyParser from "body-parser";
import express from "express";

const app = express();
const frontendPort = process.env.REACT_APP_FRONTEND_PORT || 3001;
app.use(bodyParser.json());

const getUsername = async (req, res) => {   
    const result = await db.query('SELECT * FROM "public"."usuarios" LIMIT 100');
    console.log(result);
    res.json(result.rows[0].nombre);

}

const getNote = (req, res) => {
  res.send("notas");
};

const addNote = (req, res) => {
  res.send("agregar nota");
};

const deleteNote = (req, res) => {
  res.send("eliminar nota");
};

const updateNote = (req, res) => {
  res.send("actualizar nota");
};


const getConfig = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
  // Obtener el client_id de tus variables de entorno
  const clientId = process.env.GOOGLE_CLIENT_ID;

  // Devolver la configuración como JSON
  res.json({ client_id: clientId });
};

const googleAuthHome = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
  // Verifica si el usuario está autenticado
  if (req.isAuthenticated()) {
    // Aquí puedes realizar cualquier acción que desees después de la autenticación exitosa
    // Por ejemplo, puedes mostrar una página de inicio o redirigir a una página específica
   res.redirect(`http://localhost:${frontendPort}/home`);
  } else {
    // Si el usuario no está autenticado, redirige a la página de inicio de sesión de Google
    res.redirect("/auth/google");
  }
};

const googleAuth = (req, res, next) => {
  
    res.header("Access-Control-Allow-Origin", "*");
  // Si el usuario ya está autenticado, redirígelo a la página de inicio
  if (req.isAuthenticated()) {
    return res.redirect("/auth/google/home");
  }
  // Si el usuario no está autenticado, procede con la autenticación con Google
  passport.authenticate("google", {
    scope: ["profile", "email"],
    callbackURL: "http://localhost:3000/auth/google/callback",
  })(req, res, next);
};


export const saveUserData = async (req, res) => {
  try {
    // Extrae los datos del cuerpo de la solicitud
    const { user_id, nombre, correo_electronico } = req.body;

    // Guarda los datos en la base de datos
    const result = await db.query(
      "INSERT INTO usuarios (user_id, nombre, correo_electronico) VALUES ($1, $2, $3) RETURNING *",
      [user_id, nombre, correo_electronico]
    );

    // Envía una respuesta con los datos guardados en la base de datos
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error al guardar el usuario en la base de datos:", error);
    res
      .status(500)
      .json({ message: "Error al guardar el usuario en la base de datos" });
  }
};

 
    

export { getUsername, getNote, addNote, deleteNote, updateNote, getConfig, googleAuth, googleAuthHome};
