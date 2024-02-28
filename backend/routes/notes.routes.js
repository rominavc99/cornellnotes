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
  getNoteDetails,
} from "../controllers/notes.controllers.js";
import { getConfig,saveUserData } from "../controllers/notes.controllers.js";




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

router.get("/auth/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    // Usa una variable de entorno para la URL de redirección
    const frontendURL =
      process.env.REACT_APP_API_URL || "http://localhost:3001";
    res.redirect(frontendURL);
  });
});


// Rutas que requieren autenticación con Google
router.get('/', getUsername);
router.get("/home", getNote);
router.post("/home", addNote);
router.delete("/home/:nota_id", deleteNote);
router.put("/home/:nota_id", updateNote);
router.get("/home/:nota_id", getNoteDetails);


// Endpoint para proporcionar la configuración
router.get('/api/config', getConfig);

router.post("/api/users", saveUserData);





export default router;