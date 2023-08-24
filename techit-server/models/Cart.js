const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    products: {
        type: Array,
        required: true,
    },
    active: {
        type: Boolean,
        required: true,
    },
});

const Cart = mongoose.model("carts", cartSchema);
module.exports = Cart;

/* const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    products: {
        type: Array,
        required: true
    },
    products: [{
        productId: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true,
            minlength: 2
        },
        price: {
            type: Number,
            required: true,
        },
        category: {
            type: String,
            required: true,
            minlength: 2
        },
        description: {
            type: String,
            required: true,
            minlength: 2
        },
        image: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        }

    }],
    active: {
        type: Boolean,
        required: true
    }
})

const Cart = mongoose.model("carts", cartSchema);
module.exports = Cart; */