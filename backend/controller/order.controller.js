const Order = require('../models/order.model');

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate('products.product');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id).populate('products.product');
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addOrder = async (req, res) => {
    try {
        if (!req.body.products || req.body.products.length === 0) {
            return res.status(400).json({ message: "El pedido debe contener al menos un producto" });
        }

        let totalAmount = 0;
        for (const item of req.body.products) {
            const product = await Product.findById(item.product);
            
            if (!product) {
                return res.status(404).json({ 
                    message: `Producto con ID ${item.product} no encontrado` 
                });
            }

            if (product.stock < item.quantity) {
                return res.status(400).json({ 
                    message: `Stock insuficiente para ${product.name}. Disponible: ${product.stock}` 
                });
            }
            item.price = product.price;
            totalAmount += product.price * item.quantity;
            await Product.findByIdAndUpdate(product._id, {
                stock: product.stock - item.quantity
            });
        }
        const orderData = {
            ...req.body,
            totalAmount,
            orderDate: new Date()
        };
        const order = await Order.create(orderData);
        const populatedOrder = await order.populate('products.product');

        res.status(201).json(populatedOrder);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addOrder };

const updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findByIdAndUpdate(
            id, 
            req.body, 
            { new: true }
        ).populate('products.product');
        
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findByIdAndDelete(id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getOrdersByUserCi = async (req, res) => {
    try {
        const { ci } = req.params;
        const orders = await Order.find({ userCi: ci }).populate('products.product');
        if (orders.length === 0) {
            return res.status(404).json({ message: "No orders found for this user" });
        }
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!['completed', 'cancelled'].includes(status)) {
            return res.status(400).json({ 
                message: "Estado inválido. Use 'completed' o 'cancelled'"
            });
        }

        const order = await Order.findById(id);

        if (!order) {
            return res.status(404).json({ message: "Pedido no encontrado" });
        }

        if (order.status === 'completed' || order.status === 'cancelled') {
            return res.status(400).json({ 
                message: `No se puede modificar un pedido que ya está ${order.status}`
            });
        }

        order.status = status;
        await order.save();

        if (status === 'cancelled') {
            const Product = require('../models/product.model');
            
            for (const item of order.products) {
                await Product.findByIdAndUpdate(
                    item.product,
                    { $inc: { stock: item.quantity } }
                );
            }
        }

        const updatedOrder = await Order.findById(id).populate('products.product');

        res.status(200).json(updatedOrder);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getOrders,
    getOrder,
    addOrder,
    updateOrder,
    deleteOrder,
    getOrdersByUserCi,
    updateOrderStatus
};