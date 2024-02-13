// src/services/notesService.js
import axios from "axios";

const BASE_URL = "http://localhost:3000"; // Asegúrate de usar la URL correcta de tu backend

const createNote = async (noteData) => {
  const userId = localStorage.getItem("userId"); // Recupera el user_id de localStorage
  const fullNoteData = {
    ...noteData,
    user_id: userId,
  };

  try {
    const response = await axios.post(`${BASE_URL}/home`, fullNoteData);
    console.log("Nota creada con éxito:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al crear la nota:", error);
    throw error;
  }
};

const updateNote = async (noteId, noteData) => {
  try {
    const response = await axios.put(`${BASE_URL}/home/${noteId}`, noteData);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar la nota:", error);
    throw error;
  }
};

const deleteNote = async (noteId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/home/${noteId}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar la nota:", error);
    throw error;
  }
};

const fetchNotes = async () => {
  try {
    // Obtén el user_id del localStorage
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.error("No se encontró el user_id en el localStorage");
      return []; // Si no hay user_id, retorna un arreglo vacío
    }

    // Actualiza la solicitud para incluir el user_id en la cabecera
    const response = await axios.get(`${BASE_URL}/home`, {
      headers: {
        Authorization: `Bearer ${userId}`, // Usa el formato de autorización que tengas definido
      },
    });

    // Asegúrate de que la respuesta es un arreglo
    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      console.error("La respuesta no es un arreglo", response.data);
      return []; // Devuelve un arreglo vacío para evitar errores en el frontend
    }
  } catch (error) {
    console.error("Error al obtener las notas:", error);
    return []; // Retorna un array vacío en caso de error
  }
};

export { createNote, updateNote, deleteNote, fetchNotes };
