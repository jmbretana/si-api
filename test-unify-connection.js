require("dotenv").config();
const mongoose = require("mongoose");

async function testUnifyConnection() {
  try {
    console.log("Conectando a MongoDB...");
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Conectado a MongoDB\n");

    // Listar todas las colecciones
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    console.log("📋 Colecciones disponibles:");
    collections.forEach((col) => console.log(`  - ${col.name}`));
    console.log("");

    // Buscar colecciones que contengan "unify"
    const unifyCollections = collections.filter((col) =>
      col.name.toLowerCase().includes("unify")
    );

    if (unifyCollections.length > 0) {
      console.log('🔍 Colecciones relacionadas con "unify":');
      for (const col of unifyCollections) {
        const count = await mongoose.connection.db
          .collection(col.name)
          .countDocuments();
        console.log(`  - ${col.name}: ${count} documentos`);

        if (count > 0) {
          const sample = await mongoose.connection.db
            .collection(col.name)
            .findOne();
          console.log(
            `    Ejemplo de documento:`,
            JSON.stringify(sample, null, 2)
          );
        }
      }
    } else {
      console.log('⚠️  No se encontraron colecciones con "unify" en el nombre');
    }

    await mongoose.disconnect();
    console.log("\n✅ Desconectado");
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

testUnifyConnection();
