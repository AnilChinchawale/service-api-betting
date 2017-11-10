'use strict';

const blockchainService = require('../blockchain');

const admins = {};

const signIn = (username, password) => {
  username = username.toLowerCase();
  return admins[username] === password;
};

const signUp = (username, password) => {
  username = username.toLowerCase();
  // username already exists?
  if (admins.hasOwnProperty(username)) {
    return false;
  }

  // sign up admins
  admins[username] = password;
  blockchainService.registerUser(username);
  return true;
};


module.exports = {
  signIn,
  signUp
};
