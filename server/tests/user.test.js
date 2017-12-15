import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import app from '../server';
import model from '../models';

const should = chai.should();
const Users = model.User;

chai.use(chaiHttp);

describe('Testing Authentication Routes', () => {
  describe('POST /api/v1/users', () => {
    // TESTING INVAILD USER INPUT FOR REGISTRATION
    it('Should return HTTP 400 and message if email is invalid format', (done) => {
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
          res.body.should.have.property('message');
          res.body.message.should.have.property('errors');
          res.body.message.errors.should.have.property('email');
          res.body.message.errors.email.should.be.an('array');
          res.body.message.errors.email[0].should.eql('The email format is invalid.');
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
          res.body.should.have.property('message');
          res.body.message.errors.should.have.property('email');
          res.body.message.errors.email.should.be.an('array');
          res.body.message.errors.email[0].should.eql('The email field is required.');
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
          res.body.should.have.property('message');
          res.body.message.errors.should.have.property('username');
          res.body.message.errors.username.should.be.an('array');
          res.body.message.errors.username[0].should.eql('The username must be at least 3 characters.');
          done();
        });
    });

    it('Should return HTTP 400 when username is not given', (done) => {
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
          res.body.should.have.property('message');
          res.body.message.errors.should.have.property('username');
          res.body.message.errors.username.should.be.an('array');
          res.body.message.errors.username[0].should.eql('The username field is required.');
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
          res.body.should.have.property('message');
          res.body.message.errors.should.have.property('username');
          res.body.message.errors.username.should.be.an('array');
          res.body.message.errors.username[0].should.eql('The username may not be greater than 16 characters.');
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
          res.body.should.have.property('message');
          res.body.message.errors.should.have.property('password');
          res.body.message.errors.password.should.be.an('array');
          res.body.message.errors.password[0].should.eql('The password field is required.');
          done();
        });
    });

    it('should return HTTP 400 when given password is less than minimum string required', (done) => {
      chai.request(app)
        .post('/api/v1/users')
        .send({
          email: 'mail@mail.com',
          username: 'dojkor',
          password: 'lolo',
          confirmPassword: 'lol0'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          res.body.message.errors.should.have.property('password');
          res.body.message.errors.password.should.be.an('array');
          res.body.message.errors.password[0].should.eql('The password must be at least 6 characters.');
          done();
        });
    });

    it('should return HTTP 400 when password confirmation is not provided', (done) => {
      chai.request(app)
        .post('/api/v1/users')
        .send({
          email: 'mail@mail.com',
          username: 'dojkorajpoajpiajpriaPBJPIBj',
          password: 'lolojhjsovh'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          res.body.message.errors.should.have.property('confirmPassword');
          res.body.message.errors.confirmPassword.should.be.an('array');
          res.body.message.errors.confirmPassword[0].should.eql('The confirmPassword field is required.');
          done();
        });
    });

    // VALID USER INPUT

    it('should return HTTP 201 when fields are pass validation', (done) => {
      chai.request(app)
        .post('/api/v1/users')
        .send({
          email: 'matthews.segun@gmail.com',
          username: 'davido',
          password: 'minerva',
          confirmPassword: 'minerva',
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          done();
        });
    });

    it('should return HTTP 400 when fields are pass validation but user email is taken', (done) => {
      chai.request(app)
        .post('/api/v1/users')
        .send({
          email: 'matthews.segun@gmail.com',
          username: 'minato',
          password: 'lolojhjsovh',
          confirmPassword: 'lolojhjsovh',
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          res.body.should.have.property('message').eql('User with mail already exists');
          done();
        });
    });

    it('should return HTTP 400 when given password is not the same with the password confirmation', (done) => {
      chai.request(app)
        .post('/api/v1/users')
        .send({
          email: 'matthews.segun@gmailer.com',
          username: 'minato',
          password: 'lolojhjsovhajhovha',
          confirmPassword: 'lolojhjsovh',
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          res.body.should.have.property('message').eql('Passwords do not match');
          done();
        });
    });
  });

  describe('POST /api/v1/users/login', () => {
    // TESTING FOR INVALID USER INPUT
    it('It should return invalid 400 if email does not exist', (done) => {
      chai.request(app)
        .post('/api/v1/users/login')
        .send({
          email: 'nomail@nomial.nomail',
          password: 'minerva'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          res.body.should.have.property('message').eql('Invalid Login Credentials');
          done();
        });
    });

    it('should return HTTP 400 when password is not correct', (done) => {
      chai.request(app)
        .post('/api/v1/users/login')
        .send({
          email: 'matthews.segun@gmail.com',
          password: 'gojfiepfe'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          res.body.should.have.property('message').eql('Invalid Password');
          done();
        });
    });
    it('should return HTTP 200 when email and password are correct', (done) => {
      chai.request(app)
        .post('/api/v1/users/login')
        .send({
          email: 'matthews.segun@gmail.com',
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


  after((done) => {
    Users.destroy({
      where: {
        email: 'matthews.segun@gmail.com'
      }
    });
    done();
  });
});
