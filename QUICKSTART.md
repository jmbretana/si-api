# Inicio Rápido

## 1. Configurar MongoDB Atlas

Sigue los pasos detallados en [MONGODB_SETUP.md](./MONGODB_SETUP.md) para:

- Crear tu cluster en MongoDB Atlas
- Configurar usuario y permisos
- Obtener tu cadena de conexión

## 2. Configurar variables de entorno

```bash
cp .env.example .env
```

Edita `.env` y actualiza `MONGODB_URI` con tu cadena de conexión de MongoDB Atlas.

## 3. Instalar dependencias

```bash
npm install
```

## 4. Iniciar el servidor

```bash
npm run dev
```

El servidor estará disponible en `http://localhost:3000`

## 5. Probar la API

Ver ejemplos de uso en [API_EXAMPLES.md](./API_EXAMPLES.md)

Prueba rápida:

```bash
# Health check
curl http://localhost:3000/health

# Crear un registro
curl -X POST http://localhost:3000/api/ori \
  -H "Content-Type: application/json" \
  -d '{"id":"test-001","ori":100,"oriSeconds":200,"username":"admin"}'

# Listar registros
curl http://localhost:3000/api/ori
```

## Estructura del Proyecto

```text
si-api/
├── src/
│   ├── config/          # Configuración de DB
│   ├── controllers/     # Lógica HTTP
│   ├── models/          # Modelos de Mongoose
│   ├── routes/          # Definición de rutas
│   └── services/        # Lógica de negocio
├── index.js             # Punto de entrada
├── .env                 # Variables de entorno (no subir a git)
└── package.json         # Dependencias
```

## Comandos útiles

- `npm start` - Inicia el servidor en producción
- `npm run dev` - Inicia con auto-reload (desarrollo)
- `npm test` - Ejecuta tests (pendiente de configurar)

## Próximos pasos

1. Configura tests con Jest
2. Agrega validación con Zod
3. Implementa autenticación/autorización
4. Agrega logging estructurado (Winston)
5. Configura CI/CD

## Soporte

- Documentación completa: [README.md](./README.md)
- Setup MongoDB: [MONGODB_SETUP.md](./MONGODB_SETUP.md)
- Ejemplos API: [API_EXAMPLES.md](./API_EXAMPLES.md)
