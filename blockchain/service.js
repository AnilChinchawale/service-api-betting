'use strict';

const fs = require('fs');
const Web3 = require('web3');

const config = require('../config');

const ABI = fs.readFileSync(__dirname + "/ABI.txt", "utf8").trim();
const address = fs.readFileSync(__dirname + "/contractAddress.txt", "utf8").trim();

const web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider(config.getGethUrl()));
const contractInstance = web3.eth.contract(JSON.parse(ABI)).at(address);


const placeBet = (username, prediction) => {
  return;
};

const registerUser = username => {
  return;
};

module.exports = {
  placeBet,
  registerUser
};
