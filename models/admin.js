/*jshint esversion: 6 */

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const adminSchema = new schema({
    username:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    }
});

module.exports = mongoose.model('Admin', adminSchema);