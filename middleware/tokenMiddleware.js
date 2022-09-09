/*jshint esversion: 8 */

const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    try{
        const authHeader = req.header('authorization');
        const token = authHeader && authHeader.split(" ")[1];
        if(token == null){
            return res.status(400).json({
                message: 'No Token Was Gotten'
            });
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if(err){
                return res.status(400).json({
                    message: 'Error'
                });
            }
            req.user = user;
            next();
        });
    }catch(error){
        console.log(error);
        res.status(400).json({
            message: 'Error',
            error: error
        });
    }
};
