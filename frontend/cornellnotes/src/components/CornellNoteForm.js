import React, { useState } from "react";
import { TextField, Grid, Paper } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import dayjs from "dayjs";


export default function CornellNoteForm({ note, setNote }) {
  
  const theme = createTheme({
    palette: {
      // Define tus colores
      primary: {
        main: "#000", // color que desees para el texto
      },
      // Otros colores como secundarios, error, etc.
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            // Estilos para el TextField
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            "& $notchedOutline": {
              borderColor: "darkgray",
            },
            "&:hover $notchedOutline": {
              borderColor: "darkgray",
            },
            "&$focused $notchedOutline": {
              borderColor: "darkgray",
            },
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: "darkgray",
            "&$focused": {
              color: "darkgray",
            },
          },
        },
      },
    },
  });



const handleChange = (field, value) => {
  if (field === "fecha" && value) {
    // Formatea el objeto de fecha a una cadena de texto en formato "YYYY-MM-DD"
    value = dayjs(value).format("YYYY-MM-DD");
  }
  setNote((prevNote) => ({
    ...prevNote,
    [field]: value,
  }));
};

  // Función para manejar el envío del formulario

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Paper
          style={{
            padding: "2rem", // Aumenta el padding para dar más espacio
            margin: "auto", // Centra el papel en la pantalla
            // Ajusta esto según el tamaño deseado
            height: "100%",
            background: "#f5f5f5", // Color de fondo más claro para simular papel
            boxShadow: "0px 0px 8px rgba(0,0,0,0.1)", // Sombra suave para dar profundidad
            borderRadius: "8px", // Bordes redondeados suavemente
          }}
        >
          <Grid
            container
            alignItems="flex-start"
            justifyContent="space-between"
            spacing={2}
          >
            {/* Ajusta el contenedor de Título y Fecha para que estén en la misma fila */}
            <Grid item container spacing={2} xs={12}>
              <Grid item xs={12} sm={10}>
                <TextField
                  label="Title"
                  fullWidth
                  value={note.titulo}
                  onChange={(e) => handleChange("titulo", e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <DatePicker
                  label="Date"
                  value={note.fecha ? dayjs(note.fecha) : null} // Convierte la cadena a un objeto Day.js
                  onChange={(newValue) => {
                    handleChange(
                      "fecha",
                      newValue ? newValue.toISOString() : null
                    ); // Almacena la fecha como una cadena ISO
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Subtitle"
                fullWidth
                value={note.subtitulo}
                onChange={(e) => handleChange("subtitulo", e.target.value)}
              />
            </Grid>

            {/* Ajusta la disposición de Ideas Clave y Notas Clave */}
            <Grid item container spacing={2} xs={12}>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Cues"
                  multiline
                  minRows={12}
                  variant="outlined"
                  fullWidth
                  value={note.ideas_clave}
                  onChange={(e) => handleChange("ideas_clave", e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField
                  label="Notes"
                  multiline
                  minRows={12}
                  variant="outlined"
                  fullWidth
                  value={note.notas_clave}
                  onChange={(e) => handleChange("notas_clave", e.target.value)}
                />
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Summary"
                multiline
                minRows={6}
                variant="outlined"
                fullWidth
                value={note.resumen}
                onChange={(e) => handleChange("resumen", e.target.value)}
              />
            </Grid>
          </Grid>
        </Paper>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
