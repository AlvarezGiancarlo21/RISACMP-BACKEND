const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quantitySchema = new Schema({
  kilos: {
    type: Number,
    required: true
  },
  units: {
    type: Number,
    required: true
  }
});

const orderSchema = new Schema({
  orderCode: {
    type: String,
    required: true,
    unique: true
  },
  customerName: {
    type: String,
    required: true
  },
  orderDate: {
    type: Date,
    required: true
  },
  orderStatus: {
    type: String,
    required: true
  },
  productCode: {
    type: String,
    required: true
  },
  quantity: {
    type: quantitySchema,
    required: true
  }
});

module.exports = mongoose.model('Order', orderSchema);
