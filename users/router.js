'use strict';

const express = require('express');
const router = express.Router();

const controller = require('./controller');

router.get('/leaderboard', controller.getLeaderboard);
router.get('/wallet', controller.getWallet);

router.post('/predict', controller.makePrediction);
router.post('/sign-in', controller.signIn);
router.post('/sign-up', controller.signUp);

module.exports = router;
