// LoginComponent.js
import React from "react";
import ImageComponent from "./ImageComponent";

const LoginComponent = () => {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1 }}>
        <ImageComponent />
      </div>
      <div style={{ flex: 1 }}>
        {/* Aquí puedes agregar el botón de inicio de sesión con Google */}
        <button>Iniciar sesión con Google</button>
      </div>
    </div>
  );
};

export default LoginComponent;
