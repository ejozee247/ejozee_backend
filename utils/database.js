/*jshint esversion: 6 */
require('dotenv').config();

const mongoose = require('mongoose');

const mongooseConnect = () => {
    mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Database connected successfully');
    }).catch((err) => {
        console.log(err);
    });
};

module.exports = mongooseConnect;