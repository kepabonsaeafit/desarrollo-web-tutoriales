# Tutorial 06 — Errores encontrados y correcciones

Siguiendo los pasos del tutorial para armar el backend con NestJS, estos fueron los errores que salieron y cómo se solucionaron de forma sencilla:

1. **Falta el `.js` al importar `AppModule` en `main.ts`**
   El código del documento traía `from './app.module'`. Al correrlo salía error diciendo que no encontraba el archivo. Se cambió a `from './app.module.js'` (con la extensión), igual que en los demás archivos.

2. **`bootstrap()` llamado sin `await` en `main.ts`**
   Se llamaba a la función directamente sin esperar a que terminara de arrancar. Se le puso `await bootstrap();` para que inicie en orden y avise claramente si ocurre algún problema al prender el servidor.

3. **Herramientas de revisión buscando la carpeta `test/` que se mandó a borrar**
   El tutorial pide eliminar la carpeta `test/`, pero luego deja a Prettier y Oxlint revisándola en el `package.json`. Al no existir la carpeta, salían advertencias de rutas no encontradas. Se dejaron los comandos apuntando únicamente a `src/`.

4. **Permiso para instalar la base de datos SQLite (`better-sqlite3`)**
   Al hacer `npm install`, la librería de SQLite se bloqueaba porque requiere permisos para compilar sus componentes. Se agregó la autorización (`allowScripts`) en el `package.json` para que instale derecho sin errores.

5. **Falta indicar la carpeta de origen al compilar (`npm run build`)**
   Al mandar a construir el proyecto, salía un error pidiendo definir cuál era la carpeta principal de los archivos. Se especificó `"rootDir": "./src"` en `tsconfig.build.json` para que compile limpio en la carpeta `dist`.
