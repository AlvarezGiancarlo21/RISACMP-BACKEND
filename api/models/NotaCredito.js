const mongoose = require("mongoose");

const notaCreditoSchema = new mongoose.Schema(
  {
    codigo: {
      type: String,
      required: true,
    },
    codigoFactura: {
      type: String,
      required: true,
    },
    rucProveedor: {
      type: String,
      required: true,
    },
    razonSocial: {
      type: String,
      required: true,
    },
    tipo: {
      type: String,
      required: false,
    },
    descipcion: {
      type: String,
      required: true,
    },
    productos: [
      {
        nombre: {
          type: String,
          required: false,
        },
        cantidad: {
          type: Number,
          required: false,
        },
        unidad: {
          type: String,
          // enum: ["kg", "g", "l", "ml"],
          required: false,
        },
        precio_unidad: {
          type: Number,
          required: false,
        },
        cantidad_nc: {
          type: Number,
          required: false,
        },
        total: {
          type: Number,
          required: false,
        },
      },
    ],
    fechaEmision: {
      type: Date,
      required: true,
    },
    fechaIngreso: {
      type: Date,
      required: true,
    },
    monto: {
      type: Number,
      required: true,
    },
    monto_nc: {
      type: Number,
      required: true,
    },
    monto_diferencia: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("NotaCredito", notaCreditoSchema);
