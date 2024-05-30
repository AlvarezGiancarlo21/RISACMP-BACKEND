// controllers/orderController.js
const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
    const { orderCode, customerName, orderDate, orderStatus, productCode, quantity,observation } = req.body;
  
    if (!orderCode || !customerName || !orderDate || !orderStatus || !productCode || !quantity || !quantity.kilos || !quantity.units|| !observation) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
  
    try {
      // Verificar si el orderCode ya existe
      const existingOrder = await Order.findOne({ orderCode });
      if (existingOrder) {
        return res.status(400).json({ error: 'El código de orden ya existe' });
      }
  
      // Crear y guardar la nueva orden
      const newOrder = new Order({
        orderCode,
        customerName,
        orderDate,
        orderStatus,
        productCode,
        quantity,
        observation,
      });
  
      await newOrder.save();
      res.status(201).json(newOrder);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear la orden' });
    }
  };
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }
    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.updateOrderById = async (req, res) => {
    const orderId = req.params.id;
    const { customerName, orderDate, orderStatus, productCode, quantity, observation } = req.body;
  
    try {
      let order = await Order.findById(orderId);
  
      if (!order) {
        return res.status(404).json({ msg: 'Order not found' });
      }
  
      // Actualizamos los campos de la orden solo si se proporcionan en la solicitud
      if (customerName) order.customerName = customerName;
      if (orderDate) order.orderDate = orderDate;
      if (orderStatus) order.orderStatus = orderStatus;
      if (productCode) order.productCode = productCode;
      if (quantity) order.quantity = quantity;
      if (observation) order.observation = observation;

  
      await order.save();
  
      res.json({ msg: 'Order updated successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };
  
  

exports.deleteOrderById = async (req, res) => {
  try {
    let order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }

    await Order.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Order deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
