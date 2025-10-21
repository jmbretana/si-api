# API Testing Examples

## Crear un nuevo registro

```bash
curl -X POST http://localhost:3000/api/ori \
  -H "Content-Type: application/json" \
  -d '{
    "id": "test-001",
    "ori": 100,
    "oriSeconds": 200,
    "username": "admin"
  }'
```

## Obtener todos los registros

```bash
curl http://localhost:3000/api/ori
```

## Obtener un registro por ID

```bash
curl http://localhost:3000/api/ori/test-001
```

## Actualizar un registro

```bash
curl -X PUT http://localhost:3000/api/ori/test-001 \
  -H "Content-Type: application/json" \
  -d '{
    "ori": 150,
    "oriSeconds": 250,
    "username": "admin"
  }'
```

## Eliminar un registro

```bash
curl -X DELETE http://localhost:3000/api/ori/test-001
```

## Health Check

```bash
curl http://localhost:3000/health
```
