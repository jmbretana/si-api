# SI-API

API REST con Express.js y MongoDB

## Instalación

```bash
npm install
```

## Configuración

Pasos para configurar el proyecto:

1. Copia el archivo `.env.example` a `.env`

2. Configura tu conexión a MongoDB Cloud en el archivo `.env`

Ejemplo de configuración:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
```

## Uso

### Desarrollo con auto-reload

```bash
npm run dev
```

### Producción

```bash
npm start
```

## Estructura del Proyecto

```text
src/
├── config/          # Configuraciones (database, etc.)
├── controllers/     # Controladores HTTP
├── models/          # Modelos de Mongoose
├── routes/          # Definición de rutas
└── services/        # Lógica de negocio
```

### Organization Principles

- Keep cross-cutting concerns separated
- Place tests close to the code they test
- Use index.ts files for clean imports

## API Endpoints

### Ori Resource

#### Crear registro

Endpoint para crear un nuevo registro:

```http
POST /api/ori
Content-Type: application/json

{
  "id": "unique-id",
  "ori": 123,
  "oriSeconds": 456,
  "username": "user1"
}
```

#### Obtener todos los registros

```http
GET /api/ori
```

#### Obtener registro por ID

```http
GET /api/ori/:id
```

#### Actualizar registro

```http
PUT /api/ori/:id
Content-Type: application/json

{
  "ori": 789,
  "oriSeconds": 1011,
  "username": "user1"
}
```

#### Eliminar registro

```http
DELETE /api/ori/:id
```

## Tecnologías

- Node.js v20.16.0
- Express.js v5.1.0
- MongoDB con Mongoose
- Axios
- Dotenv

## Autor

jmbretana
