require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const compression = require('compression');

// Import your routers
const authRouter = require('./routes/auth/auth-routes');
const adminProductsRouter = require('./routes/admin/product-routes');
const shopProductsRouter = require('./routes/shop/products-route');
const shopCartRouter = require('./routes/shop/cart-routes');

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.log('MongoDB connection error:', error));

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Configuration
app.use(
    cors({
        origin: process.env.CLIENT_BASE_URL,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow necessary HTTP methods
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'Cache-Control',
            'Expires',
            'Pragma',
            'Accept',
            'Origin',
        ],
        credentials: true,
    })
);


app.options('*', cors());

// Middleware
app.use(compression());
app.use(express.static('build', { maxAge: '1y' }));
app.use(cookieParser());
app.use(express.json({ limit: '10kb' }));

// Routers
app.use('/api/auth', authRouter);
app.use('/api/admin/products', adminProductsRouter);
app.use('/api/shop/products', shopProductsRouter);
app.use('/api/shop/cart', shopCartRouter);

// Start the server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
