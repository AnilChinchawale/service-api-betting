'use strict';

const users = {};

const signIn = (username, password) => {
  return users.username === password;
};

const signUp = (username, password) => {
  users.username = password;
  return true;
};


module.exports = {
  signIn,
  signUp
};
