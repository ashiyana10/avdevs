const express = require('express');
const Product = require('../models/Product');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', async (req, res) => {
    const {
      page = 1,
      limit = 10,
      category,
      minPrice,
      maxPrice,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      search,
    } = req.query;
  
    const filter = {};
    if (category) filter.category = { $in: category.split(',').map(cat => cat.trim()) };    if (minPrice) filter.price = { ...filter.price, $gte: Number(minPrice) };
    if (maxPrice) filter.price = { ...filter.price, $lte: Number(maxPrice) };
    if (search) filter.$text = { $search: search };
  
    try {
      const products = await Product.find(filter)
        .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
        .skip((page - 1) * limit)
        .limit(Number(limit));
  
      const total = await Product.countDocuments(filter);
  
      res.json({
        products,
        total,
        page: Number(page),
        totalPages: Math.ceil(total / limit),
      });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  });

// GET /api/products/:id - Get a specific product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// POST /api/products - Create a product (authenticated users only)
router.post('/', authMiddleware, async (req, res) => {
  const { name, description, price, category } = req.body;

  if (!name || !description || !price || !category)
    return res.status(400).json({ message: 'All fields are required' });

  try {
    const product = new Product({ name, description, price, category });
    await product.save();
    res.status(201).json({ message: 'Product created successfully', product });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// PUT /api/products/:id - Update a product (authenticated users only)
router.put('/:id', authMiddleware, async (req, res) => {
  const { name, description, price, category } = req.body;

  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;
    if (category) product.category = category;

    await product.save();
    res.json({ message: 'Product updated successfully', product });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;