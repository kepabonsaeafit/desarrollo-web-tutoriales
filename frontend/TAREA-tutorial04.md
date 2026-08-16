# Tutorial 04 — Tarea y correcciones al enunciado

Tarea implementada: botón "- Delete Last Book" en `BooksIndexView.vue`
(`BookService.deleteLastBook()` borra el último libro de la store).

Errores del enunciado encontrados y corregidos:

| # | Error | Corrección |
|---|-------|------------|
| 1 | Input de price sin `step`: los decimales fallan la validación nativa y el formulario nunca se envía | `step="0.01"` |
| 2 | Precios sin formato ("45" en vez de "45.00") | `book.price.toFixed(2)` en listado y detalle |
| 3 | Misma imagen para todos los libros (seed fija de picsum) | `:src` con `seed/${book.id}` |
| 4 | Clase `prose` de `@tailwindcss/typography` (no instalado) | Se quitó |
| 5 | `lg:col-span-2` huérfano dentro de un `grid-cols-1` | Se quitó |
| 6 | `/books/:id` inválido dejaba la página en blanco | `v-else` con "Book not found." |
| 7 | `JSON.parse(piniaState)` sin protección: clave corrupta crashea el arranque | `try/catch` con re-seed |
