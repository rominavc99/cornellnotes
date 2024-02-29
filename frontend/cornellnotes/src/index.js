import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
const [clientId, setClientId] = useState("");

useEffect(() => {
  axios
    .get("https://cornellnotes-2sn1.onrender.com/api/config")
    .then((response) => {
      setClientId(response.data.client_id);
    })
    .catch((error) => {
      console.error("Error al obtener la configuración:", error);
    });
}, []);

root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
