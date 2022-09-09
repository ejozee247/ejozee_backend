/*jshint esversion: 8 */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const errandSend = require('../models/errandSend');
const errandRun = require('../models/errandRun');
const addPartner = require('../models/addPartner');
const admin = require('../models/admin');



exports.getErrandSenderTrue = async (req, res) => { 
    try{
        const details = await errandSend.find({isCompleted: true});
        res.status(200).json({
            message: 'Details Fetched Successfully',
            result: details
        });
    }catch(err){
        res.status(404).json({
            message: 'Error Fetching Details',
            Error: err
        });
    }
};

exports.getErrandSenderFalse = async (req, res) => { 
    try{
        const details = await errandSend.find({isCompleted: false});
        res.status(200).json({
            message: 'Details Fetched Successfully',
            result: details
        });
    }catch(err){
        res.status(404).json({
            message: 'Error Fetching Details',
            Error: err
        });
    }
};

exports.getConfirmSender = async (req, res) =>{
    const {id: errandId} = req.params;
    try{
        const details = await errandSend.findById(errandId).exec();
        if (!details){
            return res.status(404).json({
                message: 'No Details With The Id Found',
            });
        }else{
             res.status(200).json({
                message: 'Details Gotten Successfully',
                result: details
            });
        }
    }catch(err){
        res.status(400).json({
            message: 'No Details With The Id Found',
        });
    }
};

exports.getErrandRunnerTrue = async (req, res) => { 
    try{
        const details = await errandRun.find({isCompleted: true});
        res.status(200).json({
            message: 'Details Fetched Successfully',
            result: details
        });
    }catch(err){
        res.status(404).json({
            message: 'Error Fetching Details',
            Error: err
        });
    }
};

exports.getErrandRunnerFalse = async (req, res) => { 
    try{
        const details = await errandRun.find({isCompleted: false});
        res.status(200).json({
            message: 'Details Fetched Successfully',
            result: details
        });
    }catch(err){
        res.status(404).json({
            message: 'Error Fetching Details',
            Error: err
        });
    }
};

exports.getConfirmRunner = async (req, res) =>{
    const {id: errandId} = req.params;
    try{
        const details = await errandRun.findById(errandId).exec();
        if (!details){
            return res.status(404).json({
                message: 'No Details With The Id Found',
            });
        }else{
             res.status(200).json({
                message: 'Details Gotten Successfully',
                result: details
            });
        }
    }catch(err){
        res.status(400).json({
            message: 'No Details With The Id Found',
        });
    }
};

exports.postPartner = async (req, res, next) => {
    try{
        if (!req.file){
            return res.status(400).json({
             message: 'No Image Provided'
            });
         }
         const AddPartner = new addPartner({
             name: req.body.name,
             image: req.file.path,
             location: req.body.location,
             phonenumber: req.body.phonenumber
         });
         await AddPartner.save();
         res.status(201).json({
             message: 'Partner Added Successfully',
             result: AddPartner
        });
    }catch(err){
        console.log(err);
        res.status(404).json({
            message: 'Error Posting Partners Details',
            Error: err
        });
    }
};

exports.getPartner = async (req, res) => {
    try{
        const details = await addPartner.find();
        res.status(200).json({
            message: 'Partners Details Fetched Successfully',
            result: details
        });
    }catch(err){
        res.status(404).json({
            message: 'Error Getting Partners Details',
            Error: err
        });
    }
};

exports.completeErrand = async (req, res) => {
    const {id: errandId} = req.params;
    try{
        const details = await errandSend.findById(errandId).exec();
        if (!details){
            return res.status(404).json({
                message: 'No Details With The Id Found',
            });
        }else{
            details.isCompleted = true;
            await details.save();
             res.status(200).json({
                message: 'Details Updated Successfully',
                result: details
            });
        }
    }catch(err){
        res.status(400).json({
            message: 'No Details With The Id Found',
        });
    }
};

exports.verifyRunner = async (req, res) => {
    const {id: errandId} = req.params;
    try{
        const details = await errandRun.findById(errandId).exec();
        if (!details){
            return res.status(404).json({
                message: 'No Details With The Id Found',
            });
        }else{
            details.isCompleted = true;
            await details.save();
             res.status(200).json({
                message: 'Details Updated Successfully',
                result: details
            });
        }
    }catch(err){
        res.status(400).json({
            message: 'No Details With The Id Found',
        });
    }
};


exports.addAdmin = async (req,res) => {
    try{
        const password = await bcrypt.hash(req.body.password, 10);
        const user = await admin.findOne({username: req.body.username});
        if(user){
           return res.status(400).json({
                message: 'The Username Exists Already'
            });
        }
        if(req.body.password !== req.body.confirmPassword){
            return res.status(400).json({
                message: 'Passwords Do Not Match'
            });
        }
        const addAdmin = new admin({
            username: req.body.username,
            password: password
        });
            await addAdmin.save();
            return res.status(200).json({
                message: 'Admin Added Successfully',
                result: addAdmin
        });
    }catch(error){
        console.log(error);
        res.status(400).json({
            message: 'Error Adding Admin',
            Error: error
        });
    }
};


exports.login = async (req, res) => {
    try{
        const user = await admin.findOne({username: req.body.username});
        if(user){
            const match = await bcrypt.compare(req.body.password, user.password);
            const token = jwt.sign({user: user}, process.env.JWT_SECRET, { expiresIn: '1h' });
            if(match){
                password = undefined;
                return res.status(200).json({
                    message: 'User Found',
                    result: user,
                    token: token
                });
            }else{
                return res.status(400).json({
                    message: 'Incorrect Username/Password'
                });
            }
        }else{
            return res.status(400).json({
                message: 'Incorrect Username/Password'
            });
        }
    }catch(error){
        console.log(error);
        res.status(400).json({
            message: 'Error Logging In',
            Error: error
        });
    }
};
