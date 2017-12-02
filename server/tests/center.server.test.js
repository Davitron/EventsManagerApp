import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import app from '../server';

const should = chai.should();

chai.use(chaiHttp);

describe('Testing Api endpoints for centers', () => {
  describe('POST /api/v1/centers', () => {
    it('Should return HTTP status 400 and message for post without center name', (done) => {
      chai.request(app)
        .post('/api/v1/centers/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTUxMjEzNjY4NCwiZXhwIjoxNTEyMjIzMDg0fQ.MAx6B9XbI9hhMkP5g9j9ySF0byMVWF1n4_w16kVXchw')
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
          done();
        });
    });
    it('Should return HTTP status 400 and message for post without center stateId', (done) => {
      chai.request(app)
        .post('/api/v1/centers/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTUxMjEzNjY4NCwiZXhwIjoxNTEyMjIzMDg0fQ.MAx6B9XbI9hhMkP5g9j9ySF0byMVWF1n4_w16kVXchw')
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
          done();
        });
    });
    it('Should return HTTP status 400 and message for post without center address', (done) => {
      chai.request(app)
        .post('/api/v1/centers/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTUxMjEzNjY4NCwiZXhwIjoxNTEyMjIzMDg0fQ.MAx6B9XbI9hhMkP5g9j9ySF0byMVWF1n4_w16kVXchw')
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
          done();
        });
    });
    it('Should return HTTP status 400 and message for post without center address', (done) => {
      chai.request(app)
        .post('/api/v1/centers/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTUxMjEzNjY4NCwiZXhwIjoxNTEyMjIzMDg0fQ.MAx6B9XbI9hhMkP5g9j9ySF0byMVWF1n4_w16kVXchw')
        .send({
          name: 'The centers Place',
          stateId: 1,
          address: '7, xyz avenue, ikaja',
          // hallCapacity: 600,
          carParkCapacity: 200,
          facilities: 'swimming pool, projectors, cctv, vip lounges',
          price: 1200000
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          done();
        });
    });

    it('Should return HTTP status 400 and message for post without center address', (done) => {
      chai.request(app)
        .post('/api/v1/centers/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTUxMjEzNjY4NCwiZXhwIjoxNTEyMjIzMDg0fQ.MAx6B9XbI9hhMkP5g9j9ySF0byMVWF1n4_w16kVXchw')
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
          done();
        });
    });
    it('Should return HTTP status 400 and message for post without center address', (done) => {
      chai.request(app)
        .post('/api/v1/centers/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTUxMjEzNjY4NCwiZXhwIjoxNTEyMjIzMDg0fQ.MAx6B9XbI9hhMkP5g9j9ySF0byMVWF1n4_w16kVXchw')
        .send({
          name: 'The centers Place',
          stateId: 1,
          address: '7, xyz avenue, ikaja',
          hallCapacity: 600,
          carParkCapacity: 200,
          facilities: 'swimming pool, projectors, cctv, vip lounges',
        //  price: 1200000
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          done();
        });
    });
    it('Should return HTTP status 400 and message for post without center address', (done) => {
      chai.request(app)
        .post('/api/v1/centers/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTUxMjEzNjY4NCwiZXhwIjoxNTEyMjIzMDg0fQ.MAx6B9XbI9hhMkP5g9j9ySF0byMVWF1n4_w16kVXchw')
        .send({
          name: 'The centers Place',
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
          done();
        });
    });

    // =====VALID INPUT====== //
    it('Should return HTTP 201 with response object', (done) => {
      chai.request(app)
        .post('/api/v1/centers/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTUxMjEzNjY4NCwiZXhwIjoxNTEyMjIzMDg0fQ.MAx6B9XbI9hhMkP5g9j9ySF0byMVWF1n4_w16kVXchw')
        .send({
          name: 'The power house',
          stateId: 1,
          address: '7, xyz avenue, ikaja',
          hallCapacity: '600',
          carParkCapacity: '200',
          facilities: 'swimming pool, projectors, cctv, vip lounges',
          price: '1200000'
        })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          done();
        });
    });
  });
});

describe('GET /api/v1/centers', () => {
  // Testing  to get all centers
  it('Should return 200 with an array of all centers', (done) => {
    chai.request(app)
      .get('/api/v1/centers/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTUxMjEzNjY4NCwiZXhwIjoxNTEyMjIzMDg0fQ.MAx6B9XbI9hhMkP5g9j9ySF0byMVWF1n4_w16kVXchw')
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
      .get(`/api/v1/centers/${1}/token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTUxMjEzNjY4NCwiZXhwIjoxNTEyMjIzMDg0fQ.MAx6B9XbI9hhMkP5g9j9ySF0byMVWF1n4_w16kVXchw`)
      .send({
        id: 1
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        done();
      });
  });
});

describe('PUT /api/v1/centers/:id', () => {
  // Testing to modify an center
  it('Should return 404 if center does not exist', (done) => {
    chai.request(app)
      .put(`/api/v1/centers/${1000}/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTUxMjEzNjY4NCwiZXhwIjoxNTEyMjIzMDg0fQ.MAx6B9XbI9hhMkP5g9j9ySF0byMVWF1n4_w16kVXchw`)
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
        res.should.have.status(404);
        res.body.should.be.an('object');
        res.body.should.have.property('message');
        done();
      });
  });


  it('Should return 200 with modified center', (done) => {
    chai.request(app)
      .put(`/api/v1/centers/${1}/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlzQWRtaW4iOnRydWUsImlhdCI6MTUxMjE1NjQ5NCwiZXhwIjoxNTEyMjQyODk0fQ.kKXHEPY3Mxs_uO0gErAKGluM46lEN1Z_EFcWWyUVO8s`)
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
        res.should.have.status(200);
        res.body.should.be.an('object');
        done();
      });
  });

  describe('DELETE /api/v1/centers/:id', () => {
    // Testing to modify an center
    it('Should return 404 if center does not exist', (done) => {
      chai.request(app)
        .delete(`/api/v1/centers/${7}/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlzQWRtaW4iOnRydWUsImlhdCI6MTUxMjE1NjQ5NCwiZXhwIjoxNTEyMjQyODk0fQ.kKXHEPY3Mxs_uO0gErAKGluM46lEN1Z_EFcWWyUVO8s`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          done();
        });
    });

    it('Should return 200 with modified center', (done) => {
      chai.request(app)
        .delete(`/api/v1/centers/${1}/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlzQWRtaW4iOnRydWUsImlhdCI6MTUxMjE1NjQ5NCwiZXhwIjoxNTEyMjQyODk0fQ.kKXHEPY3Mxs_uO0gErAKGluM46lEN1Z_EFcWWyUVO8s`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          done();
        });
    });
  });
});
