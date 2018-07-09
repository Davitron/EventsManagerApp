'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

require('../env.test');

var _server = require('../server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(_chaiHttp2.default);

var token = void 0;
var notAdminToken = void 0;
var centerID = void 0;

var validRequest = {
  name: 'Test Center',
  stateId: 1,
  address: '7, xyz avenue, ikaja',
  hallCapacity: '600',
  carParkCapacity: '200',
  facilities: ['swimming pool', 'projectors', 'cctv', 'vip lounges'],
  price: '1200000',
  image: 'test/image/link'
};

var validRequestForUpdate = {
  name: 'The power space',
  stateId: 1,
  address: '7, abc avenue, ikeja',
  hallCapacity: 600,
  carParkCapacity: 200,
  facilities: ['swimming pool', 'projectors', 'cctv', 'vip lounges'],
  price: 1200000
};

var requestBody = {
  name: 'The power space',
  image: 'path/to/image'
};

describe('Testing Api endpoints for centers', function () {
  describe('POST /api/v1/centers', function () {
    it('should return HTTP 200 when email and password are correct', function (done) {
      _chai2.default.request(_server2.default).post('/api/v1/users/login').send({
        email: 'segunmatthews@outlook.com',
        password: 'minerva'
      }).end(function (err, res) {
        token = res.body.Token;
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.should.have.property('message').eql('Authentication Is Successful!');
        res.body.should.have.property('Token');
        done();
      });
    });
    it('should return HTTP 200 when email and password are correct for none admin user', function (done) {
      _chai2.default.request(_server2.default).post('/api/v1/users/login').send({
        email: 'voltron@mailinator.com',
        password: 'minerva'
      }).end(function (err, res) {
        notAdminToken = res.body.Token;
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.should.have.property('message').eql('Authentication Is Successful!');
        res.body.should.have.property('Token');
        done();
      });
    });
    it('Should return HTTP status 400 and message for post without center name', function (done) {
      _chai2.default.request(_server2.default).post('/api/v1/centers/').set('x-access-token', token).send({
        stateId: 1,
        address: '7, xyz avenue, ikaja',
        hallCapacity: 600,
        carParkCapacity: 200,
        facilities: [['swimming pool, projectors, cctv, vip lounges']],
        price: 1200000,
        image: 'test/image/link'
      }).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.an('object');
        res.body.should.have.property('message');
        res.body.message.should.have.property('errors');
        res.body.message.errors.should.have.property('name');
        res.body.message.errors.name.should.be.an('array');
        res.body.message.errors.name[0].should.eql('The name field is required.');
        done();
      });
    });
    it('Should return HTTP status 400 and message for post without center stateId', function (done) {
      _chai2.default.request(_server2.default).post('/api/v1/centers/').set('x-access-token', token).send({
        name: 'The centers Place',
        address: '7, xyz avenue, ikaja',
        hallCapacity: 600,
        carParkCapacity: 200,
        facilities: [['swimming pool, projectors, cctv, vip lounges']],
        price: 1200000,
        image: 'test/image/link'
      }).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.an('object');
        res.body.should.have.property('message');
        res.body.message.errors.should.have.property('stateId');
        res.body.message.errors.stateId.should.be.an('array');
        res.body.message.errors.stateId[0].should.eql('The stateId field is required.');
        done();
      });
    });
    it('Should return HTTP status 400 and message for post without center address', function (done) {
      _chai2.default.request(_server2.default).post('/api/v1/centers/').set('x-access-token', token).send({
        name: 'The centers Place',
        stateId: 1,
        // address: '7, xyz avenue, ikaja',
        hallCapacity: 600,
        carParkCapacity: 200,
        facilities: ['swimming pool, projectors, cctv, vip lounges'],
        price: 1200000,
        image: 'test/image/link'
      }).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.an('object');
        res.body.should.have.property('message');
        res.body.message.errors.should.have.property('address');
        res.body.message.errors.address.should.be.an('array');
        res.body.message.errors.address[0].should.eql('The address field is required.');
        done();
      });
    });
    it('Should return HTTP status 400 and message for post without center hallCapacity', function (done) {
      _chai2.default.request(_server2.default).post('/api/v1/centers/').set('x-access-token', token).send({
        name: 'The centers Place',
        stateId: 1,
        address: '7, xyz avenue, ikaja',
        carParkCapacity: 200,
        facilities: ['swimming pool, projectors, cctv, vip lounges'],
        price: 1200000,
        image: 'test/image/link'
      }).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.an('object');
        res.body.should.have.property('message');
        res.body.message.errors.should.have.property('hallCapacity');
        res.body.message.errors.hallCapacity.should.be.an('array');
        res.body.message.errors.hallCapacity[0].should.eql('The hallCapacity field is required.');
        done();
      });
    });

    it('Should return HTTP status 400 and message for post without center carParkCapacity', function (done) {
      _chai2.default.request(_server2.default).post('/api/v1/centers/').set('x-access-token', token).send({
        name: 'The centers Place',
        stateId: 1,
        address: '7, xyz avenue, ikaja',
        hallCapacity: 600,
        facilities: ['swimming pool, projectors, cctv, vip lounges'],
        price: 1200000,
        image: 'test/image/link'
      }).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.an('object');
        res.body.should.have.property('message');
        res.body.message.errors.should.have.property('carParkCapacity');
        res.body.message.errors.carParkCapacity.should.be.an('array');
        res.body.message.errors.carParkCapacity[0].should.eql('The carParkCapacity field is required.');
        done();
      });
    });
    it('Should return HTTP status 400 and message for post without center price', function (done) {
      _chai2.default.request(_server2.default).post('/api/v1/centers/').set('x-access-token', token).send({
        name: 'The centers Place',
        stateId: 1,
        address: '7, xyz avenue, ikaja',
        hallCapacity: 600,
        carParkCapacity: 200,
        facilities: ['swimming pool, projectors, cctv, vip lounges'],
        image: 'test/image/link'
      }).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.an('object');
        res.body.should.have.property('message');
        res.body.message.errors.should.have.property('price');
        res.body.message.errors.price.should.be.an('array');
        res.body.message.errors.price[0].should.eql('The price field is required.');
        done();
      });
    });

    it('Should return HTTP status 400 and message for post if center name exceeds 30 chatacters', function (done) {
      _chai2.default.request(_server2.default).post('/api/v1/centers/').set('x-access-token', token).send({
        name: 'The centers Place where magic happens and you never forget',
        stateId: 1,
        address: '7, xyz avenue, ikaja',
        hallCapacity: 600,
        carParkCapacity: 200,
        facilities: ['swimming pool, projectors, cctv, vip lounges'],
        price: 1200000,
        image: 'test/image/link'
      }).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.an('object');
        res.body.should.have.property('message');
        res.body.message.errors.should.have.property('name');
        res.body.message.errors.name.should.be.an('array');
        done();
      });
    });

    it('Should return HTTP 400 if center address is not up to 10 characters', function (done) {
      _chai2.default.request(_server2.default).post('/api/v1/centers/').set('x-access-token', token).send({
        name: 'The power house',
        stateId: 1,
        address: '7, xyz',
        hallCapacity: '600',
        carParkCapacity: '200',
        facilities: ['swimming pool, projectors, cctv, vip lounges'],
        price: '1200000',
        image: 'test/image/link'
      }).end(function (err, res) {
        centerID = res.body.centerId;
        res.should.have.status(400);
        res.body.should.be.an('object');
        res.body.should.have.property('message');
        res.body.message.errors.should.have.property('address');
        res.body.message.errors.address.should.be.an('array');
        done();
      });
    });

    // =====VALID INPUT====== //

    it('Should return HTTP 401 with response object when user is not an admin', function (done) {
      _chai2.default.request(_server2.default).post('/api/v1/centers/').set('x-access-token', notAdminToken).send(validRequest).end(function (err, res) {
        res.should.have.status(401);
        res.body.should.be.an('object');
        res.body.should.have.property('message').eql('This user is not an administrator');
        done();
      });
    });

    it('Should return HTTP 201 with response object when all fields pass validation and user is admin', function (done) {
      _chai2.default.request(_server2.default).post('/api/v1/centers/').set('x-access-token', token).send(validRequest).end(function (err, res) {
        centerID = res.body.centerId;
        res.should.have.status(201);
        res.body.should.be.an('object');
        res.body.should.have.property('message').eql('New Center Created');
        res.body.should.have.property('centerId');
        res.body.should.have.property('statusCode');
        done();
      });
    });
  });

  describe('GET /api/v1/centers', function () {
    // Testing  to get all centers
    it('Should return 200 with an array of all centers', function (done) {
      _chai2.default.request(_server2.default).get('/api/v1/centers/').set('x-access-token', token).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.have.property('message');
        res.body.should.have.property('statusCode');
        res.body.should.have.property('data');
        res.body.should.have.property('metadata');
        res.body.message.should.eql('Centers Retrieved');
        res.body.statusCode.should.eql(200);
        res.body.data.should.an('array');
        res.body.metadata.should.be.an('object');
        res.body.metadata.should.have.property('pagination');
        done();
      });
    });

    // Testing  to get all centers with query
    it('Should return 200 with an array of all centers that match query', function (done) {
      _chai2.default.request(_server2.default).get('/api/v1/centers?state=1&search=test&capacity=600&facilities[]=cctv').set('x-access-token', token).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.have.property('message');
        res.body.should.have.property('statusCode');
        res.body.should.have.property('data');
        res.body.should.have.property('metadata');
        res.body.message.should.eql('Centers Retrieved');
        res.body.statusCode.should.eql(200);
        res.body.data.should.an('array');
        res.body.metadata.should.be.an('object');
        res.body.metadata.should.have.property('pagination');
        done();
      });
    });
  });

  describe('GET /api/v1/centers/:centerId', function () {
    // Testing to get all centers
    it('Should return 404 if center is not found', function (done) {
      _chai2.default.request(_server2.default).get('/api/v1/centers/' + -1).set('x-access-token', token).end(function (err, res) {
        res.should.have.status(404);
        res.body.should.be.an('object');
        res.body.should.have.property('message');
        res.body.message.should.eql('Center Not Found');
        done();
      });
    });

    it('Should return 200 with center object requested for', function (done) {
      _chai2.default.request(_server2.default).get('/api/v1/centers/' + centerID + '/').set('x-access-token', token).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.an('object');
        done();
      });
    });
  });

  describe('PUT /api/v1/centers/:id', function () {
    it('Should return HTTP 401 with response object when user is not an admin', function (done) {
      _chai2.default.request(_server2.default).put('/api/v1/centers/' + centerID + '/').set('x-access-token', notAdminToken).send({
        name: 'The power spot',
        stateId: 1,
        address: '7, xyz avenue, ikaja',
        hallCapacity: '600',
        carParkCapacity: '200',
        facilities: ['swimming pool, projectors, cctv, vip lounges'],
        price: '1200000',
        image: 'test/image/link'
      }).end(function (err, res) {
        res.should.have.status(401);
        res.body.should.be.an('object');
        res.body.should.have.property('message').eql('This user is not an administrator');
        done();
      });
    });

    it('Should return HTTP status 400 and message if center name exceeds or less than 30 chatacters', function (done) {
      _chai2.default.request(_server2.default).put('/api/v1/centers/' + centerID + '/').set('x-access-token', token).send({
        name: 'Ao',
        stateId: 1,
        address: '7, abc avenue, ikeja',
        hallCapacity: '600',
        carParkCapacity: '200',
        facilities: ['swimming pool, projectors, cctv, vip lounges'],
        price: '1200000'
      }).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.an('object');
        res.body.should.have.property('message');
        res.body.message.errors.should.have.property('name');
        res.body.message.errors.name.should.be.an('array');
        done();
      });
    });

    it('Should return 404 if center is not found', function (done) {
      _chai2.default.request(_server2.default).put('/api/v1/centers/' + -1 + '/').set('x-access-token', token).send({
        name: 'The power space',
        stateId: 1,
        address: '7, abc avenue, ikeja',
        hallCapacity: 600,
        carParkCapacity: 200,
        facilities: ['swimming pool, projectors, cctv, vip lounges'],
        price: 1200000
      }).end(function (err, res) {
        res.should.have.status(404);
        res.body.should.be.an('object');
        res.body.should.have.property('message');
        res.body.message.should.eql('center does not exist');
        done();
      });
    });

    it('Should return 400 if centerId is not a number', function (done) {
      _chai2.default.request(_server2.default).put('/api/v1/centers/jbkbkkkhvk/').set('x-access-token', token).send({
        name: 'The power space',
        stateId: 1,
        address: '7, abc avenue, ikeja',
        hallCapacity: '600',
        carParkCapacity: '200',
        facilities: ['swimming pool, projectors, cctv, vip lounges'],
        price: '1200000'
      }).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.an('object');
        res.body.should.have.property('message');
        res.body.message.should.eql('Invalid centerId');
        done();
      });
    });

    it('Should return 200 with modified center', function (done) {
      _chai2.default.request(_server2.default).put('/api/v1/centers/' + centerID + '/').set('x-access-token', token).send(validRequestForUpdate).end(function (err, res) {
        var response = res.body.updatedCenter;
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.should.have.property('message');
        res.body.should.have.property('updatedCenter');
        response.name.should.equal(validRequestForUpdate.name);
        response.address.should.equal(validRequestForUpdate.address);
        response.stateId.should.equal(validRequestForUpdate.stateId);
        response.carParkCapacity.should.equal(validRequestForUpdate.carParkCapacity);
        response.hallCapacity.should.equal(validRequestForUpdate.hallCapacity);
        response.price.should.equal(validRequestForUpdate.price);
        done();
      });
    });

    it('Should return 200 with modified center', function (done) {
      _chai2.default.request(_server2.default).put('/api/v1/centers/' + centerID + '/').set('x-access-token', token).send(requestBody).end(function (err, res) {
        var response = res.body.updatedCenter;
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.should.have.property('message');
        res.body.should.have.property('updatedCenter');
        response.name.should.equal(requestBody.name);
        response.image.should.equal(requestBody.image);
        done();
      });
    });

    it('Should return 200 with modified center event if request body has no name field ', function (done) {
      var request = {
        stateId: 1,
        address: '7, abc avenue, lagos-island',
        hallCapacity: '600',
        carParkCapacity: '400',
        facilities: ['swimming pool, projectors, cctv, vip lounges'],
        price: '1200000'
      };

      _chai2.default.request(_server2.default).put('/api/v1/centers/' + centerID + '/').set('x-access-token', token).send(request).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.should.have.property('message');
        res.body.should.have.property('updatedCenter');
        res.body.updatedCenter.stateId.should.equal(request.stateId);
        res.body.updatedCenter.address.should.equal(request.address);
        done();
      });
    });
  });

  describe('DELETE /api/v1/centers/:id', function () {
    // Testing to modify an center
    it('Should return 404 if center does not exist', function (done) {
      _chai2.default.request(_server2.default).delete('/api/v1/centers/' + -1 + '/').set('x-access-token', token).end(function (err, res) {
        res.should.have.status(404);
        res.body.should.be.an('object');
        res.body.should.have.property('message');
        done();
      });
    });

    it('Should return 200 if center is deleted', function (done) {
      _chai2.default.request(_server2.default).delete('/api/v1/centers/' + centerID + '/').set('x-access-token', token).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.should.have.property('message');
        done();
      });
    });

    it('Should return 500 if centerId not a number', function (done) {
      _chai2.default.request(_server2.default).delete('/api/v1/centers/houwhgouwhgw/').set('x-access-token', token).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.an('object');
        res.body.should.have.property('message');
        res.body.should.have.property('statusCode');
        res.body.message.should.eql('Invalid centerId');
        res.body.statusCode.should.eql(400);
        done();
      });
    });
  });
});

describe('Testing API endpoint for states', function () {
  it('should a list of states', function (done) {
    _chai2.default.request(_server2.default).get('/api/v1/states').then(function (res) {
      res.should.have.status(200);
      res.body.should.be.an('object');
      res.body.should.have.property('message');
      res.body.message.should.eql('States Retrieved');
      res.body.should.have.property('statusCode');
      res.body.statusCode.should.eql(200);
      res.body.should.have.property('states');
      res.body.states.should.be.an('array');
      res.body.states.length.should.eql(37);
      done();
    });
  });
});
//# sourceMappingURL=center.server.test.js.map