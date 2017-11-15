'use strict';

const blockchainService = require('../blockchain');

const createNewRound = (req, res) => {
  const tx = blockchainService.createNewRound();
  return res.status(202).json({message: "Success", tx});
};

const declareRound = (req, res) => {
  const tx = blockchainService.declareRound();
  return res.status(202).json({message: "Success", tx});
};

const resolveRound = (req, res) => {
  const tx = blockchainService.resolveRound();
  return res.status(202).json({message: "Success", tx});
};


module.exports = {
  createNewRound,
  declareRound,
  resolveRound
};
