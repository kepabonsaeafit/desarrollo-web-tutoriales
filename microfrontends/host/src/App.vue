<script setup>
// El host es la aplicación principal que monta y desmonta los microfrontends.

import { onMounted, onUnmounted, ref } from "vue";
import MicroFrontendView from "./MicroFrontendView.vue";

// Cualquier ruta distinta de "/calculator" se muestra como la página de inicio.
const path = ref(location.pathname === "/calculator" ? "/calculator" : "/");

// Aqui tenemos los tres microfrontends que vamos a montar cuando sean requeridos.
// Los imports no son archivos de esta carpeta. Module Federation los busca en las URLs definidas en vite.config.js.
const loadMicroFrontendCalculator = () => import("calculator/mount");
const loadMicroFrontendNews = () => import("news/mount");
const loadMicroFrontendCurrency = () => import("currency/mount");

// La función "go" cambia la dirección sin recargar la página.
// Al cambiar de ruta, Vue crea o destruye cada MicroFrontendView y así monta o desmonta los microfrontends correspondientes.
// Por ejemplo, si la ruta es "/calculator", se monta el microfrontend de la calculadora.
// Si la ruta es "/", se monta el microfrontend de noticias y el conversor de moneda.
function go(next) {
  if (next === path.value) return;
  history.pushState(null, "", next);
  path.value = next;
}

// La función "onPopState" se ejecuta cuando el usuario usa el botón atrás del navegador.
// Esto permite que el botón atrás funcione correctamente y cambie la ruta sin recargar la página.
function onPopState() {
  path.value = location.pathname === "/calculator" ? "/calculator" : "/";
}

// Como el host es la aplicación principal, debe escuchar el botón atrás del navegador.
// Esto permite que el botón atrás funcione correctamente y cambie la ruta sin recargar la página.
// Al destruir el host, se quita la escucha del botón atrás.
onMounted(() => window.addEventListener("popstate", onPopState));
onUnmounted(() => window.removeEventListener("popstate", onPopState));
</script>

<template>
  <div class="shell">
    <header class="header">
      <p class="brand">Microfrontends</p>
      <nav class="nav">
        <a href="/" :class="{ active: path === '/' }" @click.prevent="go('/')">Home</a>
        <a
          href="/calculator"
          :class="{ active: path === '/calculator' }"
          @click.prevent="go('/calculator')"
        >
          Calculator
        </a>
      </nav>
    </header>

    <main id="content">
      <MicroFrontendView
        v-if="path === '/calculator'"
        label="Calculator"
        :loader="loadMicroFrontendCalculator"
      />
      <div v-else class="stack">
        <MicroFrontendView label="News" :loader="loadMicroFrontendNews" />
        <MicroFrontendView label="Currency converter" :loader="loadMicroFrontendCurrency" />
      </div>
    </main>

    <footer class="footer">
      <p>Host shell</p>
    </footer>
  </div>
</template>
