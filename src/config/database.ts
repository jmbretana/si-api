import mongoose from 'mongoose';

let isConnected = false;

const connectDB = async (): Promise<void> => {
  // Si ya está conectado, reutilizar la conexión
  if (isConnected && mongoose.connection.readyState === 1) {
    console.log('Usando conexión existente a MongoDB');
    return;
  }

  try {
    // Verificar que MONGODB_URI existe
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI no está definido en las variables de entorno');
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout más corto para serverless
      socketTimeoutMS: 45000,
    });

    isConnected = true;
    console.log(`MongoDB conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error conectando a MongoDB: ${(error as Error).message}`);
    isConnected = false;
    // No usar process.exit en serverless
    throw error;
  }
};

export default connectDB;
