const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new mongoose.Schema({
    product_id : {
        type: Schema.Types.ObjectId,
        ref: 'products',
        required: true
    },

    user_id : {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },

});

module.exports = mongoose.model("cart", cartSchema);