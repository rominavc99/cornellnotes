// src/components/AboutUs.js

import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import tecnologias from "../data/tecnologias"; // Asume un archivo de datos con las tecnologías

const theme = createTheme({
  palette: {
    // Define tu propio color primario
    primary: {
      main: "#ffb300", // Ejemplo de un amarillo mostaza
    },
  },
  components: {
    // Estilo para las tarjetas con efecto hover
    MuiCard: {
      styleOverrides: {
        root: {
          transition: "transform 0.3s",
          "&:hover": {
            transform: "scale(1.03)", // Escala un poco más grande al pasar el ratón por encima
          },
        },
      },
    },
    // Estilo para el botón
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "20px", // Botón más redondeado
          padding: "10px 20px", // Más grande
          fontWeight: "bold", // Texto más bold
          color: "white", // Texto blanco
        },
      },
    },
  },
});

const AboutUs = () => {
    return (
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            pb: 8,
          }}
        >
          <Container maxWidth="lg" sx={{ flexGrow: 1 }}>
            <Box
              sx={{
                display: "flex", // Habilita flexbox
                justifyContent: "center", // Centra los elementos en el eje horizontal
                overflow: "hidden", // Evita cualquier desbordamiento
              }}
            >
              <img
                src="https://acortar.link/tdLvYI" // Reemplaza con la URL de tu imagen
                alt="Imagen de portada"
                style={{
                  width: "30%", // Ajusta el ancho de la imagen a la mitad del contenedor
                  height: "auto", // Ajusta la altura automáticamente para mantener la proporción de la imagen
                  display: "block", // Display block para evitar espacios extra debajo de la imagen
                }}
              />
            </Box>

            <Typography
              variant="h2"
              gutterBottom
              style={{ textAlign: "center" }}
            >
              About Us
            </Typography>
            <Typography
              variant="body1"
              paragraph
              style={{ textAlign: "center" }}
            >
              Dino Studio is a venture that meets multimedia needs, with a
              strong focus on web design and development, as well as general
              graphic design. It originated as an idea while I was still
              studying at university, and ever since, whenever I work
              independently, I do so under the name Dino Studio. The pixel art
              logo featuring a dinosaur is an adaptation of a drawing exercise I
              did as part of a class. The teacher brought in several of her
              daughter's plastic dinosaurs for us to practice drawing objects in
              front of us. I still keep the result of that drawing.
            </Typography>
            <Typography
              variant="h5"
              gutterBottom
              style={{ textAlign: "center" }}
            >
              As professionist I am...{" "}
            </Typography>
            <Typography
              variant="body1"
              paragraph
              style={{ textAlign: "center" }}
            >
              Multimedia Production Engineer with extensive knowledge in web
              development and multimedia content creation. I have always enjoyed
              consuming content, and now I am fulfilling my dream of creating
              multimedia solutions that provide the best experience for both
              clients and users. I am ready to learn and enhance my skills on my
              journey in multimedia.
            </Typography>

            <Typography
              sx={{
                mt: 10,
              }}
              variant="h4"
              gutterBottom
              style={{ textAlign: "center" }}
            >
              Skills
            </Typography>
            <Grid container spacing={2} justifyContent="center">
              {tecnologias.map((tecnologia) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  key={tecnologia.nombre}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Card>
                    <Box
                      sx={{
                        display: "flex", // Habilita flexbox
                        justifyContent: "center", // Centra los elementos en el eje horizontal
                        alignItems: "center", // Centra los elementos en el eje vertical
                        height: "100px", // Altura fija para el contenedor de la imagen
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={tecnologia.imagen}
                        alt={tecnologia.nombre}
                        sx={{
                          width: "auto", // Ajusta automáticamente la anchura para mantener la proporción de la imagen
                          maxHeight: "100%", // Establece una altura máxima para la imagen
                          objectFit: "contain", // Asegura que la imagen completa se muestre dentro del espacio asignado
                        }}
                      />
                    </Box>
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        style={{ textAlign: "center" }}
                      >
                        {tecnologia.nombre}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        style={{ textAlign: "center" }}
                      >
                        {tecnologia.descripcion}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Button
                variant="contained"
                color="primary"
                size="large" // Hace el botón más grande
                href="https://tu-portafolio.com" // Reemplaza con la URL de tu portafolio
              >
                Check Out My Portfolio
              </Button>
            </Box>
          </Container>
        </Box>
      </ThemeProvider>
    );
};

export default AboutUs;
