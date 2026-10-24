// Las noticias son un microfrontend que se monta y desmonta cuando el host lo requiere.

<script setup>
// Lista fija de cuatro noticias. No se pide a un servidor.
const news = [
  {
    title: "Campus library extends weekend hours",
    summary: "The central library stays open until 10 p.m. on Saturdays this semester.",
  },
  {
    title: "New bike racks by the engineering building",
    summary: "Forty additional spaces are available starting Monday.",
  },
  {
    title: "Student research fair opens next week",
    summary: "Projects from every faculty will be on display in the main hall.",
  },
  {
    title: "Cafeteria adds a vegetarian lunch",
    summary: "A rotating vegetarian option will be served on weekdays.",
  },
];
</script>

<template>
  <section class="news">
    <h2>News</h2>
    <p class="tag">Vue</p>
    <ul>
      <!-- Vue crea un li por cada noticia. key identifica cada elemento de la lista. -->
      <li v-for="item in news" :key="item.title">
        <h3>{{ item.title }}</h3>
        <p>{{ item.summary }}</p>
      </li>
    </ul>
  </section>
</template>
