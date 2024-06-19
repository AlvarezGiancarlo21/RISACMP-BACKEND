const Product = require('../models/Producto');

// Register a new product
exports.registerProducto = async (req, res) => {
  const { codigo, familia, subFamilia, proveedor, nombreProducto, fechaRegistro, stockActual, cantSolicitada, stockResul, unidMedida, almacen } = req.body;
  try {
    let producto = await Product.findOne({ codigo });
    if (producto) {
      return res.status(400).json({ msg: 'El producto ya existe' });
    }
    producto = new Product({ codigo, familia, subFamilia, proveedor, nombreProducto, fechaRegistro, stockActual, cantSolicitada, stockResul, unidMedida, almacen });
    await producto.save();
    res.json({ msg: 'Producto registrado exitosamente' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const productos = await Product.find();
    res.json(productos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
};

// Update product by ID
exports.updateProductsById = async (req, res) => {
  const { id } = req.params;
  const { codigo, familia, subFamilia, proveedor, nombreProducto, fechaRegistro, stockActual, cantSolicitada, stockResul, unidMedida, almacen } = req.body;
  try {
    let producto = await Product.findById(id);
    if (!producto) {
      return res.status(404).json({ msg: 'Producto no encontrado' });
    }
    producto.codigo = codigo || producto.codigo;
    producto.familia = familia || producto.familia;
    producto.subFamilia = subFamilia || producto.subFamilia;
    producto.proveedor = proveedor || producto.proveedor;
    producto.nombreProducto = nombreProducto || producto.nombreProducto;
    producto.fechaRegistro = fechaRegistro || producto.fechaRegistro;
    producto.stockActual = stockActual || producto.stockActual;
    producto.cantSolicitada = cantSolicitada || producto.cantSolicitada;
    producto.stockResul = stockResul || producto.stockResul;
    producto.unidMedida = unidMedida || producto.unidMedida;
    producto.almacen = almacen || producto.almacen;
    await producto.save();
    res.json({ msg: 'Producto actualizado exitosamente' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
};

// Delete product by ID
exports.deleteProductoById = async (req, res) => {
  const { id } = req.params;
  try {
    let producto = await Product.findById(id);
    if (!producto) {
      return res.status(404).json({ msg: 'Producto no encontrado' });
    }
    await Product.findByIdAndDelete(id);
    res.json({ msg: 'Producto eliminado correctamente' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
};

// Get product by ID
exports.getProductoById = async (req, res) => {
  const { id } = req.params;
  try {
    const producto = await Product.findById(id);
    if (!producto) {
      return res.status(404).json({ msg: 'Producto no encontrado' });
    }
    res.json(producto);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
};