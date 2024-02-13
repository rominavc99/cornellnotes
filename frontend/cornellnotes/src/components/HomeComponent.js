import React,  { useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { createNote, updateNote, deleteNote,fetchNotes } from "../services/notesService";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Link from "@mui/material/Link";
import CardNote from "./CardNote";
import CornellNoteForm from "./CornellNoteForm";
import ExitToAppIcon from "@mui/icons-material/ExitToApp"; // Icono para el botón de cerrar sesión
import axios from "axios";
import { Fab, Tooltip } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";



function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        CornellNotes
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

const drawerWidth = 240;

const handleLogout = () => {
  // Hacer una petición para cerrar la sesión
axios
  .get("http://localhost:3000/auth/logout")
  .then(() => {
    // Redirigir al usuario al frontend o a una página de inicio de sesión
    window.location.href = "http://localhost:3001/";
  })
  .catch((error) => console.error("Error al cerrar sesión:", error));
};

const Main = styled("main")(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));


const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [notas, setNotas] = useState([]);

  const [note, setNote] = React.useState({
    titulo: "",
    subtitulo: "",
    fecha: null,
    ideas_clave: "",
    notas_clave: "",
    resumen: "",
  });

  // Cargar las notas cuando el componente se monte
  useEffect(() => {
    const cargarNotas = async () => {
      const notasObtenidas = await fetchNotes(); // Asume que esta función existe y retorna las notas
      setNotas(notasObtenidas);
    };

    cargarNotas();
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const FloatingActionButtons = styled("div")(({ theme }) => ({
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(3),
    "& > *": {
      margin: theme.spacing(1),
    },
  }));

  const handleSaveClick = async () => {
    try {
      const savedNote = await createNote(note);
      console.log("Nota guardada:", savedNote);
      setNotas((prevNotas) => [...prevNotas, savedNote]);
      // Procesar la respuesta, por ejemplo, mostrar un mensaje de éxito
    } catch (error) {
      console.error("Error al guardar la nota:", error);
      // Manejar el error, por ejemplo, mostrar un mensaje de error
    }
  };

  const handleEditClick = async (noteId) => {
    try {
      const updatedNote = await updateNote(noteId, note);
      console.log("Nota actualizada:", updatedNote);
      // Procesar la respuesta
    } catch (error) {
      console.error("Error al actualizar la nota:", error);
      // Manejar el error
    }
  };

  const handleDeleteClick = async (noteId) => {
    try {
      await deleteNote(noteId);
      console.log("Nota eliminada");
      // Procesar la acción, por ejemplo, actualizar la lista de notas
    } catch (error) {
      console.error("Error al eliminar la nota:", error);
      // Manejar el error
    }
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Cornell Notes by dinostudio
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Typography variant="h5">Mi nombre</Typography>
          <Typography variant="h5">Mi nombre</Typography>

          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout}>
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary="Cerrar Sesión" />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <List>
            {notas.map((nota) => (
              <ListItem key={nota.nota_id} disablePadding>
                <ListItemButton>
                  <CardNote titulo={nota.titulo} fecha={nota.fecha} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Main open={open}>
          <DrawerHeader />
          <CornellNoteForm note={note} setNote={setNote}></CornellNoteForm>
          <FloatingActionButtons>
            <Tooltip title="Guardar" aria-label="guardar">
              <Fab color="primary" size="medium" onClick={handleSaveClick}>
                <SaveIcon />
              </Fab>
            </Tooltip>
            <Tooltip title="Editar" aria-label="editar">
              <Fab color="secondary" size="medium" onClick={handleEditClick}>
                <EditIcon />
              </Fab>
            </Tooltip>
            <Tooltip title="Eliminar" aria-label="eliminar">
              <Fab color="error" size="medium" onClick={handleDeleteClick}>
                <DeleteIcon />
              </Fab>
            </Tooltip>
          </FloatingActionButtons>
        </Main>
      </Box>
    </ThemeProvider>
  );
}
