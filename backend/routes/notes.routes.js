import { Router } from "express";
import db from "../db.js";
import session from "express-session";
import passport from "passport";
import cors from "cors";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import express from "express";
import {
  getUsername,
  getNote,
  addNote,
  deleteNote,
  updateNote,
} from "../controllers/notes.controllers.js";
import { getConfig, googleAuth, googleAuthHome, saveUserData } from "../controllers/notes.controllers.js";




const router = Router();


// Aplicar middleware CORS aquí
router.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});


const ensureAuthenticated = (req, res, next) => {
  // Si el usuario está autenticado, procede con la siguiente función de middleware
  if (req.isAuthenticated()) {
    return next();
  }
  // Si el usuario no está autenticado, redirige a la página de inicio de sesión de Google
  res.redirect("/auth/google");
};


// Rutas que requieren autenticación con Google
router.get('/', ensureAuthenticated, getUsername);
router.get("/home", ensureAuthenticated, getNote);
router.post("/home", ensureAuthenticated, addNote);
router.delete("/home", ensureAuthenticated, deleteNote);
router.put("/home", ensureAuthenticated, updateNote);


// Endpoint para proporcionar la configuración
router.get('/api/config', getConfig);

// Rutas relacionadas con la autenticación con Google
router.get("/auth/google/home", googleAuthHome);
router.get('/auth/google', googleAuth);

router.get("/api/google-auth", async (req, res) => {
  try {
    const response = await axios.get(
      "https://accounts.google.com/o/oauth2/v2/auth",
      {
        params: {
          response_type: "code",
          redirect_uri: "http://localhost:3000/auth/google/callback",
          scope: "profile email",
          client_id:
            "538298008719-bc9gsolniv2690hhovd7c0l4lvtvd7ui.apps.googleusercontent.com",
        },
      }
    );
    res.send(response.data);
  } catch (error) {
    console.error("Error al realizar la solicitud a Google OAuth:", error);
    res.status(500).send("Error interno del servidor");
  }
});

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    console.log("Datos del perfil del usuario:", req.user); // Verifica los datos del perfil del usuario
    res.redirect("/"); // Redirige al usuario a la página principal
  }
);

router.post("/api/users", saveUserData);



export default router;