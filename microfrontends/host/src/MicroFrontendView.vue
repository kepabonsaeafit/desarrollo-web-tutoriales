<script setup>
// MicroFrontendView carga un microfrontend dentro de un div y lo quita cuando Vue destruye este componente.
// App.vue lo crea o lo destruye con v-if al cambiar de ruta.

import { onMounted, onUnmounted, ref } from "vue";

// loader es una de las funciones de App.vue, por ejemplo loadMicroFrontendNews.
// label es el nombre que se muestra si ese microfrontend no se puede cargar.
const props = defineProps({
  loader: { type: Function, required: true },
  label: { type: String, required: true },
});

const root = ref(null);
const error = ref("");
let unmountRemote;
// Pasa a false en cuanto este componente se destruye.
// Así, si la descarga termina después, no se dibuja el microfrontend en un elemento que ya no existe.
let alive = true;

// Cada microfrontend expone una función "mount", pero Module Federation puede entregarlo como export nombrado o como export por defecto.
function resolveMount(mod) {
  if (typeof mod.mount === "function") return mod.mount;
  if (typeof mod.default === "function") return mod.default;
  if (typeof mod.default?.mount === "function") return mod.default.mount;
  throw new Error("Microfrontend did not expose mount()");
}

// Vue ejecuta esto cuando App.vue muestra este MicroFrontendView.
// Se descarga el microfrontend y se llama su mount con el div de abajo (ref="root").
// En ref="root" se montará el microfrontend.
// mount devuelve la función que después sirve para desmontar el microfrontend completamente.
onMounted(async () => {
  try {
    const mod = await props.loader();
    if (!alive) return;
    unmountRemote = resolveMount(mod)(root.value);
  } catch (err) {
    console.error(err);
    if (alive) error.value = `${props.label} could not be loaded.`;
  }
});

// Vue ejecuta esto cuando App.vue quita este MicroFrontendView, por ejemplo al pasar de "/" a "/calculator".
// Se llama la función que devolvió mount para desmontar el microfrontend completamente.
onUnmounted(() => {
  alive = false;
  unmountRemote?.();
});
</script>

<template>
  <p v-if="error" class="remote-error">{{ error }}</p>
  <!-- v-once evita que Vue borre el HTML que el microfrontend dibujó dentro de este div. -->
  <!-- Vue podría borrar el div con operaciones reactivas, por eso se usa v-once para evitarlo. -->
  <div ref="root" v-once></div>
</template>
