const express = require('express');
const connectToDatabase = require('./database');
const productRoute = require('./routes/product.route')
const userRoute = require('./routes/user.route')
const app = express();
const cors = require('cors');

app.use(cors());

app.use(express.json());
app.use("/api/products", productRoute);
app.use("/api/users", userRoute);


const startServer = async () => {
    await connectToDatabase();
    app.listen(3000, () => {
        console.log("Server running on port 3000");
    });
};

startServer();
