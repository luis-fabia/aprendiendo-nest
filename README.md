# Prueba Técnica — Sistema de Recargas

Aplicación web para gestionar recargas de telefonía móvil, consultar proveedores y visualizar el historial de transacciones.
El proyecto está desarrollado con **NestJS + Prisma + MongoDB** en el backend y **React + Vite + TypeScript** en el frontend.

## Demo
* **Frontend:** https://practica-front-zsqg.onrender.com
* **Backend:** https://practica-nest-react.onrender.com
> La aplicación está desplegada en Render y utiliza MongoDB Atlas como base de datos.


## Tecnologías utilizadas
### Backend
* NestJS
* TypeScript
* Prisma ORM
* MongoDB
* JWT
* Passport
* bcrypt
* class-validator
* Elasticsearch
* Kibana

### Frontend
* React
* TypeScript
* Vite
* CSS
* Fetch API

### Infraestructura
* Render
* MongoDB Atlas
* Elastic Cloud / Kibana

## Funcionalidades

### Autenticación
* Inicio de sesión mediante usuario y contraseña.
* Autenticación mediante JWT.
* Token almacenado en `localStorage`.
* Expiración del token.
* Logout.
* Protección de las peticiones autenticadas.

### Recargas
* Consulta de proveedores disponibles.
* Selección del proveedor.
* Ingreso del número celular.
* Ingreso del valor de la recarga.
* Validación de los datos.
* Procesamiento de la compra mediante la API de Puntored.
* Generación de un ticket después de una compra exitosa.

### Historial
* Consulta de transacciones realizadas.
* Visualización de:

  * Número celular.
  * Valor.
  * ID de transacción.
  * Fecha de creación.

### Logging
Se implementó un sistema de logging para registrar eventos importantes de la aplicación.
Los logs contienen información estructurada, por ejemplo:

json
{
  "event": "SUPPLIERS_SUCCESS",
  "count": 4,
  "timestamp": "2026-10-05T20:00:00.000Z"
}

Los registros se envían a **Elasticsearch** y pueden ser visualizados mediante **Kibana**.

Estructura del proyecto
Prueba-Tecnica/
│
├── backend/
│   ├── src/
│   │   ├── auth-login/
│   │   ├── buy/
│   │   ├── suppliers/
│   │   ├── transaction/
│   │   ├── elastic/
│   │   ├── prisma/
│   │   ├── app.module.ts
│   │   └── main.ts
│   │
│   ├── prisma/
│   │   └── schema.prisma
│   │
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── componentes/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── styles/
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
│   ├── package.json
│   └── .env
│
└── README.md

# Requisitos

Antes de ejecutar el proyecto localmente necesitas:

* Node.js
* npm
* MongoDB Atlas
* Credenciales de la API de Puntored
* Cuenta de Elasticsearch / Elastic Cloud si se desea utilizar el sistema de logs


# Instalación

Clonar el repositorio:
git clone https://github.com/luis-fabia/aprendiendo-nest
cd Prueba-Tecnica

## Backend
Entrar al directorio:
cd backend

Instalar dependencias:
npm install

Generar el cliente de Prisma:
npx prisma generate

Crear el archivo `.env`:
DATABASE_URL="mongodb+srv://..."
JWT_SECRET="..."
PUNTORED_API_KEY="..."
PUNTORED_HEADER="..."
PUNTORED_AUTH_URL="..."
PUNTORED_USER="..."
PUNTORED_PASSWORD="..."
ELASTICSEARCH_URL="..."
ELASTICSEARCH_API_KEY="..."
FRONTEND_URL="http://localhost:5173"


Iniciar el backend en desarrollo:
npm run start:dev
El backend estará disponible normalmente en:
http://localhost:3000

# Frontend
Desde la raíz del proyecto:
cd frontend
Instalar dependencias:
npm install
Crear el archivo `.env`:
VITE_API_URL=http://localhost:3000

Iniciar el frontend:
npm run dev
La aplicación estará disponible normalmente en:
http://localhost:5173

# Variables de entorno

## Backend

| Variable                | Descripción                         |
| ----------------------- | ----------------------------------- |
| `DATABASE_URL`          | URL de conexión a MongoDB Atlas     |
| `JWT_SECRET`            | Clave utilizada para firmar los JWT |
| `PUNTORED_API_KEY`      | API Key de Puntored                 |
| `PUNTORED_HEADER`       | Header requerido por Puntored       |
| `PUNTORED_AUTH_URL`     | URL de autenticación de Puntored    |
| `PUNTORED_USER`         | Usuario de Puntored                 |
| `PUNTORED_PASSWORD`     | Contraseña de Puntored              |
| `ELASTICSEARCH_URL`     | Endpoint de Elasticsearch           |
| `ELASTICSEARCH_API_KEY` | API Key de Elasticsearch            |
| `FRONTEND_URL`          | URL permitida para CORS             |

## Frontend

| Variable       | Descripción          |
| -------------- | -------------------- |
| `VITE_API_URL` | URL base del backend |


# API

### Login
http
POST /auth/login

Ejemplo:
json
{
  "username": "usuario",
  "password": "contraseña"
}

Respuesta exitosa:
json
{
  "accesToken": "..."
}


## Proveedores
http
GET /suppliers
Este endpoint requiere autenticación mediante JWT.

Header:
http
Authorization: Bearer <token>

## Realizar recarga
http
POST /buy

Header:
http
Authorization: Bearer <token>

Body:
json
{
  "supplierId": "id-del-proveedor",
  "cellPhone": "3001234567",
  "value": 10000
}

## Consultar transacciones
http
GET /transaction

Header:
http
Authorization: Bearer <token>

# Seguridad

El proyecto implementa varias medidas de seguridad:

* Autenticación mediante JWT.
* Contraseñas almacenadas utilizando hashing con bcrypt.
* Protección de endpoints mediante autenticación.
* Variables sensibles almacenadas mediante variables de entorno.
* 
El token JWT tiene una duración limitada y, cuando expira, el frontend elimina la sesión y solicita nuevamente autenticación.

# Logging y monitoreo
Los eventos relevantes del backend se registran mediante un servicio centralizado de logging.

El flujo es:

NestJS
   │
   ▼
AppLogger
   │
   ├──► Console
   │
   └──► Elasticsearch
             │
             ▼
           Kibana

Los logs utilizan una estructura JSON para facilitar su búsqueda y análisis.
Ejemplo:

json
{
  "event": "SUPPLIERS_REQUEST",
  "timestamp": "2026-10-05T20:00:00.000Z"
}

# Despliegue

El proyecto se encuentra desplegado en **Render**.
### Backend
https://practica-nest-react.onrender.com
El backend utiliza variables de entorno configuradas directamente en Render.

### Frontend
https://practica-front-zsqg.onrender.com
El frontend utiliza:
VITE_API_URL=https://practica-nest-react.onrender.com

# Build
## Backend
npm run build
Para ejecutar la versión compilada:
npm run start:prod


## Frontend
npm run build
Los archivos generados se encuentran en:
frontend/dist


# Flujo principal de la aplicación


Usuario
   │
   ▼
Login
   │
   ▼
JWT
   │
   ▼
Consulta de proveedores
   │
   ▼
Seleccionar proveedor
   │
   ▼
Ingresar celular y valor
   │
   ▼
Realizar recarga
   │
   ▼
API Puntored
   │
   ▼
Registrar transacción
   │
   ▼
Mostrar ticket
   │
   ▼
Consultar historial

# Consideraciones
La instancia gratuita de Render puede entrar en estado de suspensión después de un período de inactividad. En ese caso, la primera petición puede tardar 
unos segundos mientras el servicio vuelve a estar disponible.
