import Pagination from '../services/Pagination';

const mockRequestMeta = {
  baseUrl: 'test/api/route/for/test',
  qString: 'search=test&state=1&page=1',
  limit: 1,
  offset: 0,
};

describe('Test suite pagination service', () => {
  describe('generate pagination for data', () => {
    it('should return pagination with next page', (done) => {
      const reqMeta = { ...mockRequestMeta, page: 1 };
      const data = {
        count: 50,
        rows: [
          { id: 1, username: 'walex', email: 'walex@yahoo.com' }
        ]
      };
      const result = Pagination.createPagingData(data, reqMeta);
      result.should.be.an('object');
      result.limit.should.equal(reqMeta.limit);
      result.offset.should.equal(reqMeta.offset);
      result.page.should.equal(reqMeta.page);
      result.should.have.property('next');
      result.next.should.equal(`${reqMeta.baseUrl}?page=2&search=test&state=1`);
      done();
    });
    it('should return pagination with previous page', (done) => {
      const reqMeta = { ...mockRequestMeta, qString: 'search=test&state=1&page=3', page: 3 };
      const data = {
        count: 50,
        rows: [
          { id: 1, username: 'walex', email: 'walex@yahoo.com' }
        ]
      };
      const result = Pagination.createPagingData(data, reqMeta);
      result.should.be.an('object');
      result.limit.should.equal(reqMeta.limit);
      result.offset.should.equal(reqMeta.offset);
      result.page.should.equal(reqMeta.page);
      result.should.have.property('next');
      result.should.have.property('previous');
      result.next.should.equal(`${reqMeta.baseUrl}?page=4&search=test&state=1`);
      result.previous.should.equal(`${reqMeta.baseUrl}?page=2&search=test&state=1`);
      done();
    });
  });
});
