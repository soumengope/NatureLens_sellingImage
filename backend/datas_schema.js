const mongoose = require('mongoose');

const datasSchema = new mongoose.Schema({
    key:
    {
        type: Number, 
        required: true
    },
    img_link:
    {
        type: String,
        required: true
    },
    org_img:
    {
        type: String,
        required: true
    },
    desc:
    { 
        type: String,
        required: true 
    },
    price:
    {
        type: Number,
        required: true
    }
});

const Datas = mongoose.model('datas', datasSchema);

module.exports = Datas;