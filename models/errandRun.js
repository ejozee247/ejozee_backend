/*jshint esversion: 6 */

const mongoose = require('mongoose');

const schema = mongoose.Schema;

const errandRunner = new schema({
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    phonenumber:{
        type: Number,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    select:{
        type: Number,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
}, 
{timestamps: true}
);

module.exports = mongoose.model('Errand Runner', errandRunner);