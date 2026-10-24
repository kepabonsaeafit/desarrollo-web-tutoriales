// El host es la aplicación principal que monta y desmonta los microfrontends.

import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";

createApp(App).mount("#host");
