'use strict';

const getLeaderboard = (req, res) => {

};

const getWallet = (req, res) => {

};

const makePrediction = (req, res) => {

};

const signIn = (req, res) => {

};

const signUp = (req, res) => {

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
