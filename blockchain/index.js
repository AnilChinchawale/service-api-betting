'use strict';

const service = require('./service');

module.exports = {
  getLeaderboard: service.getLeaderboard,
  getUserBalance: service.getUserBalance,
  placeBet: service.placeBet,
  registerUser: service.registerUser,
  declare: service.declare,
  resolve: service.resolve,
  newRound: service.newRound
};
