import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';

import app from '../../src/index';

describe('User APIs Test', () => {
  before((done) => {
    const clearCollections = () => {
      for (const collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].deleteOne(() => { });
      }
    };

    const mongooseConnect = async () => {
      await mongoose.connect(process.env.DATABASE_TEST);
      clearCollections();
    };

    if (mongoose.connection.readyState === 0) {
      mongooseConnect();
    } else {
      clearCollections();
    }

    done();
  });

  // 1 - Test case for user registration
  describe('UserRegistration', () => {
    const inputBody = {
      "firstname": "sunil",
      "lastname": "kumar",
      "email": "sunilah07@gmail.com",
      "password": "sunil@007"
    }
    it('Given user details in registration should be saved in database', (done) => {
      request(app)
        .post('/api/v1/users/register')
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(201);
          done();
        });
    });
  });

  // 2 - Test case for firstname
  describe('firstname validation', () => {
    const inputBody = {
      "firstname": "sun",
      "lastname": "kumar",
      "email": "sunilah07@gmail.com",
      "password": "sunil@007"
    }
    it('Given invalid firstname should throw corresponding error', (done) => {
      request(app)
        .post('/api/v1/users/register')
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });

  //3 - Test case for lastname
  describe('lastname validation', () => {
    const inputBody = {
      "firstname": "sunil",
      "lastname": "kum",
      "email": "sunilah07@gmail.com",
      "password": "sunil@007"
    }
    it('Given invalid lastname should throw corresponding error', (done) => {
      request(app)
        .post('/api/v1/users/register')
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });

  //4 - Test case for email
  describe('email validation', () => {
    const inputBody = {
      "firstname": "sunil",
      "lastname": "kumar",
      "email": "sunilah07@gmailcom",
      "password": "sunil@007"
    }
    it('Given invalid email should throw corresponding error', (done) => {
      request(app)
        .post('/api/v1/users/register')
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });

  //5 - Test case for password
  describe('password validation', () => {
    const inputBody = {
      "firstname": "sunil",
      "lastname": "kumar",
      "email": "sunilah07@gmail.com",
      "password": "abc"
    }
    it('Given invalid password should throw corresponding error', (done) => {
      request(app)
        .post('/api/v1/users/register')
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });

  //6 - Test case for user login
  describe('User login', () => {
    const inputBody = {
      "email": "sunilah07@gmail.com",
      "password": "sunil@007"
    }
    it('Given user details in login should get logged into account', (done) => {
      request(app)
        .post('/api/v1/users/login')
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(202);
          done();
        });
    });
  });

  //7 - Test case for email in login
  describe('User login email', () => {
    const inputBody = {
      "email": "sunilah07@gmailcom",
      "password": "sunil@007"
    }
    it('Given invalid email for login should throw corresponding error', (done) => {
      request(app)
        .post('/api/v1/users/login')
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });

  //8 - Test case for password in login
  describe('User login password', () => {
    const inputBody = {
      "email": "sunilah07@gmail.com",
      "password": "suni"
    }
    it('Given invalid password for login should throw corresponding error', (done) => {
      request(app)
        .post('/api/v1/users/login')
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });

});
