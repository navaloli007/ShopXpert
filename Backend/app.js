const express = require('express');
const app = express();
require('dotenv/config');
const morgan = require('morgan');
const mongoose = require('mongoose');

const api = process.env.API_URL;
const port = process.env.PORT;

app.use(express.json());
app.use(morgan('tiny'));

app.get(`${api}/products`, (req, res) => {
    const product = {
        id: 1,
        name: 'hair dresser',
        image: "image_url"
    }
    res.send(product);
})
app.post(`${api}/products`, (req, res) => {
    const body = req.body;
    res.send(body);
})

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