import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';

import app from '../../src/index';
import { token } from 'morgan';

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
  describe('1.UserRegistration-----------', () => {
    const inputBody = {
      "firstname": "sunil",
      "lastname": "kumar",
      "email": "sunilah07@gmail.com",
      "password": "sunil@007"
    }
    it('1.Given user details in registration should be saved in database', (done) => {
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
  describe('2.firstname validation---------', () => {
    const inputBody = {
      "firstname": "sun",
      "lastname": "kumar",
      "email": "sunilah07@gmail.com",
      "password": "sunil@007"
    }
    it('2.Given invalid firstname should throw corresponding error', (done) => {
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
  describe('3.lastname validation----------', () => {
    const inputBody = {
      "firstname": "sunil",
      "lastname": "kum",
      "email": "sunilah07@gmail.com",
      "password": "sunil@007"
    }
    it('3.Given invalid lastname should throw corresponding error', (done) => {
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
  describe('4.email validation---------------', () => {
    const inputBody = {
      "firstname": "sunil",
      "lastname": "kumar",
      "email": "sunilah07@gmailcom",
      "password": "sunil@007"
    }
    it('4.Given invalid email should throw corresponding error', (done) => {
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
  describe('5.password validation------------', () => {
    const inputBody = {
      "firstname": "sunil",
      "lastname": "kumar",
      "email": "sunilah07@gmail.com",
      "password": "abc"
    }
    it('5.Given invalid password should throw corresponding error', (done) => {
      request(app)
        .post('/api/v1/users/register')
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });

  var token;
  //6 - Test case for user login
  describe('6.User login--------------', () => {
    const inputBody = {
      "email": "sunilah07@gmail.com",
      "password": "sunil@007"
    }
    it('6.Given user details in login should get logged into account', (done) => {
      request(app)
        .post('/api/v1/users/login')
        .send(inputBody)
        .end((err, res) => {
          token = res.body.data;
          expect(res.statusCode).to.be.equal(202);
          done();
        });
    });
  });

  //7 - Test case for email in login
  describe('7.User login email-------------', () => {
    const inputBody = {
      "email": "sunilah07@gmailcom",
      "password": "sunil@007"
    }
    it('7.Given invalid email for login should throw corresponding error', (done) => {
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
  describe('8.User login password-------------', () => {
    const inputBody = {
      "email": "sunilah07@gmail.com",
      "password": "suni"
    }
    it('8.Given invalid password for login should throw corresponding error', (done) => {
      request(app)
        .post('/api/v1/users/login')
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });

  var id;
  // 9 - Test case for create notes
  describe('9.Create notes-------------', () => {
    const inputBody = {
      "title": "season",
      "description": "winter"
    }
    it('9.Given notes details should be saved in database', (done) => {
      request(app)
        .post('/api/v1/notes/')
        .set('authorization', `Bearer ${token}`)
        .send(inputBody)
        .end((err, res) => {
          id = res.body.data._id;
          expect(res.statusCode).to.be.equal(201);
          done();
        });
    });
  });

  
  // 10 - Test case for invalid create notes
  describe('10.Invalid Create notes-----------', () => {
    const inputBody = {
      "title": "season"
    }
    it('10.Given invalid notes details should throw error', (done) => {
      request(app)
        .post('/api/v1/notes/')
        .set('authorization', `Bearer ${token}`)
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });

  // 11 - Test case for get all notes
  describe('11.Get all notes--------------', () => {
    it('11.Given user login details should get all saved notes', (done) => {
      request(app)
        .get('/api/v1/notes/')
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(202);
          done();
        });
    });
  });

  // 12 - Test case for get all notes invalid token
  describe('12.Get all notes with invalid token--------------', () => {
    it('12.Given invalid token should throw error', (done) => {
      request(app)
        .get('/api/v1/notes/')
        .set('authorization', `${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });

  // 13 - Test case for get all notes without authorization
  describe('13.Get all notes without authorization---------------', () => {
    it('13.Given invalid authorization should throw error', (done) => {
      request(app)
        .get('/api/v1/notes/')
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(400);
          done();
        });
    });
  });

  // 14 - Test case for get note by id
  describe('14.Get note by id------------', () => {
    it('14.Given note id should fetch particular note', (done) => {
      request(app)
        .get(`/api/v1/notes/${id}`)
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(200);
          done();
        });
    });
  });

  // 15 - Test case for get note by invalid id
  describe('15.Get note by id------------', () => {
    it('15.Given invalid note id should throw error', (done) => {
      request(app)
        .get(`/api/v1/notes/qwertyuiop`)
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });

  // 16 - Test case for update note by id
  describe('16.Update note by id-------------', () => {
    const inputBody= {
      "colour": "red"
    }
    it('16.Given note id should update particular note', (done) => {
      request(app)
        .put(`/api/v1/notes/${id}`)
        .set('authorization', `Bearer ${token}`)
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(202);
          done();
        });
    });
  });

  // 17 - Test case for update note with invalid field
   describe('17.Update note with invalid field-------------', () => {
    const inputBody= {
      "colou": "red"
    }
    it('17.Given note id with invalid field should throw error', (done) => {
      request(app)
        .put(`/api/v1/notes/${id}`)
        .set('authorization', `Bearer ${token}`)
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });

   // 18 - Test case to update archive status of note by id
   describe('18.Archive status of note by id-------------', () => {
    it('18.Given note id should update archive status of particular note', (done) => {
      request(app)
        .put(`/api/v1/notes/${id}/isArchive`)
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(202);
          done();
        });
    });
  });

  // 19 - Test case to update trash status of note by id
  describe('19.Trash status of note by id-------------', () => {
    it('19.Given note id should update trash status of particular note', (done) => {
      request(app)
        .put(`/api/v1/notes/${id}/isTrash`)
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(202);
          done();
        });
    });
  });
 
  // 20 - Test case to delete note by id
  describe('20.Delete note by id------------', () => {
    it('20.Given note id should delete particular note', (done) => {
      request(app)
        .delete(`/api/v1/notes/${id}`)
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(200);
          done();
        });
    });
  });

  
});
