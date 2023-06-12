const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "user" },
    products: [{
        p_id: { type: mongoose.Schema.Types.ObjectId, ref: "product" }
    }],
    status: {
        type: String,
        enum: ['confirmed', 'shipped', 'out for delivery', 'placed', 'cancelled'],
        default: 'confirmed'
    },
    total: { type: Number, default: 0 },
}, { timestamps: true });

//get all orders by status
orderSchema.query.getOrderByStatus = function(status){
    return this.where({status});
};

module.exports = mongoose.model("order", orderSchema);