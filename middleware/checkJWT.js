const jwt = require('jsonwebtoken');
const path = require('path');

const dotenv = require('dotenv');

dotenv.config({path: path.join(__dirname, '..', 'config', '.env')});

exports.verifyToEnter = (req, res, next) => {   //check if user is allowec to access website

    const token = (req.cookies['token'])?req.cookies['token'].token:undefined;   //get token

    if(!token){ //if it doesn't exists then redirect to singup page
        return res.redirect('/signup');
    }

    try{    //if it does exists
        const decoded = jwt.verify(token, process.env.SECRET_KEY);  //verify the token
        req.user = decoded; //add token to req to access it in next middleware
    }
    catch(err){ //handle error
        console.log(err.message);
        return res.redirect('/signup'); //redirect to singup page
    }

    //else let user enter
    return next();
};

//check if user allowed to access signup OR login page
exports.verifyToLeave = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"] || (req.cookies['token'])?req.cookies['token'].token:undefined;   //get token

    if(token){ //if toke doesn't exists then redirect to home page
        return res.redirect('/');
    }
    //else let user go to signup OR login page
    return next();
};