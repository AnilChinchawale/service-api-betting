'use strict';

const blockchainService = require('../blockchain');

const users = {};

const signIn = (username, password) => {
  username = username.toLowerCase();
  return users[username] === password;
};

const signUp = (username, password) => {
  username = username.toLowerCase();
  // username already exists?
  if (users.hasOwnProperty(username)) {
    return false;
  }

  // sign up users
  users[username] = password;
  blockchainService.registerUser(username);
  return true;
};


module.exports = {
  signIn,
  signUp
};
