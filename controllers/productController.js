const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    console.log(`[GET] /api/products - returned ${products.length} products`);
    res.status(200).json(products);
  } catch (error) {
    console.error('[GET] /api/products - error:', error.message);
    res.status(500).json({ message: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({ pid: req.params.pid });
    if (!product) {
      console.warn(`[GET] /api/products/${req.params.pid} - not found`);
      return res.status(404).json({ message: 'Product not found' });
    }
    console.log(`[GET] /api/products/${req.params.pid} - found`);
    res.status(200).json(product);
  } catch (error) {
    console.error(`[GET] /api/products/${req.params.pid} - error:`, error.message);
    res.status(500).json({ message: error.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { pid, pname, price, quantity } = req.body;
    const newProduct = new Product({ pid, pname, price, quantity });
    const savedProduct = await newProduct.save();
    console.log(`[POST] /api/products - created product ${savedProduct.pid} (_id: ${savedProduct._id})`);
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error('[POST] /api/products - error:', error.message);
    res.status(400).json({ message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { pid: req.params.pid },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedProduct) {
      console.warn(`[PUT] /api/products/${req.params.pid} - not found`);
      return res.status(404).json({ message: 'Product not found' });
    }
    console.log(`[PUT] /api/products/${req.params.pid} - updated`);
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(`[PUT] /api/products/${req.params.pid} - error:`, error.message);
    res.status(400).json({ message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findOneAndDelete({ pid: req.params.pid });
    if (!deletedProduct) {
      console.warn(`[DELETE] /api/products/${req.params.pid} - not found`);
      return res.status(404).json({ message: 'Product not found' });
    }
    console.log(`[DELETE] /api/products/${req.params.pid} - deleted`);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(`[DELETE] /api/products/${req.params.pid} - error:`, error.message);
    res.status(500).json({ message: error.message });
  }
};