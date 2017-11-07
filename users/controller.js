'use strict';

const service = require('./service');

const getLeaderboard = (req, res) => {

};

const getWallet = (req, res) => {

};

const makePrediction = (req, res) => {

};

const signIn = (req, res) => {
  const signInStatus = service.signIn(req.body.username, req.body.password);
  if(signInStatus) {
    return res.status(200).json({status: 200, message: 'Sign In successful'});
  }
  return errorResponse(res, "Sign In failed", new Error('signIn failed'), 401);
};

const signUp = (req, res) => {
  const signUpStatus = service.signUp(req.body.username, req.body.password);
  if(signUpStatus) {
    return res.status(200).json({status: 200, message: 'Sign Up successful'});
  }
  return errorResponse(res, "Sign Up failed", new Error('signUp failed'), 401);
};

const errorResponse = (res, message, error, status = 500) =>
  res.status(status).json({ "status": status, "message": message, "error": error });


module.exports = {
  getLeaderboard,
  getWallet,
  makePrediction,
  signIn,
  signUp
};
