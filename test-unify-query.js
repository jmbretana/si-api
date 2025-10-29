require('dotenv').config();
const mongoose = require('mongoose');

async function testUnifyQuery() {
  try {
    console.log('Conectando a MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado\n');

    // Definir el schema y modelo igual que en el código
    const unifySchema = new mongoose.Schema({
      id: Number,
      ori: Number,
      oriSeconds: Number,
      ori_timestamp: Date,
      sp: Number,
      spSeconds: Number,
      sp_timestamp: Date,
      fc: Number,
      fcSeconds: Number,
      fc_timestamp: Date,
    });

    const UnifyModel = mongoose.model('unifyData', unifySchema, 'unifyDatas');

    console.log('🔍 Probando consultas...\n');

    // Test 1: findOne() sin ordenamiento
    console.log('1. findOne() sin ordenamiento:');
    const result1 = await UnifyModel.findOne();
    console.log('   Resultado:', result1 ? '✅ Encontrado' : '❌ null');
    if (result1) console.log('   Datos:', JSON.stringify(result1, null, 2));

    // Test 2: findOne() con ordenamiento por _id
    console.log('\n2. findOne().sort({ _id: -1 }):');
    const result2 = await UnifyModel.findOne().sort({ _id: -1 });
    console.log('   Resultado:', result2 ? '✅ Encontrado' : '❌ null');
    if (result2) console.log('   Datos:', JSON.stringify(result2, null, 2));

    // Test 3: countDocuments
    console.log('\n3. countDocuments():');
    const count = await UnifyModel.countDocuments();
    console.log('   Total documentos:', count);

    // Test 4: find() para ver todos
    console.log('\n4. find() todos los documentos:');
    const all = await UnifyModel.find();
    console.log('   Total encontrados:', all.length);
    all.forEach((doc, i) => {
      console.log(`   Doc ${i + 1}:`, JSON.stringify(doc, null, 2));
    });

    await mongoose.disconnect();
    console.log('\n✅ Desconectado');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

testUnifyQuery();
