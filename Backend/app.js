const express = require('express');
const app = express();
require('dotenv/config');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const api = process.env.API_URL;
const port = process.env.PORT;

// middleware 
app.use(cors());
app.options('*', cors());

app.use(express.json());
app.use(morgan('tiny'));

//Routes
const categoriesRoutes = require('./routes/categories');
const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');
const ordersRoutes = require('./routes/orders');

app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);

// connect to Database
async function connectDB() {
    try {
        await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("Database Connected Successfully");
    } catch (error) {
        console.error("Database Connection Failed", error);
        process.exit(1);
    }
}
// Start Server
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`🚀 Server is running on port ${port}`);
    });
});