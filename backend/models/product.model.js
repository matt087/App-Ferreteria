const mongoose = require("mongoose")

const ProductSchema = mongoose.Schema(
    {
        id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        stock: {
            type: Number,
            required: true,
            default: 0
        },
        image: {
            type: String,
            required: false
        },
        category: {
            type: String,
            required: true
        }
    },
    {
        Timestamp: false
    }

);

const Product = mongoose.model("Product",ProductSchema)