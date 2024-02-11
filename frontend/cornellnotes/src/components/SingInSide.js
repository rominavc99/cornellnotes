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
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import decodeJwt from "../utils/decodeJwt.ts";

const defaultTheme = createTheme();

const SignInSide = () => {
  const [clientId, setClientId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/config")
      .then((response) => {
        setClientId(response.data.client_id);
      })
      .catch((error) => {
        console.error("Error al obtener la configuración:", error);
      });
  }, []);

const handleLoginSuccess = async (response) => {
  // Manejar la respuesta de inicio de sesión exitosa
  console.log("Inicio de sesión exitoso:", response);
  if (response.credential) {
    const { payload } = decodeJwt(response.credential);
    console.log("payload credential", payload);

    // Crear un objeto con los datos que deseas enviar al servidor
    const userData = {
      user_id: payload.sub, // Aquí debes cambiar payload.sub por el campo adecuado que contiene el ID de usuario en tu token decodificado
      nombre: payload.name, // Cambiar payload.name si el campo es diferente en tu token
      correo_electronico: payload.email, // Cambiar payload.email si el campo es diferente en tu token
    };

    try {
      // Enviar la solicitud POST al servidor para guardar los datos en la base de datos
      const response = await axios.post(
        "http://localhost:3000/api/users",
        userData
      );
      console.log("Respuesta del servidor:", response.data);
    } catch (error) {
      console.error("Error al enviar datos de usuario al backend:", error);
      // Manejar el error si es necesario
    }
  }
  navigate("/home");
};


  const handleLoginFailure = (error) => {
    // Manejar el error de inicio de sesión
    console.error("Error de inicio de sesión:", error);
  };



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
            {clientId && (
              <GoogleLogin
                clientId={clientId}
                onSuccess={handleLoginSuccess}
                onFailure={handleLoginFailure}
                buttonText="Sign in with Google"
                cookiePolicy="single_host_origin"
              />
            )}
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default SignInSide;
