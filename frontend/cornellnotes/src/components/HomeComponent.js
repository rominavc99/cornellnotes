import React,  { useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import {
  createNote,
  updateNote,
  deleteNote,
  fetchNotes,
  fetchNoteDetails,
} from "../services/notesService";
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
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AddIcon from "@mui/icons-material/Add";

import { Accordion} from "@mui/material";


const defaultTheme = createTheme();

const drawerWidth = 240;

const handleLogout = () => {
  // Hacer una petición para cerrar la sesión
axios
  .get("https://cornellnotes-2sn1.onrender.com/auth/logout")
  .then(() => {
    // Redirigir al usuario al frontend o a una página de inicio de sesión
    window.location.href = "https://cornellnotes-2sn1.onrender.com/";
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

  const isNoteSelected = note && note.nota_id;

  // Determina si se está mostrando una nota existente
  const isEditing = note && note.nota_id;

  const handleNoteClick = async (nota_id) => {
    try {
      const noteDetails = await fetchNoteDetails(nota_id);
      setNote(noteDetails); // Actualiza el estado con los detalles de la nota
      console.log(noteDetails);
    } catch (error) {
      console.error("Error al obtener los detalles de la nota:", error);
      // Agrega aquí la lógica de manejo de errores si es necesario
    }
  };

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
    console.log(typeof noteId, noteId);
    try {
      const updatedNote = await updateNote(noteId, note);
      console.log("Nota actualizada:", updatedNote);
      setNotas((prevNotas) =>
        prevNotas.map((n) => (n.nota_id === noteId ? updatedNote : n))
      );
      // Opcional: Mostrar mensaje de éxito al usuario
    } catch (error) {
      console.error("Error al actualizar la nota:", error);
      // Opcional: Mostrar mensaje de error al usuario
    }
  };

  const handleDeleteClick = async (noteId) => {
    try {
      await deleteNote(noteId);
      console.log("Nota eliminada");
      setNotas((prevNotas) => prevNotas.filter((n) => n.nota_id !== noteId));
      // Opcional: Mostrar mensaje de éxito al usuario
    } catch (error) {
      console.error("Error al eliminar la nota:", error);
      // Opcional: Mostrar mensaje de error al usuario
    }
  };
  const handleNewNoteClick = () => {
    setNote({
      titulo: "",
      subtitulo: "",
      fecha: null, // Ajusta según cómo manejes las fechas
      ideas_clave: "",
      notas_clave: "",
      resumen: "",
    });
  };

  const DrawerHeaderStyled = styled(DrawerHeader)({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    justifyContent: "flex-end",
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "white",
    backgroundImage: "url(https://source.unsplash.com/random?wallpapers)", // Asegúrate de que esta es la URL de tu imagen
  });

  const DrawerContent = styled("div")({
    overflowY: "auto", // Habilita el desplazamiento vertical solo si es necesario
    maxHeight: "calc(100vh - tamaño de tu header)", // Ajusta el tamaño de tu header
    // Resto de tus estilos...
  });

  const AccordionStyled = styled(Accordion)({
    boxShadow: "none",
    backgroundColor: "#E5E4E2",
    "&:before": {
      display: "none",
    },
    // Resto de tus estilos...
  });
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          open={open}
          sx={{
            backgroundColor: "#424242", // Un color primario más vibrante
            color: "#FFFFFF",
            boxShadow: "none", // Opcional: elimina la sombra para un diseño más plano
            borderBottom: "1px solid #FFFFFF1A", // Agrega un borde sutil en la parte inferior
          }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1 }}
            >
              IdeaCatcher by dinostudio
            </Typography>
            {/* Botón de cerrar sesión */}
            <IconButton
              color="inherit"
              onClick={handleLogout}
              aria-label="logout"
            >
              <ExitToAppIcon />
            </IconButton>
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
          <DrawerHeaderStyled>
            <IconButton style={{ color: "white" }} onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeaderStyled>
          <DrawerContent>
            <List>
              <ListItem button onClick={handleNewNoteClick}>
                <ListItemIcon>
                  <AddIcon /> {/* Asegúrate de importar AddIcon */}
                </ListItemIcon>
                <ListItemText primary="Create note" />
              </ListItem>

              {notas.map((nota) => (
                <ListItem key={nota.nota_id} disablePadding>
                  <ListItemButton onClick={() => handleNoteClick(nota.nota_id)}>
                    <CardNote titulo={nota.titulo} fecha={nota.fecha} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </DrawerContent>
        </Drawer>
        <Main open={open}>
          <DrawerHeader />
          <CornellNoteForm note={note} setNote={setNote}></CornellNoteForm>
          <FloatingActionButtons>
            {!isEditing && (
              <Tooltip title="Guardar nota" aria-label="guardar">
                <Fab
                  color="primary"
                  size="medium"
                  onClick={handleSaveClick}
                  sx={{ m: 1 }}
                >
                  <SaveIcon />
                </Fab>
              </Tooltip>
            )}
            {isEditing && (
              <>
                <Tooltip title="Guardar cambios" aria-label="editar">
                  <Fab
                    color="secondary"
                    size="medium"
                    onClick={() =>
                      isNoteSelected ? handleEditClick(note.nota_id) : () => {}
                    }
                    sx={{ m: 1 }}
                  >
                    <EditIcon />
                  </Fab>
                </Tooltip>
                <Tooltip title="Eliminar nota" aria-label="eliminar">
                  <Fab
                    color="error"
                    size="medium"
                    onClick={() =>
                      isNoteSelected
                        ? handleDeleteClick(note.nota_id)
                        : () => {}
                    }
                    sx={{ m: 1 }}
                  >
                    <DeleteIcon />
                  </Fab>
                </Tooltip>
              </>
            )}
          </FloatingActionButtons>
        </Main>
      </Box>
    </ThemeProvider>
  );
}
