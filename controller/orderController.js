const Cart = require('../models/cart');
const Order = require('../models/order');
const cron = require('node-cron');

exports.getMyOrders = async (req, res) => { //get all of my orders
    try {

        Order.find(
            { user_id: req.user.user_id }).populate('products.p_id', { 'productName': 1, 'price': 1 }
        ).sort({createdAt: -1})
        .exec()
        .then((response) => {

            return res.render('orders', { path: "Orders", response: response });
        });

        //get cancelled orders
        //console.log(await Order.find().getOrderByStatus('cancelled'));

    } catch (err) {
        return res.status(400).json({ status: "Failure", error: err.message });
    }
};

exports.confirmOrder = async (req, res) => {    //confirm my order

    try {

        const userCart = await Cart.findOne({ user_id: req.user.user_id });   //get user's cart

        if (!(userCart)) //if cart does not exists(means there are no products in cart)
            return res.redirect('/');

        const order = {
            user_id: userCart.user_id,
            products: userCart.products,
            total: userCart.total
        };  //create order obj

        const newOrder = await Order.create(order); //create order

        await Cart.findByIdAndDelete(userCart._id); //delete user cart

        return res.redirect('/getorders');  //redirect to cart page

    } catch (err) {
        return res.status(400).json({ status: "Failure", error: err.message });
    }
};

exports.cancelOrder = async (req, res) => {
    
    try{

        const foundOrder = await Order.findOne({_id: req.params.id});//find the order

        //if order doesn't exists OR
        //order is already placed OR
        //order is already cancelled
        //do nothing
        if(foundOrder==undefined || foundOrder.status=='placed' || foundOrder.status=='cancelled'){
            return res.redirect('/getorders');    
        }

        //else cancel the order
        const newOrder = await Order.findByIdAndUpdate(req.params.id, { $set: {status: 'cancelled'}}, {new :true, runValidators: true});
        
        return res.redirect('/getorders');

    }catch(err){
        return res.status(400).json({ status: "Failure", error: err.message });
    }
};

//change order status every one minute
cron.schedule('* * * * *', async () => {
    try {
        //get orders that are not placed OR cancelled
        const orders = await Order.find({ status: { $nin: ['placed', 'cancelled'] } });
        const status = Order.schema.path('status').enumValues;
        let index = 0;

        //Update the status of each order
        for (const order of orders) {

            index = status.findIndex((s) => s == order.status);
            
            order.status = status[index+1];
            
            await order.save(); // Save the updated order
        }
    } catch (error) {
        console.error('Error updating order status:', error);
    }

});