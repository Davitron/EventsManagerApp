import chai from 'chai';
import chaiHttp from 'chai-http';
import validator from 'validatorjs';
import app from '../server';

const should = chai.should();

chai.use(chaiHttp);

describe('Testing Authentication Routes', () => {
  describe('POST /users', () => {
    // Testing for invalid user input
    it('Invalid email should return HTTP 400', (done) => {
      chai.request(app)
        .post('/users')
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
        .post('/users')
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
        .post('/users')
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
        .post('/users')
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
        .post('/users')
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
        .post('/users')
        .send({
          email: 'mail@mail.com',
          username: 'dojkorajpoajpiajpriaPBJPIBj',
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
        .post('/users')
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
        .post('/users')
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
        .post('/users')
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
        .post('/users')
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
    it('should return HTTP 201 when fields are pass validation', (done) => {
      chai.request(app)
        .post('/users')
        .send({
          email: 'mail@mail.com',
          username: 'dojkorajp',
          password: 'lolojhjsovh',
          confirmPassword: 'lolojhjsovh',
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.an('object');
          // res.body.should.have.property('message');
          // res.body.should.have.property('token');
          done();
        });
    });
  });
});
