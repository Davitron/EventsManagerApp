import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import app from '../server';

const should = chai.should();

chai.use(chaiHttp);

describe('Testing Authentication Routes', () => {
  describe('POST /api/v1/users', () => {
    // TESTING INVAILD USER INPUT FOR REGISTRATION
    it('Invalid email should return HTTP 400', (done) => {
      chai.request(app)
        .post('/api/v1/users')
        .send({
          email: 'fjlahflaehfa',
          username: 'danny',
          password: 'lolomimi',
          confirmPassword: 'lolomimi'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          done();
        });
    });

    it('should return HTTP 400 if email is not given', (done) => {
      chai.request(app)
        .post('/api/v1/users')
        .send({
          username: 'danny',
          password: 'lolomimi',
          confirmPassword: 'lolomimi'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          done();
        });
    });

    it('should return HTTP 400 when given username is less than minimum string required', (done) => {
      chai.request(app)
        .post('/api/v1/users')
        .send({
          email: 'mail@mail.com',
          username: 'd',
          password: 'lolomimi',
          confirmPassword: 'lolomimi'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          done();
        });
    });

    it('should return HTTP 400 when username is not given', (done) => {
      chai.request(app)
        .post('/api/v1/users')
        .send({
          email: 'mail@mail.com',
          password: 'lolomimi',
          confirmPassword: 'lolomimi'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          done();
        });
    });

    it('should return HTTP 400 when given username is more than maximum string required', (done) => {
      chai.request(app)
        .post('/api/v1/users')
        .send({
          email: 'mail@mail.com',
          username: 'dojkorajpoajpiajpriaPBJPIBj',
          password: 'lolomimi',
          confirmPassword: 'lolomimi'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          done();
        });
    });

    it('should return HTTP 400 when password is not given', (done) => {
      chai.request(app)
        .post('/api/v1/users')
        .send({
          email: 'mail@mail.com',
          username: faker.internet.userName(),
          confirmPassword: 'lolomimi'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          done();
        });
    });

    it('should return HTTP 400 when given password is less than minimum string required', (done) => {
      chai.request(app)
        .post('/api/v1/users')
        .send({
          email: 'mail@mail.com',
          username: 'dojkorajpoajpiajpriaPBJPIBj',
          password: 'lolo',
          confirmPassword: 'lol0'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          done();
        });
    });

    it('should return HTTP 400 when given password is less than minimum string required', (done) => {
      chai.request(app)
        .post('/api/v1/users')
        .send({
          email: 'mail@mail.com',
          username: 'dojkorajpoajpiajpriaPBJPIBj',
          password: 'lolo',
          confirmPassword: 'lol0'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          done();
        });
    });

    it('should return HTTP 400 when given password is not the same with the password confirmation', (done) => {
      chai.request(app)
        .post('/api/v1/users')
        .send({
          email: 'mail@mail.com',
          username: 'dojkorajpoajpiajpriaPBJPIBj',
          password: 'lolojhjsovh',
          confirmPassword: 'lol0ksbkfs'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          done();
        });
    });

    it('should return HTTP 400 when password confirmation is not provided', (done) => {
      chai.request(app)
        .post('/api/v1/users')
        .send({
          email: 'mail@mail.com',
          username: 'dojkorajpoajpiajpriaPBJPIBj',
          password: 'lolojhjsovh',
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          done();
        });
    });

    // VALID USER INPUT
    it('should return HTTP 400 when fields are pass validation but user email is taken', (done) => {
      const userName = faker.name.firstName();
      chai.request(app)
        .post('/api/v1/users')
        .send({
          email: 'eggar@googlr.com',
          username: userName,
          password: 'lolojhjsovh',
          confirmPassword: 'lolojhjsovh',
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          // res.body.should.have.property('token');
          done();
        });
    });

    it('should return HTTP 201 when fields are pass validation', (done) => {
      const newEmail = `${faker.name.lastName()}@testmail.com`;
      const userName = faker.name.firstName();
      chai.request(app)
        .post('/api/v1/users')
        .send({
          email: newEmail,
          username: userName,
          password: 'lolojhjsovh',
          confirmPassword: 'lolojhjsovh',
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          done();
        });
    });
  });

  describe('POST /api/v1/users/login', () => {
    // TESTING FOR INVALID USER INPUT
    it('It should return invalid 400 if email exist', (done) => {
      chai.request(app)
        .post('/api/v1/users/login')
        .send({
          email: 'nomail@nomial.nomail',
          password: 'gojfiepfe'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          done();
        });
    });
  });

  it('should return HTTP 400 when password is not correct', (done) => {
    chai.request(app)
      .post('/api/v1/users/login')
      .send({
        email: 'eggar@googlr.com',
        password: 'gojfiepfe'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        res.body.should.have.property('message');
        done();
      });
  });

  it('should return HTTP 200 when email and password are correct', (done) => {
    chai.request(app)
      .post('/api/v1/users/login')
      .send({
        email: 'eggar@googlr.com',
        password: 'minerva'
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.should.have.property('message');
        done();
      });
  });
});
