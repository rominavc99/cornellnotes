import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const defaultTheme = createTheme();

  function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    // Aquí deberías enviar el token al backend para que pueda validar y procesar la sesión del usuario
    // Por ahora, simplemente redireccionaremos al usuario a una URL en tu backend
    const jwtToken = response.credential;
    const backendRedirectUrl = "http://localhost:3000/auth/google/home"; // Reemplaza esto con la URL de tu backend

    // Redireccionar al usuario a la ruta deseada en tu backend
    window.location.href = backendRedirectUrl;
  }

function SignInSide() {
  const [clientId, setClientId] = useState("");

  useEffect(() => {
    console.log(
      "Ejecutando useEffect para obtener la configuración del cliente..."
    );
    // Hacer la solicitud para obtener la configuración del backend al cargar el componente
    axios
      .get("http://localhost:3000/api/config")
      .then((response) => {
        // Actualizar el estado con el client_id recibido del backend
        console.log("Respuesta del servidor:", response.data);
        setClientId(response.data.client_id);
      })
      .catch((error) =>
        console.error("Error al obtener la configuración:", error)
      );
  }, []);

  useEffect(() => {
    const initializeGoogleSignIn = () => {
      if (
        window.google &&
        window.google.accounts &&
        window.google.accounts.id
      ) {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: handleCredentialResponse,
        });
        window.google.accounts.id.renderButton(
          document.getElementById("buttonDiv"),
          { theme: "outline", size: "large" }
        );
        window.google.accounts.id.prompt();
      } else {
        console.error("Google Sign-In initialization failed.");
      }
    };

    if (clientId) {
      initializeGoogleSignIn();
    }
  }, [clientId]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);



  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            {/* Contenedor para el botón de inicio de sesión con Google */}
            <div id="buttonDiv" />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default SignInSide;
