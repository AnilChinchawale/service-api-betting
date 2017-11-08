'use strict';

const service = require('./service');
const blockchainService = require('../blockchain');

const getLeaderboard = (req, res) => {
  req.query.username = req.query.username.toLowerCase();
  return res.json(blockchainService.getLeaderboard(req.query.username));
};

const getWallet = (req, res) => {
  req.query.username = req.query.username.toLowerCase();
  const balance = blockchainService.getUserBalance(req.query.username);
  return res.json({ balance });
};

const makePrediction = (req, res) => {
  const txHash = blockchainService.placeBet(req.body.username, req.body.prediction);
  return res.status(202).json({ txHash });
};

const signIn = (req, res) => {
  validateAuthFields(req, res);
  const signInStatus = service.signIn(req.body.username, req.body.password);
  if (signInStatus) {
    return res.status(200).json({ status: 200, message: 'Sign In successful' });
  }
  return errorResponse(res, "Sign In failed", new Error('signIn failed'), 401);
};

const signUp = (req, res) => {
  validateAuthFields(req, res);
  const signUpStatus = service.signUp(req.body.username, req.body.password);
  if (signUpStatus) {
    return res.status(200).json({ status: 200, message: 'Sign Up successful' });
  }
  return errorResponse(res, "Sign Up failed", new Error('signUp failed'), 401);
};

const errorResponse = (res, message, error, status = 500) =>
  res.status(status).json({ "status": status, "message": message, "error": error });

const validateAuthFields = (req, res) => {
  if (!req.body.hasOwnProperty('username') || req.body.username.length < 1 || typeof (req.body.username) != 'string') {
    return errorResponse(res, "Invalid username", new Error('Invalid username'), 400);
  } else if (!req.body.hasOwnProperty('password') || req.body.password.length < 1 || typeof (req.body.password) != 'string') {
    return errorResponse(res, "Invalid password", new Error('Invalid password'), 400);
  }
};


module.exports = {
  getLeaderboard,
  getWallet,
  makePrediction,
  signIn,
  signUp
};
