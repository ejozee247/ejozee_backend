/*jshint esversion: 6 */

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const patners = new schema ({
    name:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    location:{
       type: String,
       required: true 
    },
    phonenumber:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Partners', patners);