const { default: mongoose } = require('mongoose');
const Product = require('../models/product');

//functionalities that are not part of the frontend

exports.addProduct = async (req, res) => {  //add product
    try {

        const { productName, icon, from, nutrients, quantity, price, organic, description, type, category } = req.body;

        if (!(productName && icon && nutrients && quantity && price && category))   //check if all necessary data is provided or not
            return res.status(400).json({ status: "Failure", error: "Not sufficient data provided." });


        const newProduct = await Product.create({
            productName: productName,
            icon: icon,
            from: from,
            nutrients: nutrients,
            quantity: quantity,
            price: price,
            organic: organic,
            description: description,
            type: type,
            category: category
        }); //add product to database
        
        //use schema methods, statics, virtuals, etc...
        //get product quantity
        //console.log('quanity',newProduct.getQuantity());
        
        //get short product description
        //console.log('getshortdecs', newProduct.getShortDescription());
        
        //set and get product price after a discount
        /*newProduct.discountPrice = 10;
        console.log('discountprice', newProduct.discountPrice);*/

        //get total number of products in db
        //console.log('TotalProducts ', await Product.getTotalProducts());
        
        //get products based on type
        //console.log(await Product.find().getProductBasedOnTypes('non-veg'));

        return res.status(200).json({ status: "Success", response: "Product added successfully." }); //product added successfully.

    } catch (err) { //if error occurs send error
        return res.status(400).json({ status: "Failure", error: err.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {

        const properties = ['productName', 'icon', 'from', 'nutrients', 'quantity', 'price', 'organic', 'description'];

        const obj = {};

        for(b in req.body){
            if(properties.findIndex((p) => p==b)!=-1){
                obj.b = req.body[b]; 
            }
        }

        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, obj, { new: true, runValidators: true });

        return res.status(200).json({ status: "Success", response: "Product updated successfully." });

    } catch (err) {

        return res.status(400).json({ status: "Failure", error: err.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {

        await Product.findByIdAndDelete(req.params.id); //delete product found by id

        return res.status(200).json({ status: "Success", response: "Product deleted successfully." });  //send the response

    } catch (err) { //if error found

        return res.status(400).json({ status: "Failure", error: err.message }); //send the error
    }
};

exports.getAllProducts = async (req, res) => {  //get all products from database

    try {
        const allProducts = await Product.find();   //get products

        return res.status(200).json({ status: "Success", response: allProducts });  //send it in response

    } catch (err) { //if error occurs
        return res.status(400).json({ status: "Failure", error: err.message }); //send error
    }
};


exports.getProductById = async (req, res) => {  //get product by id
    try {
        Product.aggregate([ //use aggregation
            { $match: { _id: new mongoose.Types.ObjectId(req.params.id) } },    //match it with id
            {
                $project: {
                    name: "$productName",   //project productname to name
                    icon: 1,    //include icon
                    price: {
                        $concat: [
                            { $convert: { input: "$price", to: "string", onError: 0, onNull: 0 } },
                            " $ for ",
                            "$quantity"
                        ]
                    },  //add price and quantity together and return it as price
                    location: { $concat: ["From ", "$from"] },  //add location
                    nutrients: { $split: ["$nutrients", ", "] },    //convert nutrients from "," seperated string to array
                    organic: 1, //include organic 
                    desc: "$description",   //project description to desc
                    type: 1,    //add type
                    category: 1 //add category
                }
            }
        ])
            .exec()
            .then((result) => {
                if (result.length != 0) {   //if there are products in database then render products page with products
                    return res.render('product', { path: 'Products', title: result[0].name, response: result });
                }
                //else if user tries to enter any wrong/random id then
                //redirect to home page
                return res.redirect('/');
            })
            .catch((err) => {   //if error exists then throw it
                throw err;
            })

        //second way of achieving the same result

        /*const foundProduct = await Product.findById(req.params.id, {_id: 0});

        if (foundProduct)
            return 
        else
            return res.status(404).json({ status: "Failure", response: "We could not find the product that you are looking for." });
        */

    }
    catch (err) {   //if error
        return res.status(400).json({ status: "Failure", error: err.message }); //then send error
    }
};

exports.getHomePage = async (req, res) => { //render home page
    try {
        
        return res.render('home', { path: 'NodeFarm' });
    } catch (err) {

        return res.status(400).json({ status: "Failure", error: err.message });
    }
};

exports.getCatalog = async (req, res) => {  //get catalog of entire farm
    try {

        Product.aggregate([
            {
                $project: {
                    p_id: "$_id",   //project _id to p_id
                    productName: 1,     //include productname, icon, price and category only
                    icon: 1,
                    price: 1,
                    category: 1
                }
            },
            {
                $group: {   //group all the products through categories
                    _id: "$category",
                    products: { //push all the products to products array
                        $push: {
                            p_id: "$p_id",
                            icon: "$icon",
                            name: "$productName",
                            price: "$price"
                        }
                    }
                }
            },
            {
                $project: {
                    category: "$_id",   //project _id to category
                    _id: 0, //exclude _id
                    products: 1     //include products
                }
            },
            {
                $sort: {    //sort the result according to category names
                    category: 1
                }
            }
        ])
            .exec().then((result) => {
                //render catalog page with response
                return res.render('catalog', { path: 'Catalog', response: result });

            }).catch((err) => { throw err });

    } catch (err) { //if error then send error

        return res.status(400).json({ status: "Failure", error: err.message });
    }
};

exports.getCategories = async (req, res) => {
    try {

        //get all categories
        Product.aggregate([
            //project icons and category
            { $project: { icon: 1, category: 1, _id: 0 } },
            //group result through category
            { $group: { _id: "$category", icon: { $addToSet: "$icon" } } },
            //project _id as category
            //exclude _id
            /*add first icon of category to icon
            (reason for that is that i want to show category card with it's name and icon of 
            one's of it's products(choosing first product here) in frontend)
            */
            { $project: { category: "$_id", _id: 0, icon: { $arrayElemAt: ["$icon", 0] } } },
            //sort result according to categories
            { $sort: { category: 1 } }
        ])
            .exec()
            .then((result) => {
                //render category page with result
                return res.render('categories', { path: 'Categories', response: result })
            })
            .catch((err) => { throw err });

    } catch (err) { //if error then send error

        return res.status(400).json({ status: "Failure", error: err.message });
    }
};

exports.getProductFromCategory = async (req, res) => {  //get products from a perticular category
    try {

        Product.aggregate([
            { $match: { category: req.params.category } },  //match the category
            { $project: { p_id: "$_id", _id: 0, icon: "$icon", name: "$productName", price: "$price" } }])  //project the result
            .exec()
            .then((result) => {
                //if there exists any products from that category then render page from that category
                if (result.length != 0)
                    return res.render('getproductfromcategory', { path: 'Categories', header: req.params.category, response: result })

                //else if user tries to enter any random category name OR products dont't exists in that category
                //then redirect to categories page
                return res.redirect('/categories');
            })
            .catch((err) => { throw err });
    } catch (err) {

        return res.status(400).json({ status: "Failure", error: err.message });
    }
};

exports.getProdcutsPage = async (req, res) => { //get products page

    try {

        const limit = 10;   //make limit by default 10
        let skip = 0;   //by default don't skip any pages
        let products = [];
        let page = req.query.page;

        //count total number of products in database to get number of paginations
        const total = await Product.countDocuments({});

        const totalPages = Math.ceil(total / 10);   //number of pages for products

        //if page doesn't exists in query OR
        //if it's value is less than 0 OR
        //greater than number of pages products
        //set page to 1

        if (req.query.page == undefined || req.query.page <= 0 || req.query.page > totalPages)
            page = 1;

        //else give the page that user is looking for

        skip = (page - 1) * limit;    //then skip necessary products

        products = await Product.find({}, { p_id: "$_id", _id: 0, name: "$productName", icon: 1, price: 1 }).skip(skip).limit(limit);

        return res.render('products', { path: 'Products', products: JSON.stringify(products), pages: totalPages, current: page, msg: '' });

    } catch (err) {
        return res.status(400).json({ status: "Failure", error: err.message });
    }

};

exports.getSearchedProduct = async (req, res) => {
    try {

        const regex = new RegExp(req.query.name, 'i');  //create regex with entered value

        Product.aggregate([
            { $match: { productName: { $regex: regex } } },
            { $project: { p_id: "$_id", _id: 0, name: "$productName", icon: 1, price: 1 } }
        ])
            .exec()
            .then((result) => {

                let msg = 'Search result for "' + req.query.name + '"';

                //if we can't find any product then...
                if (result.length == 0)
                    msg = "We can't find the products that you are looking for."

                return res.render('products', { path: 'Products', products: JSON.stringify(result), pages: 0, current: 0, msg: msg });
            })
            .catch((err) => { throw err });

    } catch (err) {
        res.status(400).json({ status: "Failure", error: err.message });
    }
};

exports.getSortedProduct = async (req, res) => {
    try {
        let sort = req.query.property;  //get the property
        let products = [];

        if (sort == 'name') //if user has requested for sorting by name
            products = await Product.find({}, { p_id: "$_id", _id: 0, name: "$productName", icon: 1, price: 1 }).sort({ productName: 1 });

        else    //else sort by price
            products = await Product.find({}, { p_id: "$_id", _id: 0, name: "$productName", icon: 1, price: 1 }).sort({ price: 1 });

        return res.render('products', { path: 'Products', products: JSON.stringify(products), pages: 0, current: 0, msg: 'products sorted by ' + sort });

    } catch (err) {
        res.status(400).json({ status: "Failure", error: err.message });
    }
};