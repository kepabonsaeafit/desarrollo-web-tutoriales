<script setup lang="ts">
import { books } from '~/data/books'

definePageMeta({
  validate(route) {
    const param = String(route.params.id)
    return books.some((b) => b.id === param)
  },
})

const route = useRoute()
const id = computed(() => String(route.params.id))
const book = computed(() => books.find((b) => b.id === id.value))
</script>

<template>
  <article v-if="book">
    <p class="mb-1">
      <NuxtLink class="text-decoration-none small" to="/books">← All books</NuxtLink>
    </p>
    <h1 class="h2">{{ book.title }}</h1>
    <p class="lead mb-2">{{ book.author }} · {{ book.year }}</p>
    <p class="mb-0">{{ book.summary }}</p>
  </article>
</template>
