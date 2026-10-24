// La calculadora es un microfrontend que se monta y desmonta cuando el host lo requiere.

import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./style.css";

// La función mount dibuja la calculadora dentro del elemento HTML que se le pasa (por lo general, un div).
// En host/src/MicroFrontendView.vue línea 37 el host llama a esta función.
// createRoot prepara ese elemento para React y render muestra el componente App.
// mount retorna una función que quita la calculadora cuando el host desmonta este microfrontend.
// En host/src/MicroFrontendView.vue línea 48 se llama esa función.
export function mount(el) {
  const root = createRoot(el);
  root.render(<App />);
  return () => root.unmount();
}

// El código siguiente busca un elemento id="root" en el HTML.
// Si existe, muestra la calculadora ahí. Esa página es http://localhost:5174.
// El host no tiene #root, así que al importar este archivo no dibuja la calculadora por su cuenta.
// El host decide dónde mostrarla llamando a mount() con su propio div.
const standalone = document.querySelector("#root");
if (standalone) mount(standalone);

// Lo anterior permite que este archivo se ejecute como una aplicación independiente (localhost:5174)
// O como un microfrontend en otra aplicación (ej: en el host).
