import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import model from '../models';

const Events = model.Event;

const should = chai.should();

chai.use(chaiHttp);


let token;
let eventID;

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
    describe('POST /api/v1/events', () => {
      // Testing for creating an event
      // ======INVALID REQUEST ===== //
      it('Should return 400 and message for post without centerId', (done) => {
        chai.request(app)
          .post('/api/v1/events/')
          .set('x-access-token', token)
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
            res.body.message.errors.should.have.property('centerId');
            res.body.message.errors.centerId.should.be.an('array');
            res.body.message.errors.centerId[0].should.eql('The centerId field is required.');
            done();
          });
      });

      it('Should return 400 and message for post without eventName', (done) => {
        chai.request(app)
          .post('/api/v1/events')
          .set('x-access-token', token)
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
            res.body.message.errors.should.have.property('eventName');
            res.body.message.errors.eventName.should.be.an('array');
            res.body.message.errors.eventName[0].should.eql('The eventName field is required.');
            done();
          });
      });

      it('Should return 400 if days is not specified', (done) => {
        chai.request(app)
          .post('/api/v1/events')
          .set('x-access-token', token)
          .send({
            centerId: '24',
            eventName: 'The Wedding Party',
            startDate: '21-09-2017',
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.an('object');
            res.body.should.have.property('message');
            res.body.should.have.property('message');
            res.body.message.errors.should.have.property('days');
            res.body.message.errors.days.should.be.an('array');
            res.body.message.errors.days[0].should.eql('The days field is required.');
            done();
          });
      });

      it('Should return 400 and message for post without startDate', (done) => {
        chai.request(app)
          .post('/api/v1/events')
          .set('x-access-token', token)
          .send({
            eventName: 'The Wedding Party',
            days: 4,
            userId: 5,
            centerId: 4
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.an('object');
            res.body.should.have.property('message');
            res.body.message.errors.should.have.property('startDate');
            res.body.message.errors.startDate.should.be.an('array');
            res.body.message.errors.startDate[0].should.eql('The startDate field is required.');
            done();
          });
      });

      it('Should return 400 if centerId is not a number', (done) => {
        chai.request(app)
          .post('/api/v1/events')
          .set('x-access-token', token)
          .send({
            centerId: 'bdhwvdhi',
            eventName: 'The Wedding Party',
            startDate: '2020-12-22',
            days: '6',
          })
          .end((err, res) => {
            // console.log(res.body.message);
            res.should.have.status(500);
            res.body.should.be.an('object');
            res.body.should.have.property('message').eql('Server Error');
            done();
          });
      });
      it('Should return 400 if days is not a string', (done) => {
        chai.request(app)
          .post('/api/v1/events')
          .set('x-access-token', token)
          .send({
            centerId: '24',
            eventName: 'The Wedding Party',
            startDate: '21-09-2017',
            days: 4,
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.an('object');
            res.body.should.have.property('message');
            res.body.should.have.property('message');
            res.body.message.errors.should.have.property('days');
            res.body.message.errors.days.should.be.an('array');
            res.body.message.errors.days[0].should.eql('The days must be a string.');
            done();
          });
      });

      it('Should return 201 and event created for post if all request object properties exist', (done) => {
        chai.request(app)
          .post('/api/v1/events')
          .set('x-access-token', token)
          .send({
            centerId: '4',
            eventName: 'The Wedding',
            startDate: '1909-11-12',
            days: '4',
          })
          .end((err, res) => {
            eventID = res.body.eventId;
            console.log(eventID);
            res.should.have.status(400);
            res.body.should.be.an('object');
            res.body.should.have.property('message').eql('Date must be in the future');
            res.body.should.have.property('statusCode').eql(400);
            done();
          });
      });
         
      // ======VALID REQUEST ===== //
      it('Should return 201 and event created for post if all request object properties exist', (done) => {
        chai.request(app)
          .post('/api/v1/events')
          .set('x-access-token', token)
          .send({
            centerId: '4',
            eventName: 'The Wedding',
            startDate: '2040-11-12',
            days: '4',
          })
          .end((err, res) => {
            eventID = res.body.eventId;
            console.log(eventID);
            res.should.have.status(201);
            res.body.should.be.an('object');
            res.body.should.have.property('message');
            res.body.should.have.property('statusCode');
            done();
          });
      });

      it('Should return 400 if event date is already booked', (done) => {
        chai.request(app)
          .post('/api/v1/events')
          .set('x-access-token', token)
          .send({
            centerId: '4',
            eventName: 'The Wedding',
            startDate: '2040-12-12',
            days: '4',
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.an('object');
            res.body.should.have.property('message').eql('The selected date is booked');
            done();
          });
      });
    });
  });

  describe('GET /api/v1/events', () => {
    // Testing  to get all events
    it('Should return 200 with an array of all events', (done) => {
      chai.request(app)
        .get('/api/v1/events')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('allEvents');
          res.body.should.have.property('statusCode').eql(200);
          res.body.allEvents.should.be.an('array');
          done();
        });
    });
  });

  describe('GET /api/v1/events/:eventId', () => {
    // Testing to get all events
    it('Should return 200 with event object requested for', (done) => {
      chai.request(app)
        .get(`/api/v1/events/${eventID}`)
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('id');
          res.body.should.have.property('eventName');
          res.body.should.have.property('startDate');
          res.body.should.have.property('endDate');
          done();
        });
    });
  });
});


describe('PUT /api/v1/events/:id', () => {
  // Testing to modify an event
  it('Should return 404 if event does not exist', (done) => {
    chai.request(app)
      .put(`/api/v1/events/${-1}`)
      .set('x-access-token', token)
      .send({
        centerId: '3',
        eventName: 'My Wedding',
        startDate: '2040-12-12',
        days: '4'
      })
      .end((err, res) => {
        console.log(res.body);
        res.should.have.status(404);
        res.body.should.be.an('object');
        res.body.should.have.property('message').eql('Event not found');
        done();
      });
  });

  it('Should return 200 with modified event', (done) => {
    chai.request(app)
      .put(`/api/v1/events/${eventID}`)
      .set('x-access-token', token)
      .send({
        centerId: '4',
        eventName: 'My Wedding',
        startDate: '2040-12-12',
        days: '4'
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        done();
      });
  });
  // after((done) => {
  //   Events.destroy({
  //     where: {
  //       eventName: 'The Wedding'
  //     }
  //   });
  //   done();
  // });
});

describe('DELETE /api/v1/events/:id', () => {
// Testing to modify an event
  it('Should return 404 if event does not exist', (done) => {
    chai.request(app)
      .delete(`/api/v1/events/${-1}`)
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.an('object');
        res.body.should.have.property('message').eql('Event does not exist');
        done();
      });
  });

  it('Should return 200 with success message', (done) => {
    chai.request(app)
      .delete(`/api/v1/events/${eventID}`)
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.should.have.property('message').eql('Event is successfully  deleted');
        done();
      });
  });
});
