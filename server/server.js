require('dotenv').config();

const express = require('express');
const monGoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRouter = require('./routes/auth/auth-routes');
const adminProductsRouter = require('./routes/admin/product-routes')
const shopProductsRouter = require('./routes/shop/products-route');
const shopCartRouter = require('./routes/shop/cart-routes');



monGoose.connect(process.env.MONGO_URL).then(() => console.log('mongo connect')).catch(error => console.log(error))


const app = express();
const PORT = process.env.PORT || 5000;


app.use(
    cors({
        origin: process.env.CLIENT_BASE_URL,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: [
            "content-type",
            "Authorization",
            "Cache-control",
            "Expires",
            "Pragma"
        ],
        credentials: true
    })
);
app.use(cookieParser());

app.use(express.json());
app.use('/api/auth', authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use('/api/shop/products', shopProductsRouter);
app.use('/api/shop/cart', shopCartRouter);



app.listen(PORT, () => console.log(`server is running on port ${PORT}`))