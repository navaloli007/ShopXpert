const express = require('express');
const app = express();
require('dotenv/config');
const api = process.env.API_URL;
const port = process.env.PORT;

app.get("/", (req, res) => {
    res.send("Welcome to ShopXpert!");
})

app.listen(port, () => {
    console.log("Server is running on port 3000");
})