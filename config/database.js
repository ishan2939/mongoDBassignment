const mongoose = require('mongoose');

exports.connect_to_DB = () => mongoose.connect('mongodb://localhost:27017/nodefarm') //connect to database
    .then(() => console.log("Connect to database successfully.")) //if successfull the show message
    .catch(err => console.log('An error occured while connecting, ', err.message)); //if not then show error