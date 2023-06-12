const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fname: { 
        type: String, 
        required: true,
        min: 3,
        trim: true
    },
    lname: { 
        type: String, 
        default: '' 
    },
    username: { 
        type: String, 
        required: true,
        trim: true,
        min: 5
    },
    email: { 
        type: String, 
        required: true,
        trim: true,
        unique: true
    },
    password: { 
        type: String, 
        required: true,
        trim: true,
        min: 5
    }
});

//get user's full name
userSchema.methods.getFullName = function(cb){    
    return this.fname.charAt(0).toUpperCase() + this.fname.slice(1) + " " + this.lname.charAt(0).toUpperCase() + this.lname.slice(1);
};

//get totalnumber of users for website
userSchema.statics.getTotalNumberOfUsers = function(cb){
    return this.countDocuments({});
};

module.exports = mongoose.model("user", userSchema);