'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

require('../env.test');

var _server = require('../server');

var _server2 = _interopRequireDefault(_server);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var should = _chai2.default.should(); // eslint-disable-line
var Users = _models2.default.User;

_chai2.default.use(_chaiHttp2.default);

var Token = void 0;
var resetToken = void 0;

describe('Testing Authentication Routes', function () {
  describe('POST /api/v1/users', function () {
    // TESTING INVAILD USER INPUT FOR REGISTRATION
    it('Should return HTTP 400 and message if email is invalid format', function (done) {
      _chai2.default.request(_server2.default).post('/api/v1/users').send({
        email: 'fjlahflaehfa',
        username: 'danny',
        password: 'lolomimi',
        confirmPassword: 'lolomimi'
      }).end(function (err, res) {
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

    it('should return HTTP 400 if email is not given', function (done) {
      _chai2.default.request(_server2.default).post('/api/v1/users').send({
        username: 'danny',
        password: 'lolomimi',
        confirmPassword: 'lolomimi'
      }).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.an('object');
        res.body.should.have.property('message');
        res.body.message.errors.should.have.property('email');
        res.body.message.errors.email.should.be.an('array');
        res.body.message.errors.email[0].should.eql('The email field is required.');
        done();
      });
    });

    it('should return HTTP 400 when given username is less than minimum string required', function (done) {
      _chai2.default.request(_server2.default).post('/api/v1/users').send({
        email: 'mail@mail.com',
        username: 'd',
        password: 'lolomimi',
        confirmPassword: 'lolomimi'
      }).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.an('object');
        res.body.should.have.property('message');
        res.body.message.errors.should.have.property('username');
        res.body.message.errors.username.should.be.an('array');
        res.body.message.errors.username[0].should.eql('The username must be at least 3 characters.');
        done();
      });
    });

    it('Should return HTTP 400 when username is not given', function (done) {
      _chai2.default.request(_server2.default).post('/api/v1/users').send({
        email: 'mail@mail.com',
        password: 'lolomimi',
        confirmPassword: 'lolomimi'
      }).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.an('object');
        res.body.should.have.property('message');
        res.body.message.errors.should.have.property('username');
        res.body.message.errors.username.should.be.an('array');
        res.body.message.errors.username[0].should.eql('The username field is required.');
        done();
      });
    });

    it('should return HTTP 400 when given username is more than maximum string required', function (done) {
      _chai2.default.request(_server2.default).post('/api/v1/users').send({
        email: 'mail@mail.com',
        username: 'dojkorajpoajpiajpriaPBJPIBj',
        password: 'lolomimi',
        confirmPassword: 'lolomimi'
      }).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.an('object');
        res.body.should.have.property('message');
        res.body.message.errors.should.have.property('username');
        res.body.message.errors.username.should.be.an('array');
        res.body.message.errors.username[0].should.eql('The username may not be greater than 16 characters.');
        done();
      });
    });

    it('should return HTTP 400 when password is not given', function (done) {
      _chai2.default.request(_server2.default).post('/api/v1/users').send({
        email: 'mail@mail.com',
        username: _faker2.default.internet.userName(),
        confirmPassword: 'lolomimi'
      }).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.an('object');
        res.body.should.have.property('message');
        res.body.message.errors.should.have.property('password');
        res.body.message.errors.password.should.be.an('array');
        res.body.message.errors.password[0].should.eql('The password field is required.');
        done();
      });
    });

    it('should return HTTP 400 when given password is less than minimum string required', function (done) {
      _chai2.default.request(_server2.default).post('/api/v1/users').send({
        email: 'mail@mail.com',
        username: 'dojkor',
        password: 'lolo',
        confirmPassword: 'lol0'
      }).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.an('object');
        res.body.should.have.property('message');
        res.body.message.errors.should.have.property('password');
        res.body.message.errors.password.should.be.an('array');
        res.body.message.errors.password[0].should.eql('The password must be at least 6 characters.');
        done();
      });
    });

    it('should return HTTP 400 when password confirmation is not provided', function (done) {
      _chai2.default.request(_server2.default).post('/api/v1/users').send({
        email: 'mail@mail.com',
        username: 'dojkorajpoajpiajpriaPBJPIBj',
        password: 'lolojhjsovh'
      }).end(function (err, res) {
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

    it('should return HTTP 201 when fields are pass validation', function (done) {
      _chai2.default.request(_server2.default).post('/api/v1/users').send({
        email: 'matthews.segun@gmail.com',
        username: 'davido',
        password: 'minerva',
        confirmPassword: 'minerva'
      }).end(function (err, res) {
        res.should.have.status(201);
        res.body.should.be.an('object');
        res.body.should.have.property('message');
        res.body.should.have.property('token');
        res.body.should.have.property('userDetails');
        res.body.userDetails.should.be.an('object');
        res.body.should.have.property('statusCode').eql(201);
        Token = res.body.token;
        done();
      });
    });

    it('should return HTTP 400 when fields are pass validation but user email is taken', function (done) {
      _chai2.default.request(_server2.default).post('/api/v1/users').send({
        email: 'matthews.segun@gmail.com',
        username: 'minato',
        password: 'lolojhjsovh',
        confirmPassword: 'lolojhjsovh'
      }).end(function (err, res) {
        res.should.have.status(409);
        res.body.should.be.an('object');
        res.body.should.have.property('message').eql('email or username already taken');
        done();
      });
    });

    it('should return HTTP 400 when given password is not the same with the password confirmation', function (done) {
      _chai2.default.request(_server2.default).post('/api/v1/users').send({
        email: 'matthews.segun@gmailer.com',
        username: 'minato',
        password: 'lolojhjsovhajhovha',
        confirmPassword: 'lolojhjsovh'
      }).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.an('object');
        res.body.should.have.property('message').eql('Passwords do not match');
        done();
      });
    });
  });

  describe('GET /api/v1/users/completeRegistration', function () {
    it('should return 200', function (done) {
      _chai2.default.request(_server2.default).get('/api/v1/users/completeRegistration?token=' + Token).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.should.have.property('message');
        done();
      });
    });

    it('should return 400 if user is already verified', function (done) {
      _chai2.default.request(_server2.default).get('/api/v1/users/completeRegistration?token=' + Token).end(function (err, res) {
        res.should.have.status(409);
        res.body.should.be.an('object');
        res.body.should.have.property('message');
        done();
      });
    });
  });

  describe('POST /api/v1/users/login', function () {
    // TESTING FOR INVALID USER INPUT

    it('should return 400 if email is not a valid email format', function (done) {
      _chai2.default.request(_server2.default).post('/api/v1/users/login').send({
        email: 'matthews.segun.com',
        password: 'minerva'
      }).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.an('object');
        res.body.should.have.property('message');
        res.body.message.errors.should.have.property('email');
        res.body.message.errors.email.should.be.an('array');
        res.body.message.errors.email[0].should.eql('The email format is invalid.');
        done();
      });
    });

    it('should return invalid 400 if email does not exist', function (done) {
      _chai2.default.request(_server2.default).post('/api/v1/users/login').send({
        email: 'nomail@nomial.nomail',
        password: 'minerva'
      }).end(function (err, res) {
        res.should.have.status(401);
        res.body.should.be.an('object');
        res.body.should.have.property('message').eql('Invalid Login Credentials');
        done();
      });
    });

    it('should return HTTP 400 when password is not correct', function (done) {
      _chai2.default.request(_server2.default).post('/api/v1/users/login').send({
        email: 'matthews.segun@gmail.com',
        password: 'gojfiepfe'
      }).end(function (err, res) {
        res.should.have.status(401);
        res.body.should.be.an('object');
        res.body.should.have.property('message').eql('Invalid Login Credentials');
        done();
      });
    });
    it('should return H TTP 200 when email and password are correct', function (done) {
      _chai2.default.request(_server2.default).post('/api/v1/users/login').send({
        email: 'matthews.segun@gmail.com',
        password: 'minerva'
      }).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.should.have.property('message');
        done();
      });
    });
  });

  describe('POST /api/v1/users/reset', function () {
    it('should return 40o if email is wrong format', function (done) {
      _chai2.default.request(_server2.default).post('/api/v1/users/reset').send({
        email: 'matthews.segun@yahoo'
      }).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.an('object');
        res.body.should.have.property('message');
        res.body.message.errors.should.have.property('email');
        res.body.message.errors.email.should.be.an('array');
        res.body.message.errors.email[0].should.eql('The email format is invalid.');
        done();
      });
    });

    it('should return 404 if email does not exist', function (done) {
      _chai2.default.request(_server2.default).post('/api/v1/users/reset').send({
        email: 'matthews.segun@yahoo.com'
      }).end(function (err, res) {
        res.should.have.status(404);
        res.body.should.be.an('object');
        res.body.should.have.property('message').eql('User does not exist');
        done();
      });
    });

    it('should return 400 if email in not valid', function (done) {
      _chai2.default.request(_server2.default).post('/api/v1/users/reset').send({
        email: 'matthews.segun@yahoo'
      }).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.an('object');
        res.body.should.have.property('message');
        res.body.message.errors.should.have.property('email');
        res.body.message.errors.email.should.be.an('array');
        res.body.message.errors.email[0].should.eql('The email format is invalid.');
        done();
      });
    });

    it('should return 200 id email is valid and email exist', function (done) {
      _chai2.default.request(_server2.default).post('/api/v1/users/reset').send({
        email: 'matthews.segun@gmail.com'
      }).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.should.have.property('token');
        res.body.should.have.property('message').eql('Password reset link is sent');
        resetToken = res.body.token;
        done();
      });
    });
  });

  describe('POST /api/v1/users/password', function () {
    it('should return 400 if new password length is less than 6', function (done) {
      _chai2.default.request(_server2.default).post('/api/v1/users/password?token=' + resetToken).send({
        password: 'play'
      }).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.an('object');
        res.body.should.have.property('message');
        res.body.message.errors.should.have.property('password');
        res.body.message.errors.password.should.be.an('array');
        res.body.message.errors.password[0].should.eql('The password must be at least 6 characters.');
        done();
      });
    });

    it('should return 403 if token is invalid', function (done) {
      _chai2.default.request(_server2.default).post('/api/v1/users/password?token=ljwgkwgfuwkgfuwgf').send({
        password: 'playcool'
      }).end(function (err, res) {
        res.should.have.status(403);
        res.body.should.be.an('object');
        res.body.should.have.property('message').eql('Token is invalid or expired');
        done();
      });
    });

    it('should return 403 if tno token was provided', function (done) {
      _chai2.default.request(_server2.default).post('/api/v1/users/password?token=').send({
        password: 'playcool'
      }).end(function (err, res) {
        res.should.have.status(403);
        res.body.should.be.an('object');
        res.body.should.have.property('message').eql('No Token Was Provided');
        done();
      });
    });

    it('should return 400 if passwords do not match', function (done) {
      _chai2.default.request(_server2.default).post('/api/v1/users/password?token=' + resetToken).send({
        password: 'playcool',
        confirmPassword: 'playcoolin'
      }).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.an('object');
        res.body.should.have.property('message').eql('Passwords do not match');
        done();
      });
    });

    it('should return 200 if password reset is successful', function (done) {
      _chai2.default.request(_server2.default).post('/api/v1/users/password?token=' + resetToken).send({
        password: 'playcool',
        confirmPassword: 'playcool'
      }).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.should.have.property('message').eql('Password reset successful. You can proceed to Login');
        done();
      });
    });
  });

  describe('GET /api/v1/user/', function () {
    it('should fetch all users in the database', function (done) {
      _chai2.default.request(_server2.default).get('/api/v1/users').end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.should.have.property('message');
        res.body.should.have.property('statusCode');
        res.body.should.have.property('data');
        res.body.should.have.property('metaData');
        res.body.message.should.be.eql('Users Retrieved');
        res.body.data.should.be.an('array');
        res.body.metaData.should.be.an('object');
        res.body.data.length.should.be.above(0);
        done();
      });
    });
  });

  describe('DELETE /api/v1/users/:userId', function () {
    // Testing to modify an event
    it('Should return 404 if event does not exist', function (done) {
      _chai2.default.request(_server2.default).delete('/api/v1/users/' + -1).set('x-access-token', Token).end(function (err, res) {
        res.should.have.status(401);
        res.body.should.be.an('object');
        res.body.should.have.property('message').eql('This user is not an administrator');
        done();
      });
    });
  });

  after(function (done) {
    Users.destroy({
      where: {
        email: 'matthews.segun@gmail.com'
      }
    });
    done();
  });
});
//# sourceMappingURL=user.test.js.map