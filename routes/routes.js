const express = require('express');

const authController = require('../controller/authController');
const productController = require('../controller/productController');
const cartController = require('../controller/cartController');
const orderController = require('../controller/orderController');

const checkJWT = require('../middleware/checkJWT');

const Router = express.Router();

/*in some of the routes i have used get method instead of post because if were to use POST method then 
i have to use  fetch and all apis from front end because i am using ejs*/

/* Login and singup */
Router.route('/signup').get(checkJWT.verifyToLeave, authController.getSignUpPage).post(checkJWT.verifyToLeave, authController.register);
Router.route('/login').get(checkJWT.verifyToLeave, authController.getLoginPage).post( checkJWT.verifyToLeave,authController.login);

/* get home page */
Router.route('/').get(checkJWT.verifyToEnter,productController.getHomePage);                     


/* get catalog */
Router.route('/catalog').get(checkJWT.verifyToEnter, productController.getCatalog);

/* get categories availble in whole database and also get products from those categories*/ 
Router.route('/categories').get(checkJWT.verifyToEnter, productController.getCategories);
Router.route('/categories/:category').get(checkJWT.verifyToEnter, productController.getProductFromCategory);

/*products handler*/
Router.route('/products').get(checkJWT.verifyToEnter, productController.getProdcutsPage);
Router.route('/product/:id').get(checkJWT.verifyToEnter, productController.getProductById);

/* get searched products*/
Router.route('/searchproducts').get(checkJWT.verifyToEnter, productController.getSearchedProduct);
Router.route('/sortproducts').get(checkJWT.verifyToEnter, productController.getSortedProduct);

/* operations to handle cart */
Router.route('/getmycart').get(checkJWT.verifyToEnter, cartController.getMyCart);
Router.route('/addtocart').get(checkJWT.verifyToEnter, cartController.addToCart);

/* get my orders */
Router.route('/getorders').get(checkJWT.verifyToEnter, orderController.getMyOrders);

/* confirm order */
Router.route('/confirmorder').get(checkJWT.verifyToEnter, orderController.confirmOrder);
Router.route('/cancelorder/:id').get(checkJWT.verifyToEnter, orderController.cancelOrder);

/* logout */
Router.route('/logout').get(checkJWT.verifyToEnter, authController.logout);

/* product operations (not part of the frontend)*/ 
Router.route('/getallproduct').get(productController.getAllProducts);
Router.route('/addproduct').post(productController.addProduct);
Router.route('/updateproduct').post(productController.updateProduct);
Router.route('/deleteproduct/:id').post(productController.deleteProduct);

module.exports = Router;