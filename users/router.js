'use strict';

const express = require('express');
const router = express.Router();

const controller = require('./controller');

// middleware to allow CORS
router.use((req, res, next) => {
  var origin = req.headers.origin;

  res.setHeader('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

router.get('/leaderboard', controller.getLeaderboard);
router.get('/wallet', controller.getWallet);

router.post('/predict', controller.makePrediction);
router.post('/sign-in', controller.signIn);
router.post('/sign-up', controller.signUp);

router.post('/declare', controller.declare);
router.post('/resolve', controller.resolve);
router.post('/new-round', controller.newRound);

module.exports = router;
