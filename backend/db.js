import dotenv from "dotenv";
import pg from "pg";
import express from "express";

dotenv.config();

// Configura Express
const app = express();

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

export default client; 