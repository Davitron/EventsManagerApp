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
});
