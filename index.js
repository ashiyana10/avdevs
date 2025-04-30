const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');
const favoriteRoutes = require('./routes/favorite');

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);

app.use('/api/products', productRoutes);

app.use('/api/favorites', favoriteRoutes);
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch(err => console.error(err));
