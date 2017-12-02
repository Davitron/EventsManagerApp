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

  describe('GET /', () => {
    // Testing for incorrect routes
    it('Incorrect Routes should return HTTP 200', (done) => {
      chai.request(app)
        .post('/api')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  describe('Testing Api endpoints for event', () => {
    describe('POST /api/v1/events', () => {
      // Testing for creating an event
      // ======INVALID REQUEST ===== //
      it('Should return 400 and message for post without centerId', (done) => {
        chai.request(app)
          .post('/api/v1/events/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlzQWRtaW4iOnRydWUsImlhdCI6MTUxMjE1NjQ5NCwiZXhwIjoxNTEyMjQyODk0fQ.kKXHEPY3Mxs_uO0gErAKGluM46lEN1Z_EFcWWyUVO8s')
          .send({
            eventName: 'The Wedding Party',
            startDate: '21-09-1991',
            days: 4,
            userId: 5,
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
          .post('/api/v1/events?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlzQWRtaW4iOnRydWUsImlhdCI6MTUxMjE1NjQ5NCwiZXhwIjoxNTEyMjQyODk0fQ.kKXHEPY3Mxs_uO0gErAKGluM46lEN1Z_EFcWWyUVO8s')
          .send({
            eventName: 'The Wedding Party',
            days: 4,
            userId: 5,
            centerId: 4
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.an('object');
            done();
          });
      });

      it('Should return 400 and message for post without eventDate', (done) => {
        chai.request(app)
          .post('/api/v1/events?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlzQWRtaW4iOnRydWUsImlhdCI6MTUxMjE1NjQ5NCwiZXhwIjoxNTEyMjQyODk0fQ.kKXHEPY3Mxs_uO0gErAKGluM46lEN1Z_EFcWWyUVO8s')
          .send({
            startDate: '21-09-1991',
            days: 4,
            userId: 5,
            centerId: 4
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.an('object');
            res.body.should.have.property('message');
            done();
          });
      });

      it('Should return 400 and message for post without userId', (done) => {
        chai.request(app)
          .post('/api/v1/events?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlzQWRtaW4iOnRydWUsImlhdCI6MTUxMjE1NjQ5NCwiZXhwIjoxNTEyMjQyODk0fQ.kKXHEPY3Mxs_uO0gErAKGluM46lEN1Z_EFcWWyUVO8s')
          .send({
            centerId: 3,
            eventName: 'The Wedding Party',
            startDate: '21-09-1991',
            days: 4
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.an('object');
            res.body.should.have.property('message');
            done();
          });
      });
      it('Should return 400 if centerId is not a number', (done) => {
        chai.request(app)
          .post('/api/v1/events?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlzQWRtaW4iOnRydWUsImlhdCI6MTUxMjE1NjQ5NCwiZXhwIjoxNTEyMjQyODk0fQ.kKXHEPY3Mxs_uO0gErAKGluM46lEN1Z_EFcWWyUVO8s')
          .send({
            centerId: '3',
            eventName: 'The Wedding Party',
            startDate: '21-09-iejrie',
            days: 6
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.an('object');
            res.body.should.have.property('message');
            done();
          });
      });
      it('Should return 400 if userId is not a number', (done) => {
        chai.request(app)
          .post('/api/v1/events?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlzQWRtaW4iOnRydWUsImlhdCI6MTUxMjE1NjQ5NCwiZXhwIjoxNTEyMjQyODk0fQ.kKXHEPY3Mxs_uO0gErAKGluM46lEN1Z_EFcWWyUVO8s')
          .send({
            centerId: 'kdfgkd',
            eventName: 'The Wedding Party',
            startDate: '21-09-2017',
            days: 4,
            userId: '6'
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.an('object');
            res.body.should.have.property('message');
            done();
          });
      });

      // ======VALID REQUEST ===== //
      it('Should return 201 and event created for post if all request object properties exist', (done) => {
        chai.request(app)
          .post('/api/v1/events?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlzQWRtaW4iOnRydWUsImlhdCI6MTUxMjE1NjQ5NCwiZXhwIjoxNTEyMjQyODk0fQ.kKXHEPY3Mxs_uO0gErAKGluM46lEN1Z_EFcWWyUVO8s')
          .send({
            centerId: '4',
            eventName: 'The Wedding plce',
            startDate: '2021-12-12',
            days: '4',
            status: 'pending'
          })
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.an('object');
            res.body.should.have.property('message');
            res.body.should.have.property('newEvent');
  
            done();
          });
      });
    });
  });
});



    // describe('GET /api/v1/events', () => {
    //   // Testing  to get all events
    //   it('Should return 200 with an array of all events', (done) => {
    //     chai.request(app)
    //       .get('/api/v1/events')
    //       .end((err, res) => {
    //         res.should.have.status(200);
    //         res.body.should.be.an('array');
    //         done();
    //       });
    //   });
    // });

    // describe('GET /api/v1/events/:id', () => {
    //   // Testing to get all events
    //   it('Should return 200 with event object requested for', (done) => {
    //     chai.request(app)
    //       .get(`/api/v1/events/${1}`)
    //       .send({
    //         id: 1
    //       })
    //       .end((err, res) => {
    //         res.should.have.status(200);
    //         res.body.should.be.an('object');
    //         done();
    //       });
    //   });
    // });

    // describe('PUT /api/v1/events/:id', () => {
    //   // Testing to modify an event
    //   it('Should return 404 if event does not exist', (done) => {
    //     chai.request(app)
    //       .put('/api/v1/events/:id')
    //       .end((err, res) => {
    //         res.should.have.status(404);
    //         res.body.should.be.an('object');
    //         res.body.should.have.property('message');
    //         done();
    //       });
    //   });

    //   it('Should return 200 with modified event', (done) => {
    //     chai.request(app)
    //       .put(`/api/v1/events/${1}`)
    //       .send({
    //         centerId: 3,
    //         eventName: 'The Wedding',
    //         eventDate: '21-09-1991',
    //         creatorId: 5
    //       })
    //       .end((err, res) => {
    //         res.should.have.status(200);
    //         res.body.should.be.an('object');
    //         done();
    //       });
    //   });
    // });

    // describe('DELETE /api/v1/events/:id', () => {
    // // Testing to modify an event
    //   it('Should return 404 if event does not exist', (done) => {
    //     chai.request(app)
    //       .delete(`/api/v1/events/${8}`)
    //       .end((err, res) => {
    //         res.should.have.status(404);
    //         res.body.should.be.an('object');
    //         res.body.should.have.property('message');
    //         done();
    //       });
    //   });

    //   it('Should return 200 with success message', (done) => {
    //     chai.request(app)
    //       .delete(`/api/v1/events/${1}`)
    //       .end((err, res) => {
    //         res.should.have.status(200);
    //         res.body.should.be.an('object');
    //         res.body.should.have.property('message');
    //         done();
    //       });
    //   });
    // });