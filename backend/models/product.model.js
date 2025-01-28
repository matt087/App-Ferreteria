const mongoose = require("mongoose")

const ProductSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        stock: {
            type: Number,
            required: false,
            default: 0
        },
        image: {
            type: String,
            required: false,
            default: "https://dl.dropboxusercontent.com/"
        },
        category: {
            type: String,
            required: true
        },
        description:{
            type: String,
            required: false
        }
    },
    {
        timestamps: false
    }

);
const Product = mongoose.model("Product",ProductSchema);
module.exports = Product