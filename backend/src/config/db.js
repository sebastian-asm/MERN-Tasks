import mongoose from 'mongoose';

export default async function conectarDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log('Conexión a MongoDB');
  } catch (error) {
    console.log(error);
    process.exit(1); // Detener la app en caso de error
  }
}
