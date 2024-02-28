import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import AppRouter from "./components/Router";
import Footer from "./components/Footer";

const theme = createTheme({
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
          "& fieldset": {
            borderColor: "darkgray", // Cambia el color del borde
          },
          "&:hover fieldset": {
            borderColor: "darkgray", // Cambia el color del borde al pasar el mouse
          },
          "&.Mui-focused fieldset": {
            borderColor: "darkgray", // Cambia el color del borde al enfocar
          },
        },
        notchedOutline: {
          borderColor: "darkgray", // Asegura que el borde tenga el color deseado
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            color: "darkgray", // Cambia el color del texto al enfocar
          },
        },
      },
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppRouter />
    </ThemeProvider>
  );
};

export default App;
