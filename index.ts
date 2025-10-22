import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import connectDB from './src/config/database';
import routes from './src/routes';

const app = express();
const PORT = process.env.PORT || 3001;

// Conectar a MongoDB
connectDB();

// CORS Configuration - Permite todos los dominios
const corsOptions = {
  origin: true, // Acepta cualquier origen
  credentials: true, // Permite cookies y auth headers
  optionsSuccessStatus: 200,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas principales
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: '¡Bienvenido a si-api!',
    status: 'OK',
    timestamp: new Date().toISOString(),
  });
});

app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    database: 'connected',
  });
});

// API Routes
app.use('/api', routes);

// Manejo de rutas no encontradas
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    path: req.path,
  });
});

// Manejo de errores
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Algo salió mal',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Error interno del servidor',
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`API disponible en http://localhost:${PORT}/api`);
});
