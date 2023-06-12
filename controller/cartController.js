const Cart = require('../models/cart');
const Product = require('../models/product');

exports.getMyCart = async (req, res) => {   //get my cart
    try{
        
        Cart.findOne(
            {user_id : req.user.user_id}).populate('products.p_id', {'icon': 1, 'productName': 1, 'price': 1}
        )
        .exec()
        .then((response) => {
            let answer = '';
            let total = 0;

            //if no products were found in cart
            if(response!=null){
                total = response.total;
                answer = JSON.stringify(response.products);
            }
            
            //render cart page with response and total
            return res.render('cart', {path: 'Cart', response: answer, total: total, message: ''});
        });
        

    }catch(err){
        return res.status(400).json({ status: "Failure", error: err.message });
    }
};

exports.addToCart = async (req, res) => {   //add product to cart
    
    try{
        
        const user_id = req.user.user_id;   //get user id

        const userCartExists = await Cart.findOne({user_id: user_id}); //find the cart
        const product = await Product.findById(req.query.id); //find the product that user is trying to add

        if(!product)
            return res.redirect('/');

        if(userCartExists){//if usercart exists (alredy has products in cart)
            
            //get products all the already existing products in cart
            const products = userCartExists.products; 
            
            //try to find product in cart that user is trying to add
            const ifProductExists = await Cart.findOne({'products.p_id': req.query.id});
            
            //if that product doesn't exists in cart already
            if(!(ifProductExists)){
                //then only add it to cart
                let total = userCartExists.total + product.price; //add product price to total

                products.push({ p_id: req.query.id});   //push new product to products
                
                //update the cart
                const newCart = await Cart.findByIdAndUpdate(userCartExists._id, {products: products, total: total}, {new: true, runValidators: true});

                //get total number of items in cart
                //console.log(newCart.totalNumberOfItems);
            }
            //else don't add it to cart
        }
        else{     //if user's cart does not exists(means it's empty)
  
            let products = [];
            let total = product.price; //make new products price as total of cart
  
            products.push({ p_id: req.query.id});//push product to products array

            const userCart = await Cart.create({
                user_id : user_id,
                products : products,
                total: total
            });//add product to cart

        }
        //since a lot of pages has add to cart option in front end 
        //i have used query to get back to the page user is currently in
        return res.redirect('/' + req.query.route);

    }catch(err){
        return res.status(400).json({ status: "Failure", error: err.message });
    }
};