'use strict';

const config = require('./config');
const env = process.env.NODE_ENV || 'development';
const envtConfig = config[env]; // env specific values

module.exports = {
  getEnv: () => {
    return env;
  },
  getStatusMsgs: () => {
    return config.statusMsgs;
  },
  getGethUrl: () => {
    return envtConfig.gethUrl;
  },
  getURL: () => {
    return envtConfig.url;
  }
};
