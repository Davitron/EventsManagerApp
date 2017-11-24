import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';

const should = chai.should();

chai.use(chaiHttp);

describe('Testing Api endpoints for centers', () => {
  describe('POST /centers', () => {
    it('Should return HTTP status 400 and message for post without center name', (done) => {
      chai.request(app)
        .post('/centers')
        .send({
          state: 'Logos',
          address: '7, xyz avenue, ikaja',
          hasProjectors: true,
          hallCapacity: 600,
          carParkCapacity: 200
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          done();
        });
    });
    it('Should return HTTP status 400 and message for post without center state', (done) => {
      chai.request(app)
        .post('/centers')
        .send({
          name: 'The centers Place',
          address: '7, xyz avenue, ikaja',
          hasProjectors: true,
          hallCapacity: 600,
          carParkCapacity: 200
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
        .post('/centers')
        .send({
          name: 'The centers Place',
          state: 'Logos',
          hasProjectors: true,
          hallCapacity: 600,
          carParkCapacity: 200
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          done();
        });
    });
    it('Should return HTTP status 400 and message for post without hasProjector', (done) => {
      chai.request(app)
        .post('/centers')
        .send({
          name: 'The centers Place',
          state: 'Logos',
          address: '7, xyz avenue, ikaja',
          hallCapacity: 600,
          carParkCapacity: 200
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          done();
        });
    });
    it('Should return HTTP status 400 and message for post without hallCapacity', (done) => {
      chai.request(app)
        .post('/centers')
        .send({
          name: 'The centers Place',
          state: 'Logos',
          address: '7, xyz avenue, ikaja',
          hasProjectors: true,
          carParkCapacity: 200
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          done();
        });
    });
    it('Should return HTTP status 400 and message for post without carParkCapacity', (done) => {
      chai.request(app)
        .post('/centers')
        .send({
          name: 'The centers Place',
          state: 'Logos',
          address: '7, xyz avenue, ikaja',
          hasProjectors: true,
          hallCapacity: 600,
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          done();
        });
    });
    it('Should return HTTP status 500 hallCapacity is not a number', (done) => {
      chai.request(app)
        .post('/centers')
        .send({
          name: 'The centers Place',
          state: 'Logos',
          address: '7, xyz avenue, ikaja',
          hasProjectors: true,
          hallCapacity: 'ghjfj',
          carParkCapacity: 450
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          done();
        });
    });
    it('Should return HTTP status 500 carParkCapacity is not a number', (done) => {
      chai.request(app)
        .post('/centers')
        .send({
          name: 'The centers Place',
          state: 'Logos',
          address: '7, xyz avenue, ikaja',
          hasProjectors: true,
          hallCapacity: 450,
          carParkCapacity: '45kf0'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          done();
        });
    });
    it('Should return HTTP status 500 hasProjector is not a boolean', (done) => {
      chai.request(app)
        .post('/centers')
        .send({
          name: 'The centers Place',
          state: 'Logos',
          address: '7, xyz avenue, ikaja',
          hasProjectors: 'male',
          hallCapacity: 600,
          carParkCapacity: 450,
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          done();
        });
    });

    // =====VALID INPUT====== //
    it('Should return HTTP 201 with response object', (done) => {
      chai.request(app)
        .post('/centers')
        .send({
          name: 'The centers Place',
          state: 'Logos',
          address: '7, xyz avenue, ikaja',
          hasProjectors: 'true',
          hallCapacity: 600,
          carPackCapacity: 900
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.an('object');
          res.body.should.have.property('id');
          res.body.should.have.property('name');
          res.body.should.have.property('state');
          res.body.should.have.property('address');
          res.body.should.have.property('hasProjectors');
          res.body.should.have.property('hallCapacity');
          res.body.should.have.property('carParkCapacity');
          done();
        });
    });
  });
});

describe('GET /centers', () => {
  // Testing  to get all centers
  it('Should return 200 with an array of all centers', (done) => {
    chai.request(app)
      .get('/centers')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('array');
        done();
      });
  });
});

describe('GET /centers/:id', () => {
  // Testing to get all centers
  it('Should return 200 with center object requested for', (done) => {
    chai.request(app)
      .get(`/centers/${1}`)
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

describe('PUT /centers/:id', () => {
  // Testing to modify an center
  it('Should return 404 if center does not exist', (done) => {
    chai.request(app)
      .put(`/centers/${16}`)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.an('object');
        res.body.should.have.property('message');
        done();
      });
  });

  it('Should return 200 with modified center', (done) => {
    chai.request(app)
      .put(`/centers/${1}`)
      .send({
        name: 'The centers',
        state: 'Logos',
        address: '7, xyz avenue, ikaja',
        hasProjectors: false,
        hallCapacity: 600,
        carParkCapacity: 90055
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        done();
      });
  });

  describe('DELETE /centers/:id', () => {
    // Testing to modify an center
    it('Should return 404 if center does not exist', (done) => {
      chai.request(app)
        .put(`/centers/${7}`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          done();
        });
    });

    it('Should return 200 with modified center', (done) => {
      chai.request(app)
        .delete(`/centers/${2}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          done();
        });
    });
  });
});

