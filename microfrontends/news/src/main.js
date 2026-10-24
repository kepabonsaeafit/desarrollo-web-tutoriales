// Las noticias son un microfrontend que se monta y desmonta cuando el host lo requiere.

import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";

// La función mount dibuja las noticias dentro del elemento HTML que se le pasa (por lo general, un div).
// En host/src/MicroFrontendView.vue línea 37 el host llama a esta función.
// createApp prepara la aplicación de Vue y app.mount la muestra dentro de ese elemento.
// app.unmount() retorna una función que quita las noticias cuando el host desmonta este microfrontend.
// En host/src/MicroFrontendView.vue línea 48 se llama esa función.
export function mount(el) {
  const app = createApp(App);
  app.mount(el);
  return () => app.unmount();
}

// El código siguiente busca un elemento id="app" en el HTML.
// Si existe, muestra las noticias ahí. Esa página es http://localhost:5175.
// El host no tiene #app, así que al importar este archivo no dibuja las noticias por su cuenta.
// El host decide dónde mostrarlas llamando a mount() con su propio div.
const standalone = document.querySelector("#app");
if (standalone) mount(standalone);

// Lo anterior permite que este archivo se ejecute como una aplicación independiente (localhost:5175)
// O como un microfrontend en otra aplicación (ej: en el host).