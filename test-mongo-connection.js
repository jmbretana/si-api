// Script para probar la conexión a MongoDB
require('dotenv').config();
const mongoose = require('mongoose');

console.log('Probando conexión a MongoDB...');
console.log('URI:', process.env.MONGODB_URI?.replace(/:[^:@]+@/, ':****@'));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Conexión exitosa a MongoDB!');
    console.log('Host:', mongoose.connection.host);
    console.log('Database:', mongoose.connection.name);
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Error de conexión:', error.message);
    console.error('\nPosibles soluciones:');
    console.error('1. Verifica que el usuario existe en MongoDB Atlas');
    console.error('2. Verifica que la contraseña sea correcta');
    console.error('3. Verifica que tu IP esté en la lista de Network Access');
    console.error('4. Si la password tiene caracteres especiales, codifícala en URL');
    process.exit(1);
  });
