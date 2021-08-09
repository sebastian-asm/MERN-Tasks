import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const TareaSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  estado: {
    type: Boolean,
    default: false,
  },
  proyecto: {
    type: Schema.Types.ObjectId,
    ref: 'Proyecto',
  },
  creado: {
    type: Date,
    default: Date.now(),
  },
});

export default model('Tarea', TareaSchema);
