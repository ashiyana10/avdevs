const express = require('express');
const Favorite = require('../models/Favorite');
const Product = require('../models/Product');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Add a product to favorites
router.post('/', authMiddleware, async (req, res) => {
  const { productId } = req.body;

  if (!productId) return res.status(400).json({ message: 'Product ID is required' });

  try {
    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // Check if the product is already in favorites
    const existingFavorite = await Favorite.findOne({ userId: req.user.id, productId });
    if (existingFavorite) return res.status(400).json({ message: 'Product already in favorites' });

    // Add to favorites
    const favorite = new Favorite({ userId: req.user.id, productId });
    await favorite.save();

    res.status(201).json({ message: 'Product added to favorites', favorite });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Remove a product from favorites
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const favorite = await Favorite.findOneAndDelete({ userId: req.user.id, productId: req.params.id });
    if (!favorite) return res.status(404).json({ message: 'Favorite not found' });

    res.json({ message: 'Product removed from favorites' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// List all favorite products for a user (with pagination)
router.get('/', authMiddleware, async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const favorites = await Favorite.find({ userId: req.user.id })
      .populate('productId') // Populate product details
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Favorite.countDocuments({ userId: req.user.id });

    res.json({
      favorites,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;