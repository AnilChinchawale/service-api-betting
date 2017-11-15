'use strict';

const service = require('./service');

module.exports = {
  getLeaderboard: service.getLeaderboard,
  getUserBalance: service.getUserBalance,
  placeBet: service.placeBet,
  registerUser: service.registerUser,

  // admin
  createNewRound: service.createNewRound,
  declareRound: service.declareRound,
  resolveRound: service.resolveRound
};
