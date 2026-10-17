<script setup lang="ts">
import { books } from '~/data/books'
</script>

<template>
  <div>
    <h1 class="h2 mb-3">Books</h1>
    <ul class="list-group">
      <li v-for="book in books" :key="book.id" class="list-group-item position-relative">
        <NuxtLink class="stretched-link text-decoration-none" :to="`/books/${book.id}`">
          {{ book.title }}
        </NuxtLink>
        <span class="text-body-secondary d-block small">{{ book.author }} · {{ book.year }}</span>
      </li>
    </ul>
  </div>
</template>
