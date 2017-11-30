import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';

const should = chai.should();

chai.use(chaiHttp);

describe('Testing Authentication Routes', () => {
  describe('POST /users', () => {
    // Testing for invalid user input
    it('Incorrect Routes should return HTTP 400', (done) => {
      chai.request(app)
        .post('/any/incorrect/route')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.an('object');
          done();
        });
    });
  });
});
