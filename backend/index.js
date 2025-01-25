const express = require('express');
const connectToDatabase = require('./database'); 
const Product = require('./models/product.model')
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello from API");
});

app.get('/api/get-products', async (req, res) =>{
    try {
        const products = await Product.find({});
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.get('/api/get-product/:id', async (req, res) =>{
    try {
        const {id}=req.params
        const product = await Product.findById(id);
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.post('/api/add-product', async (req,res)=>{
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.put('/api/update-product/:id', async (req,res) =>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
        if(!product)
        {
            return res.status(404).json({message: "Product not found"});
        }
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.delete('/api/delete-product/:id', async (req,res)=>{
try {
    const {id} = req.params;
    const product = await Product.findByIdAndDelete(id);
    if(!product)
    {
        return res.status(404).json({message: "Product not found"});
    }
    res.status(200).json({message: "Product deleted succesfully"})

    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

const startServer = async () => {
    await connectToDatabase();
    app.listen(3000, () => {
        console.log("Server running on port 3000");
    });
};

startServer();
