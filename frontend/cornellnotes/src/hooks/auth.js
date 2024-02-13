import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Aquí deberías verificar si el usuario está autenticado
    // Esto puede ser un token en localStorage, una cookie de sesión, etc.
    const user = localStorage.getItem("user"); // Ejemplo simplificado
    setIsAuthenticated(!!user);

    // Si no está autenticado, redirige a la página de inicio de sesión
    if (!user) {
      navigate("/");
    }
  }, [navigate]);

  return isAuthenticated;
};

export default useAuth;
