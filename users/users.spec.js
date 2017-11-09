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
  username: 'johnDoe' + Math.random(100), // since smart contract doesn't clear users between tests
  password: 'john!2'
};

const userJane = {
  username: 'JaneDoe',
  password: 'JaneD1!'
};


describe('User Tests', () => {

  describe('Sign Up Tests', () => {

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

    it('cannot sign up with existing username', (done) => {
      chai.request(completeURL)
        .post('/sign-up')
        .send(userJohn)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res).to.be.an('object');
          done();
        });
    });

    // bad username
    it('cannot sign up without username', (done) => {
      chai.request(completeURL)
        .post('/sign-up')
        .send({ password: 'sdfsd' })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res).to.be.an('object');
          done();
        });
    });

    it('cannot sign up with blank username', (done) => {
      chai.request(completeURL)
        .post('/sign-up')
        .send({ username: '', password: 'asdasd' })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res).to.be.an('object');
          done();
        });
    });

    it('cannot sign up with non-string username', (done) => {
      chai.request(completeURL)
        .post('/sign-up')
        .send({ username: 1, password: 'asdasd' })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res).to.be.an('object');
          done();
        });
    });

    // bad password
    it('cannot sign up without password', (done) => {
      chai.request(completeURL)
        .post('/sign-up')
        .send({ username: 'sdfsd' })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res).to.be.an('object');
          done();
        });
    });

    it('cannot sign up with blank password', (done) => {
      chai.request(completeURL)
        .post('/sign-up')
        .send({ usernam: 'dfsd', password: '' })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res).to.be.an('object');
          done();
        });
    });

    it('cannot sign up with non-string password', (done) => {
      chai.request(completeURL)
        .post('/sign-up')
        .send({ username: 'sdfsdf', password: 1 })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res).to.be.an('object');
          done();
        });
    });
  });

  describe('Sign In Tests', () => {

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

    // bad username
    it('cannot sign up without username', (done) => {
      chai.request(completeURL)
        .post('/sign-in')
        .send({ password: 'sdfsd' })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res).to.be.an('object');
          done();
        });
    });

    it('cannot sign up with blank username', (done) => {
      chai.request(completeURL)
        .post('/sign-in')
        .send({ username: '', password: 'asdasd' })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res).to.be.an('object');
          done();
        });
    });

    it('cannot sign up with non-string username', (done) => {
      chai.request(completeURL)
        .post('/sign-in')
        .send({ username: 1, password: 'asdasd' })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res).to.be.an('object');
          done();
        });
    });

    // bad password
    it('cannot sign up without password', (done) => {
      chai.request(completeURL)
        .post('/sign-in')
        .send({ username: 'sdfsd' })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res).to.be.an('object');
          done();
        });
    });

    it('cannot sign up with blank password', (done) => {
      chai.request(completeURL)
        .post('/sign-in')
        .send({ usernam: 'dfsd', password: '' })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res).to.be.an('object');
          done();
        });
    });

    it('cannot sign up with non-string password', (done) => {
      chai.request(completeURL)
        .post('/sign-in')
        .send({ username: 'sdfsdf', password: 1 })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res).to.be.an('object');
          done();
        });
    });
  });

  describe('Prediction tests', () => {

    it('user can make prediction', (done) => {
      chai.request(completeURL)
        .post('/predict')
        .send({
          username: userJohn.user,
          prediction: 456482,
          coins: 11
        })
        .end((err, res) => {
          expect(res).to.have.status(202);
          expect(res).to.be.an('object');
          done();
        });
    });
  });

  it('user can get leaderboard', (done) => {
      chai.request(completeURL)
        .get('/leaderboard?username=' + userJohn.username)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          done();
        });
    });

    it('user can get wallet', (done) => {
      chai.request(completeURL)
        .get('/wallet?username=' + userJohn.username )
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          expect(res.body.balance).to.be.a('number');
          done();
        });
    });

});
