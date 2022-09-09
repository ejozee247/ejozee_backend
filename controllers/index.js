/*jshint esversion: 8 */

const errandSend = require('../models/errandSend');
const errandRun = require('../models/errandRun');

exports.postErrandsend = async (req, res) => {
   try{
        const ErrandSend = new errandSend({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            phonenumber: req.body.phonenum,
            subject: req.body.subject,
            location: req.body.locations,
            details: req.body.erranddetails
        });
        await ErrandSend.save();
        return res.status(201).json({
            message: 'Details Sent Successfully',
            result: ErrandSend
        });
   }catch(error){
    console.log(error);
        res.status(400).json({
            message: 'Error Saving Errand Sender Details',
            error: error
        });
   }
};


exports.postErrandrun = async (req, res) => {
    try{
        const ErrandRun = new errandRun({
            firstname: req.body.firstName,
            lastname: req.body.lastName,
            phonenumber: req.body.phonenum,
            location: req.body.location,
            email: req.body.email,
            select: req.body.select
        });
        await ErrandRun.save();
            return res.status(201).json({
                message: 'Details Sent Successfully',
                result: ErrandRun
        });
    }catch(error){
        // console.log(error);
        res.status(400).json({
            message: 'Error Saving Errand Runner Details',
            Error: error
        });
    }
};