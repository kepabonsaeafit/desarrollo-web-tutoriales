# Backend — Nest.js REST API

Proyecto backend desarrollado con [NestJS](https://nestjs.com/), TypeORM y SQLite.

## Scripts disponibles

Ubicado en la carpeta `backend/`:

- `npm run start:dev` — Inicia el servidor de desarrollo en modo watch (puerto 3000).
- `npm run build` — Compila la aplicación TypeScript a `dist/`.
- `npm run start:prod` — Ejecuta la versión compilada en `dist/main.js`.
- `npm run format` — Formatea el código fuente con Prettier.
- `npm run lint` — Analiza el código con Oxlint.

## Endpoints

- `GET /api` — Verificación de estado del backend (`API is running`).
- `GET /api/books` — Listado de todos los libros.
- `GET /api/books/:id` — Consulta de un libro por su ID.
- `POST /api/books` — Creación de un nuevo libro.
