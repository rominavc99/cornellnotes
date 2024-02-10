import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import AppRouter from "./components/Router";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ff5722",
    },
    secondary: {
      main: "#03a9f4",
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
