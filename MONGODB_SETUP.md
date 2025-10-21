# Configuración de MongoDB Cloud (Atlas)

## Pasos para configurar MongoDB Atlas

### 1. Crear una cuenta en MongoDB Atlas

1. Ve a [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Regístrate o inicia sesión
3. Crea una organización (si aún no tienes una)

### 2. Crear un Cluster

1. Click en "Build a Database"
2. Selecciona el plan FREE (M0 Sandbox)
3. Elige la región más cercana a tu ubicación
4. Dale un nombre a tu cluster (ej: "Cluster0")
5. Click en "Create Cluster"

### 3. Configurar acceso a la base de datos

#### Crear un usuario de base de datos

1. En el menú lateral, ve a "Database Access"
2. Click en "Add New Database User"
3. Selecciona "Password" como método de autenticación
4. Ingresa un username (ej: "si-api-user")
5. Genera o ingresa una contraseña segura (guárdala!)
6. En "Database User Privileges", selecciona "Read and write to any database"
7. Click en "Add User"

#### Configurar Network Access

1. En el menú lateral, ve a "Network Access"
2. Click en "Add IP Address"
3. Para desarrollo, puedes usar "Allow Access from Anywhere" (0.0.0.0/0)
4. Para producción, agrega solo las IPs específicas
5. Click en "Confirm"

### 4. Obtener la cadena de conexión

1. Ve a "Database" en el menú lateral
2. Click en "Connect" en tu cluster
3. Selecciona "Connect your application"
4. Copia la cadena de conexión (connection string)
5. Reemplaza `<password>` con la contraseña del usuario que creaste
6. Reemplaza `<database>` con el nombre de tu base de datos (ej: "si-api-db")

Ejemplo de cadena de conexión:

```text
mongodb+srv://si-api-user:tu-password@cluster0.xxxxx.mongodb.net/si-api-db?retryWrites=true&w=majority
```

### 5. Configurar en tu proyecto

Pasos para configurar:

1. Abre el archivo `.env` en tu proyecto

2. Reemplaza el valor de `MONGODB_URI` con tu cadena de conexión

Ejemplo:

```env
MONGODB_URI=mongodb+srv://si-api-user:tu-password@cluster0.xxxxx.mongodb.net/si-api-db?retryWrites=true&w=majority
```

### 6. Probar la conexión

Inicia tu servidor:

```bash
npm run dev
```

Deberías ver en la consola algo como:

```text
MongoDB conectado: cluster0-shard-00-00.xxxxx.mongodb.net
Servidor corriendo en http://localhost:3000
```

## Troubleshooting

### Error: "MongoServerError: bad auth"

Posibles soluciones:

- Verifica que el usuario y contraseña sean correctos
- Asegúrate de que el usuario tenga los permisos adecuados

### Error: "MongooseServerSelectionError"

Posibles soluciones:

- Verifica que tu IP esté en la lista de Network Access
- Verifica que la URL de conexión sea correcta
- Verifica tu conexión a internet

### Error: "Authentication failed"

Posibles soluciones:

- La contraseña puede contener caracteres especiales que necesitan ser codificados
- Usa un codificador de URL para la contraseña si contiene caracteres especiales

## Mejores Prácticas

1. **Nunca** guardes la cadena de conexión en el código
2. **Siempre** usa variables de entorno (`.env`)
3. **No** subas el archivo `.env` a git (está en `.gitignore`)
4. Crea usuarios diferentes para desarrollo y producción
5. Usa contraseñas fuertes y únicas
6. En producción, restringe el acceso por IP
7. Habilita el monitoreo en MongoDB Atlas
8. Configura alertas para uso de recursos
