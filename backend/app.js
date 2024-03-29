import express from "express";
import session from "express-session";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import notesRoutes from "./routes/notes.routes.js";
import db from "./db.js";
import bodyParser from "body-parser";


// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Configura Express
const app = express();
const __dirname = path.dirname(new URL(import.meta.url).pathname);

app.use(bodyParser.json());

// Habilita CORS
const corsOptions = {
  origin: "https://main--ideacatcher2.netlify.app", // Permite solicitudes solo desde tu frontend
};

app.use(cors(corsOptions));

// Configura la sesión de Express
app.use(
  session({
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: true,
  })
);

// Inicializa Passport.js middleware
app.use(passport.initialize());
app.use(passport.session()); // Usa express-session para la persistencia de sesión


// Sirve los archivos estáticos
app.use(
  express.static(
    path.join(__dirname, "..", "frontend", "cornellnotes", "build")
  )
);

// Monta las rutas definidas en notesRoutes


app.use(notesRoutes);

// Inicia el servidor
const PORT = process.env.PORT || 10000; // Render espera por defecto el puerto 10000, pero puedes configurarlo en las variables de entorno de Render
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});