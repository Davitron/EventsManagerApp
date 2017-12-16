import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import app from '../server';
import model from '../models';

const should = chai.should();
const Centers = model.Center;

chai.use(chaiHttp);

let token;
let notAdminToken;
let centerID;
describe('Testing Api endpoints for centers', () => {


  describe('POST /api/v1/centers', () => {
    it('should return HTTP 200 when email and password are correct', (done) => {
      chai.request(app)
        .post('/api/v1/users/login')
        .send({
          email: 'segunmatthews@outlook.com',
          password: 'minerva'
        })
        .end((err, res) => {
          token = res.body.Token;
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('message').eql('Authentication Is Successful!');
          res.body.should.have.property('Token');
          done();
        });
    });
    it('should return HTTP 200 when email and password are correct for none admin user', (done) => {
      chai.request(app)
        .post('/api/v1/users/login')
        .send({
          email: 'segunmatthews@plush.com',
          password: 'minerva1'
        })
        .end((err, res) => {
          notAdminToken = res.body.Token;
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('message').eql('Authentication Is Successful!');
          res.body.should.have.property('Token');
          done();
        });
    });
    it('Should return HTTP status 400 and message for post without center name', (done) => {
      chai.request(app)
        .post('/api/v1/centers/')
        .set('x-access-token', token)
        .send({
          stateId: 1,
          address: '7, xyz avenue, ikaja',
          hallCapacity: 600,
          carParkCapacity: 200,
          facilities: 'swimming pool, projectors, cctv, vip lounges',
          price: 1200000
        })
        .end((err, res) => {
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
    it('Should return HTTP status 400 and message for post without center stateId', (done) => {
      chai.request(app)
        .post('/api/v1/centers/')
        .set('x-access-token', token)
        .send({
          name: 'The centers Place',
          address: '7, xyz avenue, ikaja',
          hallCapacity: 600,
          carParkCapacity: 200,
          facilities: 'swimming pool, projectors, cctv, vip lounges',
          price: 1200000
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          res.body.message.errors.should.have.property('stateId');
          res.body.message.errors.stateId.should.be.an('array');
          res.body.message.errors.stateId[0].should.eql('The stateId field is required.');
          done();
        });
    });
    it('Should return HTTP status 400 and message for post without center address', (done) => {
      chai.request(app)
        .post('/api/v1/centers/')
        .set('x-access-token', token)
        .send({
          name: 'The centers Place',
          stateId: 1,
          // address: '7, xyz avenue, ikaja',
          hallCapacity: 600,
          carParkCapacity: 200,
          facilities: 'swimming pool, projectors, cctv, vip lounges',
          price: 1200000
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          res.body.message.errors.should.have.property('address');
          res.body.message.errors.address.should.be.an('array');
          res.body.message.errors.address[0].should.eql('The address field is required.');
          done();
        });
    });
    it('Should return HTTP status 400 and message for post without center hallCapacity', (done) => {
      chai.request(app)
        .post('/api/v1/centers/')
        .set('x-access-token', token)
        .send({
          name: 'The centers Place',
          stateId: 1,
          address: '7, xyz avenue, ikaja',
          carParkCapacity: 200,
          facilities: 'swimming pool, projectors, cctv, vip lounges',
          price: 1200000
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          res.body.message.errors.should.have.property('hallCapacity');
          res.body.message.errors.hallCapacity.should.be.an('array');
          res.body.message.errors.hallCapacity[0].should.eql('The hallCapacity field is required.');
          done();
        });
    });

    it('Should return HTTP status 400 and message for post without center carParkCapacity', (done) => {
      chai.request(app)
        .post('/api/v1/centers/')
        .set('x-access-token', token)
        .send({
          name: 'The centers Place',
          stateId: 1,
          address: '7, xyz avenue, ikaja',
          hallCapacity: 600,
          facilities: 'swimming pool, projectors, cctv, vip lounges',
          price: 1200000
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          res.body.message.errors.should.have.property('carParkCapacity');
          res.body.message.errors.carParkCapacity.should.be.an('array');
          res.body.message.errors.carParkCapacity[0].should.eql('The carParkCapacity field is required.');
          done();
        });
    });
    it('Should return HTTP status 400 and message for post without center facilities', (done) => {
      chai.request(app)
        .post('/api/v1/centers/')
        .set('x-access-token', token)
        .send({
          name: 'The centers Place',
          stateId: 1,
          address: '7, xyz avenue, ikaja',
          hallCapacity: 600,
          carParkCapacity: 200,
          price: 1200000
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          res.body.message.errors.should.have.property('facilities');
          res.body.message.errors.facilities.should.be.an('array');
          res.body.message.errors.facilities[0].should.eql('The facilities field is required.');
          done();
        });
    });
    it('Should return HTTP status 400 and message for post without center price', (done) => {
      chai.request(app)
        .post('/api/v1/centers/')
        .set('x-access-token', token)
        .send({
          name: 'The centers Place',
          stateId: 1,
          address: '7, xyz avenue, ikaja',
          hallCapacity: 600,
          carParkCapacity: 200,
          facilities: 'swimming pool, projectors, cctv, vip lounges',
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          res.body.message.errors.should.have.property('price');
          res.body.message.errors.price.should.be.an('array');
          res.body.message.errors.price[0].should.eql('The price field is required.');
          done();
        });
    });

    it('Should return HTTP status 400 and message for post if center name exceeds 30 chatacters' , (done) => {
      chai.request(app)
        .post('/api/v1/centers/')
        .set('x-access-token', token)
        .send({
          name: 'The centers Place where magic happens and you never forget',
          stateId: 1,
          address: '7, xyz avenue, ikaja',
          hallCapacity: 600,
          carParkCapacity: 200,
          facilities: 'swimming pool, projectors, cctv, vip lounges',
          price: 1200000
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          res.body.message.errors.should.have.property('name');
          res.body.message.errors.name.should.be.an('array');
          done();
        });
    });

    it('Should return HTTP 400 if center address is not up to 10 characters', (done) => {
      chai.request(app)
        .post('/api/v1/centers/')
        .set('x-access-token', token)
        .send({
          name: 'The power house',
          stateId: 1,
          address: '7, xyz',
          hallCapacity: '600',
          carParkCapacity: '200',
          facilities: 'swimming pool, projectors, cctv, vip lounges',
          price: '1200000'
        })
        .end((err, res) => {
          centerID = res.body.centerId;
          res.should.have.status(400);
          res.body.should.be.an('object');
          res.body.should.have.property('message')
          res.body.message.errors.should.have.property('address');
          res.body.message.errors.address.should.be.an('array');
          done();
        });
    });

    // =====VALID INPUT====== //

    it('Should return HTTP 401 with response object when user is not an admin', (done) => {
      chai.request(app)
        .post('/api/v1/centers/')
        .set('x-access-token', notAdminToken)
        .send({
          name: 'The power spot',
          stateId: 1,
          address: '7, xyz avenue, ikaja',
          hallCapacity: '600',
          carParkCapacity: '200',
          facilities: 'swimming pool, projectors, cctv, vip lounges',
          price: '1200000'
        })
        .end((err, res) => {
          console.log(res.body);
          res.should.have.status(401);
          res.body.should.be.an('object');
          res.body.should.have.property('message').eql('You do not have admin priviledge');
          done();
        });
    });

    it('Should return HTTP 201 with response object', (done) => {
      chai.request(app)
        .post('/api/v1/centers/')
        .set('x-access-token', token)
        .send({
          name: 'The power spot',
          stateId: 1,
          address: '7, xyz avenue, ikaja',
          hallCapacity: '600',
          carParkCapacity: '200',
          facilities: 'swimming pool, projectors, cctv, vip lounges',
          price: '1200000'
        })
        .end((err, res) => {
          centerID = res.body.centerId;
          res.should.have.status(201);
          res.body.should.be.an('object');
          res.body.should.have.property('message').eql('The power spot Is Created Successfully');
          res.body.should.have.property('centerId');
          res.body.should.have.property('statusCode');
          done();
        });
    });
  });

  describe('GET /api/v1/centers', () => {
    // Testing  to get all centers
    it('Should return 200 with an array of all centers', (done) => {
      chai.request(app)
        .get('/api/v1/centers/')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('array');
          done();
        });
    });
  });

  describe('GET /api/v1/centers/:id', () => {
    // Testing to get all centers
    it('Should return 200 with center object requested for', (done) => {
      chai.request(app)
        .get(`/api/v1/centers/${centerID}/`)
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          done();
        });
    });
  });

  describe('PUT /api/v1/centers/:id', () => {
    it('Should return 200 with modified center', (done) => {
      chai.request(app)
        .put(`/api/v1/centers/${centerID}/`)
        .set('x-access-token', token)
        .send({
          name: 'The power space',
          stateId: 1,
          address: '7, abc avenue, ikeja',
          hallCapacity: '600',
          carParkCapacity: '200',
          facilities: 'swimming pool, projectors, cctv, vip lounges',
          price: '1200000'
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          done();
        });
    });
  });

  describe('DELETE /api/v1/centers/:id', () => {
    // Testing to modify an center
    it('Should return 404 if center does not exist', (done) => {
      chai.request(app)
        .delete(`/api/v1/centers/${-1}/`)
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          done();
        });
    });

    it('Should return 200 with modified center', (done) => {
      chai.request(app)
        .delete(`/api/v1/centers/${centerID}/`)
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          done();
        });
    });
  });
});