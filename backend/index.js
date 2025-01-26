const express = require('express');
const connectToDatabase = require('./database');
const productRoute = require('./routes/product.route')
const app = express();

app.use(express.json());
app.use("/api/products", productRoute);

const startServer = async () => {
    await connectToDatabase();
    app.listen(3000, () => {
        console.log("Server running on port 3000");
    });
};

startServer();
