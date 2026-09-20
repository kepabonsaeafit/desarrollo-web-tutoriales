# Tutorial 07 — Errores encontrados y correcciones

En este tutorial el frontend deja de usar datos guardados en el navegador y empieza a
pedirle los libros y las reseñas al backend. Estos son los problemas que salieron al
seguir el tutorial paso a paso.

## Errores que no dejaban correr la aplicación

| # | Problema | Qué se hizo |
|---|----------|-------------|
| 1 | El tutorial manda borrar los archivos de datos de prueba, pero en `PiniaConfig.ts` deja las líneas que los llaman. La aplicación no arranca porque busca archivos que ya no existen | Se borraron esas líneas |
| 2 | En ese mismo archivo queda una herramienta (`watch`) que ya no se usa. El revisor de código lo marca como error y no deja pasar | Se quitó |
| 3 | En la pantalla de detalle del libro el tutorial deja la variable `book` creada dos veces seguidas, una vieja y una nueva. Eso no compila | Se dejó solo la nueva y se borraron las tres líneas viejas |

## Descuidos y malas prácticas

| # | Problema | Qué se hizo |
|---|----------|-------------|
| 4 | En la pantalla de detalle pide leer el número del libro desde la dirección web **adentro** del arranque del componente. Eso va arriba, junto a las demás variables | Se movió arriba |
| 5 | Dice modificar `BooksReviews.vue`, pero el archivo se llama `BookReviews.vue` (sin la "s"). En Windows no se nota, en Mac y Linux rompe | Se trabajó sobre el archivo real |
| 6 | Manda borrar `OtherService.ts`, que en este proyecto nunca existió (se reemplazó en el tutorial 05) | No aplica |
| 7 | Las reseñas se crean dentro de la carpeta de los libros, no en su propia carpeta. Va en contra del orden que enseñó el tutorial 06 | Se dejó como pide el tutorial |

## El backend no revisa lo que le mandan

El tutorial no pone ninguna validación, y se nota probando la aplicación:

| # | Problema | Qué se hizo |
|---|----------|-------------|
| 8 | Se puede guardar una reseña con 99 estrellas. El límite de 1 a 5 está solo en la pantalla, así que basta saltarse la pantalla para meter cualquier número | Queda anotado; arreglarlo pide herramientas que el tutorial no explica |
| 9 | Si se manda una reseña para un libro que no existe, el backend responde "error interno" en vez de avisar que ese libro no existe | Queda anotado |
| 10 | Si se pide un libro que no existe, el backend responde que todo salió bien pero manda la respuesta vacía. Al frontend le funciona de casualidad: como llega vacío, muestra "Book not found" | Queda anotado |

## Cosas que el tutorial dañó de tareas anteriores

El tutorial pide **reemplazar todo** el código de la lista de libros, y el código nuevo
está peor que el que ya teníamos. Se siguió el tutorial al pie de la letra, así que
estos puntos quedan detectados pero **sin corregir**:

| # | Problema |
|---|----------|
| 11 | Vuelve la misma portada para todos los libros, que ya se había arreglado en el tutorial 05 |
| 12 | Vuelve el precio sin puntos de miles: se ve `$120000 COP` en vez de `$120.000 COP` |
| 13 | Como la pantalla de detalle sí quedó bien, el mismo libro se ve con dos precios distintos según dónde se mire |
| 14 | Se pierden el filtro por categoría (tarea del tutorial 05) y el botón para borrar el último libro (tarea del tutorial 04). El botón ya no se puede volver a poner porque el backend no ofrece forma de borrar libros |

## Cómo se comprobó

Con el backend y el frontend encendidos: la lista muestra los libros guardados en la
base de datos, el formulario crea libros que quedan guardados, y el detalle deja
escribir reseñas que también quedan guardadas. Borrando los datos del navegador la
aplicación sigue funcionando igual, que es justo lo que buscaba el tutorial.
