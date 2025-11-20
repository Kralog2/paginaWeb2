# PaginaWeb2

Guía y plataforma para modding de videojuegos, desarrollada con Node.js, Express y EJS.

## Tecnologías utilizadas

- **Node.js** (v18 o superior recomendado)
- **Express** (Framework para servidor web)
- **EJS** (Motor de plantillas)
- **MySQL** (Base de datos relacional)
- **Tailwind CSS** (Framework de estilos)
- **bcrypt** (Encriptación de contraseñas)
- **jsonwebtoken** (Autenticación con JWT)
- **dotenv** (Variables de entorno)
- **express-ejs-layouts** (Soporte para layouts en EJS)
- **cookie-parser** (Manejo de cookies)
- **nodemon** (Desarrollo con recarga automática)

## Requisitos previos

- Tener instalado **Node.js** y **npm**  
  [Descargar Node.js](https://nodejs.org/)
- Tener instalado **MySQL Server**  
  [Descargar MySQL](https://dev.mysql.com/downloads/mysql/)
- Crear una base de datos llamada `UserDB` y una tabla `users` con los siguientes campos:
  - `id` (INT, PRIMARY KEY, AUTO_INCREMENT)
  - `name` (VARCHAR)
  - `email` (VARCHAR, UNIQUE)
  - `password` (VARCHAR)
  - `role` (VARCHAR)

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/Kralog2/paginaWeb2.git
   cd paginaWeb2
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura el archivo `.env`:
   ```
   PORT=3000
   DB_HOST=localhost
   DB_USER=tu_usuario_mysql
   DB_PASS=tu_contraseña_mysql
   DB_NAME=UserDB
   JWT_SECRET=tu_clave_secreta
   ```

4. Genera los estilos de Tailwind:
   ```bash
   npm run build:css
   ```

5. Inicia el servidor:
   ```bash
   npm run dev
   ```

## Estructura del proyecto

```
src/
  server.js
  config/
  controllers/
  middleware/
  models/
  public/
  routes/
  views/
```

## Uso

- Accede a `http://localhost:3000` en tu navegador.
- Regístrate como usuario o inicia sesión.
- Si eres admin, accede al panel en `/admin/dashboard`.

## Crear usuario admin para pruebas

Puedes crear un usuario admin ejecutando este script  `createAdmin.js` en Node.js ejecútalo con:

```bash
node createAdmin.js
```
Ahora podras acceder con el usuario `Admin User`, El correo sera `admin@admin.com`, y la contraseña es `admin123!`.
 Esto puede ser personalizado dentro del propio archivo `createAdmin.js` y cambiar el usuario y contraseña.

---

**Proyecto escolar desarrollado por Kralog2**