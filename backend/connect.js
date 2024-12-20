const mongoose = require('mongoose');
require('dotenv').config();
function set(){
    const uri = process.env.URI;
    mongoose.connect(uri,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    }).then(()=>{
        console.log('database connected')
    }).catch((err)=>{
        console.log('database error',err);
    })
}
module.exports.set = set;