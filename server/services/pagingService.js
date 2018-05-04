import queryString from 'query-string';

/**
 * @class
 *
 * @exports
*/
export default class Pagination {
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
  static createPagingData({ rows, count }, requestMeta) {
    const {
      baseUrl,
      qString,
      limit,
      offset,
      page,
    } = requestMeta;

    const pages = Math.ceil(count / limit);
    const pagingData = {
      limit,
      offset,
      page,
      pages,
      count,
      currentPageSize: rows.length
    };


    if (page !== 1) {
      const qs = queryString.parse(qString);
      qs.page = parseInt(qs.page, 10) - 1;
      pagingData.previous = `${baseUrl}?${queryString.stringify(qs)}`;
    }

    if (pages > page) {
      const qs = queryString.parse(qString);
      qs.page = parseInt(qs.page, 10) + 1;
      pagingData.next = `${baseUrl}?${queryString.stringify(qs)}`;
    }
    return pagingData;
  }
}
