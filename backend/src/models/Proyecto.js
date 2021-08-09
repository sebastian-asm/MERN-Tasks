import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const ProyectoSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  creador: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
  },
  creado: {
    type: Date,
    default: Date.now(),
  },
});

export default model('Proyecto', ProyectoSchema);
