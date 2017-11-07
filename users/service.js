'use strict';

const blockchainService = require('../blockchain/service');

const users = {};

const signIn = (username, password) => {
  return users.username === password;
};

const signUp = (username, password) => {
  users.username = password;
  blockchainService.registerUser(username);
  return true;
};


module.exports = {
  signIn,
  signUp
};
