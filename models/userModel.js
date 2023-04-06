const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: { 
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'user',    
    },
});


module.exports = mongoose.model("UserModel", articleSchema)