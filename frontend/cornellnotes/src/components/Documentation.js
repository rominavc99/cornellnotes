// src/components/Documentation.js

import React from "react";
import { Container, Typography, Box, Link } from "@mui/material";

const Documentation = () => {
  return (
    <Container maxWidth="md">
      <Typography variant="h2" gutterBottom>
        Documentación
      </Typography>
      <Typography variant="body1" paragraph>
        La técnica de notas Cornell fue desarrollada por Walter Pauk de la
        Universidad de Cornell...
      </Typography>

      <Typography variant="body1" paragraph>
        Esta aplicación web está diseñada para facilitar la toma de notas
        utilizando este método...
      </Typography>

      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          Cómo Usar la Aplicación
        </Typography>
        <Typography variant="body1" paragraph>
          Para comenzar a tomar notas con Cornell Notes, simplemente...
        </Typography>
      </Box>

      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          Créditos
        </Typography>
        <Typography variant="body1" paragraph>
          Agradecimientos especiales a todas las personas y recursos que han
          hecho posible este proyecto...
        </Typography>
      </Box>
    </Container>
  );
};

export default Documentation;
