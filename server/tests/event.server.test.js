import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';

const should = chai.should();

chai.use(chaiHttp);

describe('Test API', () => {
  describe('GET /', () => {
    // Testing for incorrect routes
    it('Incorrect Routes should return HTTP 404', (done) => {
      chai.request(app)
        .post('/any/incorrect/route')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.an('object');
          done();
        });
    });
  });

  describe('Testing Api endpoints for event', () => {
    describe('POST /events', () => {
      // Testing for creating an event
      // ======INVALID REQUEST ===== //
      it('Should return 400 and message for post without centerId', (done) => {
        chai.request(app)
          .post('/events')
          .send({
            eventName: 'The Wedding Party',
            eventDate: '21-09-1991',
            creatorId: 5
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.an('object');
            res.body.should.have.property('message');
            done();
          });
      });
      it('Should return 400 and message for post without eventName', (done) => {
        chai.request(app)
          .post('/events')
          .send({
            centerId: 3,
            eventDate: '21-09-1991',
            creatorId: 5
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.an('object');
            res.body.should.have.property('message');
            done();
          });
      });
      it('Should return 400 and message for post without eventDate', (done) => {
        chai.request(app)
          .post('/events')
          .send({
            centerId: 3,
            eventName: 'The Wedding Party',
            creatorId: 5
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.an('object');
            res.body.should.have.property('message');
            done();
          });
      });
      it('Should return 400 and message for post without creatorId', (done) => {
        chai.request(app)
          .post('/events')
          .send({
            centerId: 3,
            eventName: 'The Wedding Party',
            eventDate: '21-09-1991',
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.an('object');
            res.body.should.have.property('message');
            done();
          });
      });
      // ======INVALID REQUEST ===== //
      it('Should return 201 and event created for post if all request object properties exist', (done) => {
        chai.request(app)
          .post('/events')
          .send({
            centerId: 3,
            eventName: 'The Wedding Party',
            eventDate: '21-09-1991',
            creatorId: 5
          })
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.an('object');
            res.body.should.have.property('id');
            res.body.should.have.property('centerId');
            res.body.should.have.property('eventName');
            res.body.should.have.property('eventDate');
            res.body.should.have.property('creatorId');
            done();
          });
      });
    });


    describe('GET /events', () => {
      // Testing  to get all events
      it('Should return 200 with an array of all events', (done) => {
        chai.request(app)
          .get('/events')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an('array');
            done();
          });
      });
    });

    describe('GET /events/:id', () => {
      // Testing to get all events
      it('Should return 200 with event object requested for', (done) => {
        chai.request(app)
          .get(`/events/${1}`)
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

    describe('PUT /events/:id', () => {
      // Testing to modify an event
      it('Should return 404 if event does not exist', (done) => {
        chai.request(app)
          .put('/events/:id')
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.an('object');
            res.body.should.have.property('message');
            done();
          });
      });

      it('Should return 200 with modified event', (done) => {
        chai.request(app)
          .put(`/events/${1}`)
          .send({
            centerId: 3,
            eventName: 'The Wedding',
            eventDate: '21-09-1991',
            creatorId: 5
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an('object');
            done();
          });
      });
    });

    describe('DELETE /events/:id', () => {
      // Testing to modify an event
      it('Should return 404 if event does not exist', (done) => {
        chai.request(app)
          .put(`/events/${7}`)
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.an('object');
            res.body.should.have.property('message');
            done();
          });
      });

      it('Should return 200 with modified event', (done) => {
        chai.request(app)
          .delete(`/events/${1}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an('object');
            res.body.should.have.property('message');
            done();
          });
      });
    });
  });
});