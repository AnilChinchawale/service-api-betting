'use strict';

const fs = require('fs');
const Web3 = require('web3');

const config = require('../config');

const bettingABI = fs.readFileSync(__dirname + "/BettingABI.txt", "utf8").trim();
const betABI = fs.readFileSync(__dirname + "/BetABI.txt", "utf8").trim();
const bettingCode = fs.readFileSync(__dirname + "/Betting.txt", "utf8").trim();
const betCode = fs.readFileSync(__dirname + "/Bet.txt", "utf8").trim();
const bettingAddress = fs.readFileSync(__dirname + "/BettingAddress.txt", "utf8").trim();
const betAddress = fs.readFileSync(__dirname + "/BetAddress.txt", "utf8").trim();


const web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider(config.getGethUrl()));
web3.eth.defaultAccount = web3.eth.accounts[0]; // otherwise have to specify `from` while making each transaction
const bettingContract = web3.eth.contract(JSON.parse(bettingABI));
const betContract = web3.eth.contract(JSON.parse(betABI));

let bettingContractInstance;
let betContractInstance;
if (process.env.DEPLOY) {
  bettingContract.new(100, { data: bettingCode, gas: 4712388 }, function (error, contract) {
    if (typeof contract.address !== 'undefined') {
      bettingContractInstance = web3.eth.contract(JSON.parse(bettingABI)).at(contract.address);
      console.log(bettingContractInstance.address);
      fs.writeFileSync(__dirname + "/BettingAddress.txt", bettingContractInstance.address);
      betContract.new(bettingContractInstance.address, { data: betCode, gas: 4712388 }, function (error, contract) {
        if (typeof contract.address !== 'undefined') {
          betContractInstance = web3.eth.contract(JSON.parse(betABI)).at(contract.address);;
          console.log(betContractInstance.address);
          fs.writeFileSync(__dirname + "/BetAddress.txt", betContractInstance.address);
          bettingContractInstance.newRound.sendTransaction(betContractInstance.address);
          console.log("Contract Intialized and Set");
        } else if (error) {
          console.log("Error deploying  bet:" + error);
        }
      });
    } else if (error) {
      console.log("Error deploying  betting:" + error);
    }
  });
} else {
  bettingContractInstance = web3.eth.contract(JSON.parse(bettingABI)).at(bettingAddress);
  betContractInstance = web3.eth.contract(JSON.parse(betABI)).at(betAddress)
}

const getLeaderboard = () => {
  const response = bettingContractInstance.getLeaderboard();
  const users = response[0];
  const scores = response[1];

  const leaderboard = [];

  for (let i = 0; i < users.length; i++) {
    leaderboard.push({
      username: hexToAscii(users[i]),
      balance: parseInt(scores[i])
    });
  }
  return leaderboard;
};

const getUserBalance = username => {
  return parseInt(bettingContractInstance.getBalance(username));
};

const placeBet = (username, prediction, betAmount) => {
 return bettingContractInstance.placeBet.sendTransaction(username, prediction, betAmount, { gas: 4712388 });
};

const registerUser = username => {
  return bettingContractInstance.register.sendTransaction(username);
};

// smart contract returns text in ascii
const hexToAscii = hex => web3.toAscii(hex).replace(/\u0000/g, '');

setTimeout(function(){
  console.log("------Declaring winner-----");
   return bettingContractInstance.declare.sendTransaction({ gas: 4712388 });
},120*1000);

setTimeout(function(){
  console.log("------resolving winner------");
   return bettingContractInstance.resolve.sendTransaction({ gas: 4712388 });
},180*1000);

module.exports = {
  getLeaderboard,
  getUserBalance,
  placeBet,
  registerUser
};
