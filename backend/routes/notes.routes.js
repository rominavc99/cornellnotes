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
    // Aquí puedes decidir a dónde redirigir al usuario después del logout
    res.redirect("http://localhost:3001"); // Por ejemplo, de vuelta al inicio del frontend
  });
});



// Rutas que requieren autenticación con Google
router.get('/', getUsername);
router.get("/home", getNote);
router.post("/home", addNote);
router.delete("/home/:nota_id", deleteNote);
router.put("/home/:nota_id", updateNote);


// Endpoint para proporcionar la configuración
router.get('/api/config', getConfig);

router.post("/api/users", saveUserData);



export default router;