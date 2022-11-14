/*jshint esversion: 6 */

const express = require('express');
const cors = require('cors');
const mongooseConnect = require('./utils/database');
const multer = require('multer');
require('dotenv').config({ path: ".env" });
const corsOptions = {
    origin : '*',
    credentials:true,
    optionSuccessStatus:200
};

const indexRoutes = require('./routes/index');
const adminRoutes = require('./routes/admin');

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, '-' + file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
        cb(null, true);
    }else{
        cb(null, false);
    }
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image'));

app.use('/', indexRoutes);
app.use('/admin', adminRoutes);

mongooseConnect();

const port = process.env.PORT || 8080;

app.listen(port);