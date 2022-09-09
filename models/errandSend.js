/*jshint esversion: 6 */

const mongoose = require('mongoose');

const schema = mongoose.Schema;

const errandSender = new schema({
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phonenumber:{
        type: String,
        required: true
    },
    subject:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    details:{
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
},
{timestamps: true}
);

module.exports = mongoose.model('Errand Sender', errandSender);