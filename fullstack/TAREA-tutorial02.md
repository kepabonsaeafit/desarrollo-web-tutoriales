# Tarea tutorial 02: errores encontrados

Siguiendo el enunciado tal cual, estos fueron los errores que salieron a la luz corriendo la app,
y cómo quedaron arreglados.

1. **`Book.Category` con mayúscula, pero la vista pedía `book.category`.** Por eso la categoría
   salía en blanco en las tarjetas de `/main-point`. Se dejó `category` en minúscula en el
   modelo, los datos y las dos vistas.
2. **`show.ejs` usaba las dos formas a la vez**: `book.category` (vacío) en el párrafo de arriba
   y `book.Category` (sí funcionaba) en la ficha de abajo. Con el punto 1 ya queda consistente.
3. **`Main_Point` nunca ponía `title` en el `viewData`.** El `<h1>` del layout salía vacío en
   `/main-point` y en `/books/:id`. El enunciado "resuelve" esto poniendo un `if` en el layout
   para que no reviente, pero el título seguía sin aparecer. Se corrigió armando el `viewData`
   con `title` en ambos controladores, y se quitó el `if` del layout porque ya no hacía falta.
4. **`/books/abc` y `/books/999` tiraban un error 500** en vez de un 404. `parseInt` sin validar
   `NaN`, y `findById` lanzando un `Error` genérico que Express no sabe convertir en "no
   encontrado". Se cambió `findById` para que devuelva `undefined` si no encuentra el libro, se
   valida el id antes de buscar, y ahora ambos casos responden 404 con una vista de error simple
   (se agregó también un 404 genérico y un manejador de errores en `Index.ts`, que no existían).
5. **Archivo de datos `Books.ts` con mayúscula, pero el import decía `books.js`.** Funciona por
   casualidad en Windows, pero rompe en Linux/Mac (donde el sistema de archivos sí distingue
   mayúsculas). Se creó como `books.ts` en minúscula.
6. **Tres formas distintas de pasar datos a las vistas** (`{ viewData }`, `viewData` suelto,
   `{ book }`) en tres métodos del mismo controlador. Se dejó una sola convención: todos usan
   `{ viewData }` con su `title` adentro.
7. **`Main_Point` con guion bajo y mayúsculas**, distinto al resto de métodos del controlador
   (`index`, `about`, `contact`, todos en camelCase). Se renombró a `list`.
8. **`req`/`res` sin tipar** (`res: any`) en los métodos nuevos, perdiendo el tipado que sí tenían
   `index`/`about`/`contact`. Se tipificaron con `Request`/`Response` de Express.
9. **Precio con `toLocaleString()`**: $45.00 salía como "45" y $18.50 como "18.5". Se cambió a
   `toFixed(2)` para que siempre muestre los dos decimales.
10. **Las tres portadas usaban el mismo `seed/picsum`**, o sea la misma imagen para los tres
    libros. Se cambió a `seed/<id-del-libro>` para que cada uno tenga la suya.
11. **Clase `prose` en `show.ejs`**: es del plugin `@tailwindcss/typography`, que no está
    instalado, así que no hacía nada. Se quitó (la tarea pide no usar librerías de terceros).
12. **`lg:col-span-2` dentro de un `grid-cols-1`**: resto de un layout de columnas que nunca se
    usó así. Se quitó.
13. **La ruta se llama `/main-point`, que no dice nada de libros.** Se mantuvo (es la que pide
    el enunciado) pero se agregó también `/books` como alias más claro, apuntando al mismo
    método `list`.
