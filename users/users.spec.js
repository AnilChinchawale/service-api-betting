'use strict';

const bin = require('../bin/www');

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);

const config = require('../config');

const hostURL = config.getURL();
const apiRootURL = '/api/users';
const completeURL = hostURL + apiRootURL;

const userJohn = {
  username: 'johnDoe',
  password: 'john!2'
};

const userJane = {
  username: 'JaneDoe',
  password: 'JaneD1!'
};


describe('User Tests', () => {

  describe('POST ' + apiRootURL + '/sign-up', () => {
    it('user can sign up', (done) => {
      chai.request(completeURL)
        .post('/sign-up')
        .send(userJohn)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          done();
        });
    });
  });

  describe('POST ' + apiRootURL + '/sign-in', () => {
    it('user can sign in', (done) => {
      chai.request(completeURL)
        .post('/sign-in')
        .send(userJohn)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          done();
        });
    });
    it('incorrect credentials are rejected', (done) => {
      chai.request(completeURL)
        .post('/sign-in')
        .send(userJane)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res).to.be.an('object');
          done();
        });
    });
  });

});
