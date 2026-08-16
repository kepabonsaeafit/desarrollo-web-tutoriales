# Tarea tutorial 04: errores encontrados

Siguiendo el enunciado tal cual, estos fueron los errores que salieron a la luz
corriendo la app, y cómo quedaron arreglados. La tarea final (botón que borra el
último libro) está implementada como `BookService.deleteLastBook()` más un botón
"- Delete Last Book" en `BooksIndexView.vue`.

1. El input de Price (`type="number" min="0"`) no trae `step`, y el step por
   defecto de un number es 1: cualquier precio decimal (38.5, 12.99...) falla la
   validación nativa del formulario y el botón "Create Book" no hace nada
   (el navegador enfoca el campo inválido y bloquea el submit en silencio).
   Verificado en el navegador: con precio entero el formulario sí enviaba.
   Se añadió `step="0.01"` al input de price.

2. Los precios se mostraban con `${{ book.price }}`: "45" y "18.5" en vez de
   "45.00" y "18.50" (mismo problema del tutorial 02). Se cambió a
   `book.price.toFixed(2)` en `BooksIndexView.vue` y `BooksShowView.vue`.

3. Las portadas usaban todas la misma URL `picsum.photos/seed/picsum/536/354`
   (seed fija), o sea la misma imagen para los tres libros (mismo error del
   tutorial 02). Se cambió a un binding `:src` con `seed/${book.id}` para que
   cada libro tenga su propia imagen.

4. `BooksShowView.vue` traía la clase `prose`, que es del plugin
   `@tailwindcss/typography` (no instalado): no hacía nada. Se quitó.

5. `BooksShowView.vue` tenía `lg:col-span-2` dentro de un `grid-cols-1`,
   resto de un layout que no se usa (mismo caso del tutorial 02). Se quitó.

6. Un id inválido (`/books/abc`, `/books/999`) dejaba la página en blanco:
   `Number(route.params.id)` da `NaN`, `getBookById` devuelve `undefined` y el
   `v-if="book"` ocultaba todo el contenido sin ningún mensaje. Se añadió un
   `v-else` con "Book not found.".

7. `PiniaConfig.init()` hace `JSON.parse(savedState)` sin protección: si la key
   `piniaState` queda corrupta (edición manual a medias, escritura truncada), la
   app crashea en el arranque y solo se recupera borrando la clave a mano. Se
   envolvió en `try/catch` con re-seed como fallback. Nota: si cambia la
   *forma* del estado (p. ej. se renombra la store), el JSON sigue siendo válido
   y sí toca borrar la clave manualmente, como advierte el enunciado.

Detalle menor: la sección 1 del enunciado compara `b.id == bookId` con
comparación laxa; la sección 2 lo reemplaza por `getBookById` con `===`, así que
no hizo falta corregirlo.
