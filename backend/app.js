// Importa los módulos necesarios
import express from "express";
import session from "express-session";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import pg from "pg";

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Configura Express
const app = express();

app.use(
  session({
    secret: process.env.SECRET_SESSION, 
    resave: false,
    saveUninitialized: true,
  })
);


// Obtener la URL de conexión a la base de datos desde las variables de entorno
const connectionString = process.env.DATABASE_URL;

// Crear un cliente PostgreSQL
const client = new pg.Client({
  connectionString: connectionString,
});

// Conectar al servidor de base de datos PostgreSQL
client
  .connect()
  .then(() => {
    console.log("Conexión exitosa a la base de datos PostgreSQL");
  })
  .catch((error) => {
    console.error("Error al conectar a la base de datos PostgreSQL", error);
  });

// Realizar consultas a la base de datos usando el cliente
// Ejemplo de consulta:
client
  .query('SELECT NOW() AS "theTime"')
  .then((result) => {
    console.log("Resultado de la consulta:", result.rows[0].theTime);
  })
  .catch((error) => {
    console.error("Error al ejecutar la consulta", error);
  });


// Configura Passport.js con la estrategia de Google OAuth 2.0
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      // Aquí puedes acceder a los datos del perfil del usuario, como su nombre y correo electrónico
      const nombreUsuario = profile.displayName;
      const correoUsuario = profile.emails[0].value;

      // Guarda la información del usuario en la base de datos
      client.query(
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

// Inicializar Passport.js middleware
app.use(passport.initialize());
app.use(passport.session()); // Usa express-session para la persistencia de sesión

// Configura Passport.js para serializar y deserializar usuarios
passport.serializeUser(function(id, done) {
  done(null, id);
});

passport.deserializeUser(function(id, done) {
  // Aquí puedes buscar el usuario en la base de datos usando el ID
  done(null, id);
});

// Define las rutas y demás configuraciones de tu aplicación

// Define la nueva ruta de redirección después de la autenticación exitosa con Google
app.get('/auth/google/home', (req, res) => {
  // Aquí puedes realizar cualquier acción que desees después de la autenticación exitosa
  // Por ejemplo, puedes mostrar una página de inicio o redirigir a una página específica
  
  res.send('¡Bienvenido! Has iniciado sesión correctamente con Google.');
});

// Actualiza la ruta de inicio de sesión con Google para usar la nueva URL de redirección
app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'], callbackURL: 'http://localhost:3000/auth/google/callback' })
);

// Actualiza la ruta de callback de Google para usar la nueva URL de redirección
app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function (req, res) {
    // Si la autenticación con Google es exitosa, redirige al usuario a la nueva ruta de redirección
    res.redirect('/auth/google/home');
  }
);


// ...

// Inicia el servidor
app.listen(3000, () => {
  console.log("Servidor en funcionamiento en el puerto 3000");
});
