'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _Pagination = require('../services/Pagination');

var _Pagination2 = _interopRequireDefault(_Pagination);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mockRequestMeta = {
  baseUrl: 'test/api/route/for/test',
  qString: 'search=test&state=1&page=1',
  limit: 1,
  offset: 0
};

describe('Test suite pagination service', function () {
  describe('generate pagination for data', function () {
    it('should return pagination with next page', function (done) {
      var reqMeta = _extends({}, mockRequestMeta, { page: 1 });
      var data = {
        count: 50,
        rows: [{ id: 1, username: 'walex', email: 'walex@yahoo.com' }]
      };
      var result = _Pagination2.default.createPagingData(data, reqMeta);
      result.should.be.an('object');
      result.limit.should.equal(reqMeta.limit);
      result.offset.should.equal(reqMeta.offset);
      result.page.should.equal(reqMeta.page);
      result.should.have.property('next');
      result.next.should.equal(reqMeta.baseUrl + '?page=2&search=test&state=1');
      done();
    });
    it('should return pagination with previous page', function (done) {
      var reqMeta = _extends({}, mockRequestMeta, { qString: 'search=test&state=1&page=3', page: 3 });
      var data = {
        count: 50,
        rows: [{ id: 1, username: 'walex', email: 'walex@yahoo.com' }]
      };
      var result = _Pagination2.default.createPagingData(data, reqMeta);
      result.should.be.an('object');
      result.limit.should.equal(reqMeta.limit);
      result.offset.should.equal(reqMeta.offset);
      result.page.should.equal(reqMeta.page);
      result.should.have.property('next');
      result.should.have.property('previous');
      result.next.should.equal(reqMeta.baseUrl + '?page=4&search=test&state=1');
      result.previous.should.equal(reqMeta.baseUrl + '?page=2&search=test&state=1');
      done();
    });
  });
});
//# sourceMappingURL=pagination.test.js.map