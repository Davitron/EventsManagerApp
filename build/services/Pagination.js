'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class
 *
 * @exports
*/
var Pagination = function () {
  function Pagination() {
    _classCallCheck(this, Pagination);
  }

  _createClass(Pagination, null, [{
    key: 'createPagingData',

    /**
     *
     * @param {object} param0
     *
     * @param {array} param0.rows
     *
     * @param {number} param0.count
     *
     * @param {object} requestMeta
     *
     * @returns {object} meta data for pagination
     */
    value: function createPagingData(_ref, requestMeta) {
      var rows = _ref.rows,
          count = _ref.count;
      var baseUrl = requestMeta.baseUrl,
          qString = requestMeta.qString,
          limit = requestMeta.limit,
          offset = requestMeta.offset,
          page = requestMeta.page;


      var pages = Math.ceil(count / limit);
      var pagingData = {
        limit: limit,
        offset: offset,
        page: page,
        pages: pages,
        count: count,
        currentPageSize: rows.length
      };

      if (page !== 1) {
        var qs = _queryString2.default.parse(qString);
        qs.page = parseInt(qs.page, 10) - 1;
        pagingData.previous = baseUrl + '?' + _queryString2.default.stringify(qs);
      }

      if (pages > page) {
        var _qs = _queryString2.default.parse(qString);
        _qs.page = parseInt(_qs.page, 10) + 1;
        pagingData.next = baseUrl + '?' + _queryString2.default.stringify(_qs);
      }
      return pagingData;
    }
  }]);

  return Pagination;
}();

exports.default = Pagination;
//# sourceMappingURL=Pagination.js.map