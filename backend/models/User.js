const mongoose = require('../db/conn');

const { Schema } = mongoose;

const User = mongoose.model(
    'User', 
    new Schema({
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,        
        },
        password: {
            type: String,
            required: true,
        },

        image: {
            type: String,

        },
        phone: {
            type: Number,
            required: true
        },

        status: {
            type: Boolean,
            required: true
        }


    }, {timestamps: true}));

module.exports = User;
