const express = require('express');
const connectToDatabase = require('./database'); 

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello from API");
});

app.post('api/products', (req,res)=>{

});

const startServer = async () => {
    await connectToDatabase();
    app.listen(3000, () => {
        console.log("Server running on port 3000");
    });
};

startServer();
