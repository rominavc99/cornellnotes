import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Link,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";
import WebAssetIcon from "@mui/icons-material/WebAsset"; // Representará el portafolio web personal
// Asegúrate de que este icono esté disponible

const BehanceIcon = () => (
  <img
    style={{ width: "24px", height: "24px" }}
    src={`${process.env.PUBLIC_URL}/behance.svg`}
    alt="Behance"
  />
);

const Footer = () => {
  
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "grey.200",
        py: 10,
        width: "100%",
        // Quitar la propiedad 'transform' y 'position' para que el footer fluya con el contenido
        transition: "transform 0.2s",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={3}>
            <Box
              component="img"
              sx={{
                height: 130, // Ajusta el tamaño según sea necesario
                width: 200, // Ajusta el tamaño según sea necesario
              }}
              alt="Logo personal"
              src={`${process.env.PUBLIC_URL}/logo.png`} // Asegúrate de que esta ruta es correcta
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Box>
              <Typography variant="h6" color="textPrimary" gutterBottom>
                Cornell Notes
              </Typography>
              {/* Coloca aquí tu imagen de logo */}
            </Box>
            <Box>
              <Link component={RouterLink} to="/aboutus" color="inherit">
                About Us
              </Link>
            </Box>
            <Box>
              <Link component={RouterLink} to="/documentation" color="inherit">
                Documentation
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" color="textPrimary" gutterBottom>
              Follow Us
            </Typography>
            <IconButton aria-label="LinkedIn" color="inherit">
              <LinkedInIcon />
            </IconButton>
            <IconButton aria-label="Instagram" color="inherit">
              <InstagramIcon />
            </IconButton>
            <IconButton aria-label="GitHub" color="inherit">
              <GitHubIcon />
            </IconButton>
            <IconButton aria-label="Behance" color="inherit">
              <BehanceIcon />
            </IconButton>
            <IconButton aria-label="Personal Portfolio" color="inherit">
              <WebAssetIcon />
            </IconButton>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" color="textPrimary" gutterBottom>
              How do we take care of your data?
            </Typography>
            <Link href="#" color="inherit">
              Privacy Policy
            </Link>
            <Link href="#" color="inherit">
              Terms and Conditions
            </Link>
          </Grid>
        </Grid>
        <Typography
          variant="body2"
          color="textSecondary"
          align="center"
          sx={{ pt: 4 }}
        >
          {"Copyright © "}
          {new Date().getFullYear()} Cornell Notes by Dino Studio. All rights
          reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
