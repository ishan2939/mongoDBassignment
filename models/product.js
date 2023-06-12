const mongoose = require('mongoose');

const product = mongoose.Schema({
    productName: {type: String, required: true},
    icon: {type: String, required: true},
    from: {type: String, default: 'Origin not specified'},
    nutrients: {type: String, required: true},
    quantity: {type: String, required: true},
    price: {type: Number, required: true},
    organic: {type: Boolean, default: true},
    description: {type: String, default: 'No description found'},
    type: {
        type: String,
        enum: ['veg', 'non-veg'],
        default: 'veg'
    },
    category: {type: String, required: true}
});

//get short product descritption
product.methods.getShortDescription = function(){
    return this.description.substring(0, 50) + '...';
};

//get product quantity
product.methods.getQuantity = function(){
    return this.quantity.split(' ')[0];
};

//get total number of products in database
product.statics.getTotalProducts = function(){
    return this.countDocuments({});
};

//get products based on type
product.query.getProductBasedOnTypes = function(type){
    return this.where({type: type});
};

//set discount price
product.virtual('discountPrice').set(function(discount){
    this.priceWithDiscount = ((this.price * discount)/100).toFixed(2);
});

//get discount price
product.virtual('discountPrice').get(function(){
    return this.priceWithDiscount;
});

module.exports = mongoose.model('product', product);