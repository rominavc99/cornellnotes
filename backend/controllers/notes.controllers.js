import db from "../db.js";
import bodyParser from "body-parser";
import express from "express";
import dayjs from "dayjs";

const app = express();
const frontendPort = process.env.REACT_APP_FRONTEND_PORT || 3001;
app.use(bodyParser.json());

const getUsername = async (req, res) => {   
    const result = await db.query('SELECT * FROM "public"."usuarios" LIMIT 100');
    console.log(result);
    res.json(result.rows[0].nombre);

}

const getNote = async (req, res) => {
  // Extrae el user_id de la cabecera Authorization
  // Asume que el token está en el formato "Bearer <user_id>"
  const authHeader = req.headers.authorization;
  let userId = null;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    userId = authHeader.substring(7, authHeader.length); // Extrae el user_id del token
  }

  if (!userId) {
    return res.status(401).json({ message: "No se proporcionó el user_id" });
  }

  try {
    // Consulta a la base de datos para obtener las notas del usuario
    const result = await db.query(
      "SELECT * FROM notas WHERE user_id = $1 ORDER BY fecha DESC", // Ordena las notas por fecha
      [userId]
    );

    // Formatea las fechas de las notas antes de enviarlas al cliente
    const formattedNotes = result.rows.map((note) => ({
      ...note,
      fecha: dayjs(note.fecha).format("YYYY-MM-DD"), // Formatea la fecha a 'YYYY-MM-DD'
    }));

    res.json(formattedNotes); // Envía las notas formateadas
  } catch (error) {
    console.error("Error al obtener las notas:", error);
    res.status(500).json({ message: "Error al obtener las notas" });
  }
};

const getNoteDetails = async (req, res) => {
  const { nota_id } = req.params; // Obtén el ID de la nota de los parámetros de la solicitud

  try {
    const result = await db.query("SELECT * FROM notas WHERE nota_id = $1", [
      nota_id,
    ]);

    if (result.rows.length) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: "Nota no encontrada" });
    }
  } catch (error) {
    console.error("Error al obtener detalles de la nota:", error);
    res.status(500).json({ message: "Error al obtener detalles de la nota" });
  }
};




const addNote = async (req, res) => {
  // Extrae todos los campos necesarios del cuerpo de la solicitud
  const {
    user_id,
    titulo,
    subtitulo,
    fecha,
    ideas_clave,
    notas_clave,
    resumen,
  } = req.body;

  try {
    // Inserta la nueva nota en la base de datos
    const result = await db.query(
      `INSERT INTO notas (user_id, titulo, subtitulo, fecha, ideas_clave, notas_clave, resumen) 
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`,
      [user_id, titulo, subtitulo, fecha, ideas_clave, notas_clave, resumen] // Asegura que los valores correspondan en orden
    );

    // Si todo sale bien, devuelve la nota insertada al cliente
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error al guardar la nota en la base de datos:", error);
    res.status(500).json({ message: "Error al guardar la nota" });
  }
};


const deleteNote = async (req, res) => {
  const { nota_id } = req.params; // Asume que pasas el ID de la nota como parámetro en la URL

  try {
    await db.query("DELETE FROM notas WHERE nota_id = $1", [nota_id]);
    res.json({ message: "Nota eliminada correctamente." });
  } catch (error) {
    console.error("Error al eliminar la nota:", error);
    res.status(500).json({ message: "Error al eliminar la nota" });
  }
};

const updateNote = async (req, res) => {
  const { nota_id } = req.params; // El ID de la nota a actualizar
  const { titulo, subtitulo, fecha, ideas_clave, notas_clave, resumen } =
    req.body;

  try {
    const result = await db.query(
      `UPDATE notas 
       SET titulo = $2, subtitulo = $3, fecha = $4, ideas_clave = $5, notas_clave = $6, resumen = $7
       WHERE nota_id = $1 
       RETURNING *;`,
      [
        parseInt(nota_id, 10),
        titulo,
        subtitulo,
        fecha,
        ideas_clave,
        notas_clave,
        resumen,
      ] // Asegúrate de que nota_id es un entero
    );

    if (result.rows.length) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: "Nota no encontrada para actualizar" });
    }
  } catch (error) {
    console.error("Error al actualizar la nota:", error);
    res.status(500).json({ message: "Error al actualizar la nota" });
  }
};



const getConfig = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
  // Obtener el client_id de tus variables de entorno
  const clientId = process.env.GOOGLE_CLIENT_ID;

  // Devolver la configuración como JSON
  res.json({ client_id: clientId });
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

 
    

export { getUsername, getNote, addNote, deleteNote, updateNote, getConfig, getNoteDetails};
