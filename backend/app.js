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
app.use(cors()); 

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

// Configura Passport.js con la estrategia de Google OAuth 2.0
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    function (accessToken, refreshToken, profile, done) {
      // Aquí puedes acceder a los datos del perfil del usuario, como su nombre y correo electrónico
      const nombreUsuario = profile.displayName;
      const correoUsuario = profile.emails[0].value;

      // Guarda la información del usuario en la base de datos
      db.query(
        "INSERT INTO usuarios (user_id, nombre, correo_electronico) VALUES ($1, $2, $3) ON CONFLICT (user_id) DO NOTHING RETURNING *",
        [profile.id, nombreUsuario, correoUsuario],
        (err, result) => {
          if (err) {
            console.error(
              "Error al guardar el usuario en la base de datos:",
              err
            );
            return done(err);
          }
          console.log("Usuario guardado en la base de datos:", result.rows[0]);
          return done(null, profile);
        }
      );
    }
  )
);

// Configura Passport.js para serializar y deserializar usuarios
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  // Aquí no necesitas buscar el usuario en la base de datos si ya lo tienes en el objeto `user`
  done(null, user);
});

// Sirve los archivos estáticos
app.use(
  express.static(
    path.join(__dirname, "..", "frontend", "cornellnotes", "build")
  )
);

// Monta las rutas definidas en notesRoutes


app.use(notesRoutes);

// Inicia el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});
