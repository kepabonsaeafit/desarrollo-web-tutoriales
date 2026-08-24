# Tutorial 05 — Tarea y correcciones al enunciado

Tarea implementada: refactor de las malas prácticas introducidas por el propio
enunciado (código duplicado, servicio genérico, filtrado con `ref`+`watch` y
estado inicial de Pinia repetido), sin cambiar el comportamiento visible de la app.

Errores del enunciado encontrados y corregidos:

| # | Error | Corrección |
|---|-------|------------|
| 1 | `formatToCOP` copiado y pegado igual en `BooksIndexView.vue` y `BooksShowView.vue` | Se extrajo a `src/utils/format.ts` e importado en ambas vistas |
| 2 | El enunciado pedía crear `OtherService.ts` (export default) solo para envolver `BookService.getBooks()` y sacar categorías únicas: nombre "cajón de sastre" y patrón de export distinto al resto de servicios (`export class X`) | Se agregó `BookService.getUniqueCategories()` como método estático; no se creó `OtherService.ts` |
| 3 | Filtro de categoría con `ref(books)` + `watch(selectedCategory, ...)` reasignando `.value` a mano: doble estado a mantener sincronizado (anti-patrón de Vue) | `const filteredBooks = computed(() => ...)` |
| 4 | `PiniaConfig.ts`: el objeto de estado inicial `{ book: {...}, review: {...} }` quedaba duplicado en dos ramas (sin `savedState` y en el `catch` de `JSON.parse`) | Se extrajo `PiniaConfig.buildInitialState()` (privado, estático), usado en ambas ramas |
| 5 | Extensión `.js` en imports de tipos inconsistente entre los archivos nuevos (`reviewstore.ts` sí la usa, `reviewseeder.ts`/`ReviewService.ts` no) | Se estandarizó `.js` en todos los imports de `@/interfaces/...`, igual que `bookstore.ts` |
| 6 | `bookSeeder` (tutorial04) tiene precios estilo USD (`12.99`, `45.0`, `18.5`); al formatear con `formatToCOP` (COP, sin decimales) el resultado es absurdo (`$13 COP` por un libro) | Se multiplicaron los precios de `bookSeeder` por 1000 (`12990`, `45000`, `18500`) para que se vean como pesos colombianos reales |
