/*jshint esversion: 6 */

const express = require('express');

const indexController = require('../controllers/index');

const router = express.Router();

router.post('/errandSender', indexController.postErrandsend);
router.post('/errandRunner', indexController.postErrandrun);

module.exports = router;
