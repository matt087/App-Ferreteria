const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema(
    {
        userCi: {
            type: String,
            required: true,
        },
        products: [{
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            },
            price: {
                type: Number,
                required: true
            }
        }],
        totalAmount: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            enum: ['pending', 'completed', 'cancelled'],
            default: 'pending'
        },
        orderDate: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true 
    }
);

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;