/*jshint esversion: 6 */

const express = require('express');

const adminController = require('../controllers/admin');
const tokenAuth = require('../middleware/tokenMiddleware');

const router = express.Router();

router.post('/addAdmin', tokenAuth, adminController.addAdmin);
router.post('/login', adminController.login);
router.get('/errandSenderTrue', tokenAuth, adminController.getErrandSenderTrue);
router.get('/errandSenderFalse', tokenAuth, adminController.getErrandSenderFalse);
router.get('/confirmSender/:id', tokenAuth, adminController.getConfirmSender);
router.get('/errandRunnerTrue', tokenAuth, adminController.getErrandRunnerTrue);
router.get('/errandRunnerFalse', tokenAuth, adminController.getErrandRunnerFalse);
router.get('/confirmRunner/:id', tokenAuth, adminController.getConfirmRunner);
router.post('/addPartner', tokenAuth, adminController.postPartner);
router.get('/getPartner', tokenAuth, adminController.getPartner);
router.post('/completesender/:id', tokenAuth, adminController.completeErrand);
router.post('/verifyRunner/:id', tokenAuth, adminController.verifyRunner);

module.exports = router;