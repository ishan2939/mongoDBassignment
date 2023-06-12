const mongoose = require("mongoose");

const cart = new mongoose.Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "user"},
    products: [{
        p_id: {type: mongoose.Schema.Types.ObjectId, ref: "product"}
    }],
    total: {type: Number, default: 0}
});

//get total number of items in cart
cart.virtual('totalNumberOfItems').get(function(){
    return this.products.length;
});

module.exports = mongoose.model("cart", cart);