const mongoose = require("mongoose");


const user = new mongoose.Schema({
    fullname:{
      type:String,
    },
    email:{
      type:String,
    },
    password:{
      type:String,
    },
    score:{
      type:Number,
    }

  });
const newModel = mongoose.model('users',user); 
module.exports = newModel;