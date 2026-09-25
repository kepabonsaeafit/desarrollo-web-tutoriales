# Tutorial 08 — Errores encontrados y correcciones

En este tutorial el backend y el frontend se empaquetan con Docker y se publican
juntos en una máquina virtual de Google Cloud. La aplicación quedó funcionando en
`http://34.44.0.127`. Estos son los problemas que salieron en el camino.

## Errores que no dejaban funcionar el despliegue

| # | Problema | Qué se hizo |
|---|----------|-------------|
| 1 | El tutorial dice "aplique este cambio para todos los servicios", pero solo muestra `BookService`. Si no se cambia también `ReviewService`, en la nube las reseñas intentan conectarse al computador de cada visitante y no cargan. En el repositorio del profesor quedó sin cambiar | Se cambiaron los dos servicios |
| 2 | El `docker-compose.yml` construye el frontend, pero el tutorial 08 no trae su `Dockerfile` ni su `nginx.conf`. Están en el paso C del Tutorial GCP, así que hay que leer los dos documentos | Se tomaron del Tutorial GCP |
| 3 | La carpeta `dist` (el código ya compilado) estaba ignorada en tres lugares: la raíz, `backend/` y `frontend/`. El tutorial solo menciona la del backend, y sin las otras dos el frontend no llega a GitHub | Se quitó en los tres. En la raíz se dejó ignorada solo la del proyecto `fullstack`, que no se despliega |
| 4 | Al dejar de ignorar `dist`, el revisor de código del frontend empezó a revisar también el código compilado y marcó 545 errores falsos, así que `npm run lint` dejó de pasar | Se le indicó que no revise la carpeta `dist` |
| 5 | En la máquina virtual, `docker compose up -d` tal como está en el tutorial da "permiso denegado", porque el usuario no tiene permisos de Docker | Se ejecutó con `sudo`, como sí lo hace el Tutorial GCP |

## Cosas a tener en cuenta

| # | Situación | Qué se hizo |
|---|-----------|-------------|
| 6 | La base de datos en la nube arranca vacía: los libros que había en el computador no viajan a la máquina virtual | Se volvieron a crear los dos libros y una reseña desde la aplicación publicada |
| 7 | La dirección IP de la máquina puede cambiar si se apaga. En ese caso hay que volver a compilar el frontend y actualizar el `docker-compose.yml` | Queda anotado |
| 8 | El archivo `.env` con la dirección del backend no se sube a GitHub. No afecta, porque la dirección queda guardada dentro del frontend al compilarlo, pero hay que compilar con la IP correcta antes de subir | Se compiló con la IP de la máquina |
| 9 | La máquina `e2-micro` tiene solo 1 GB de memoria, poco para instalar las dependencias del backend dentro de Docker | Por precaución se le agregaron 2 GB de memoria de intercambio (swap) |
| 10 | El Tutorial GCP clona el repositorio con `sudo`, y así la carpeta queda a nombre del administrador | Se clonó sin `sudo`; solo los comandos de Docker lo usan |

## Cómo se comprobó

Desde el navegador, en `http://34.44.0.127`: la lista de libros carga desde el
backend en la nube, el formulario crea libros y el detalle permite publicar reseñas.
Después se apagaron y se volvieron a crear los contenedores, y los libros y la
reseña seguían ahí, lo que confirma que la base de datos se guarda fuera del
contenedor.
