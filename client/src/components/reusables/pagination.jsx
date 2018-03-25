import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as _ from 'lodash';

const propTypes = {
  items: PropTypes.arrayOf(() => null).isRequired,
  onChangePage: PropTypes.func.isRequired,
  itemsPerPage: PropTypes.number,
  initialPage: PropTypes.number
};

const defaultProps = {
  itemsPerPage: 7,
  initialPage: 1
};

/**
 *
 * @extends Component
 * 
 */
class Pagination extends Component {
  /**
   * @constructor
   * @param {*} props
   * Initialize state
   */
  constructor(props) {
    super(props);
    this.state = { pager: {} };
  }

  /**
   *@returns {*} l
  */
  componentWillMount() {
    // set page if items array isn't empty
    if (this.props.items && this.props.items.length) {
      this.setPage(this.props.initialPage);
    }
  }

  /**
   *@returns {boolean} make component re-render on update
   */
  shouldComponentUpdate() {
    return true;
  }

  /**
 *
 * @param {*} prevProps
 * @param {*} prevState
 * @return {*} -
 */
  componentDidUpdate(prevProps, prevState) {
    // reset page if items array has changed
    if (this.props.items !== prevProps.items) {
      this.setPage(this.props.initialPage);
    }
  }


  /**
   *
   * @param {number} page
   * @returns{*} -
   */
  setPage(page) {
    const { items } = this.props;
    let { pager } = this.state;
    if (page < 1 || page > pager.totalPages) return null;
    pager = this.getPager(items.length, page);
    // get new page of data
    const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
    this.setState({ pager });
    this.props.onChangePage(pageOfItems);
  }

  /**
   *
   * @param {number} totalItems
   * @param {number} currentPage
   * @param {number} pageSize
   * @returns {object} -
   */
  getPager(totalItems, currentPage) {
    const { itemsPerPage } = this.props;

    currentPage = currentPage || 1;
    const pageSize = itemsPerPage;

    // get total number of pages
    const totalPages = Math.ceil(totalItems / pageSize);

    let startPage;
    let endPage;

    if (totalPages <= 10) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      }
      if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      }
      startPage = currentPage - 5;
      endPage = currentPage + 4;
    }

    // calculate calculate start point to end point
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // to generate page numbers
    const pages = _.range(startPage, endPage + 1);

    return {
      totalItems,
      currentPage,
      pageSize,
      totalPages,
      startPage,
      endPage,
      startIndex,
      endIndex,
      pages
    };
  }

  /**
   *@returns {*} renders the component
   */
  render() {
    const { pager } = this.state;
    if (!pager.pages || pager.pages.length <= 1) {
      // don't display pager if there is only 1 page
      return null;
    }

    return (
      <ul className="pagination">
        <li className={pager.currentPage === 1 ? 'disabled' : ''}>
          <a role="button" tabIndex="0" className="chip" onClick={() => this.setPage(1)} >First</a>
        </li>
        <li className={pager.currentPage === 1 ? 'disabled' : ''}>
          <a role="button" tabIndex="0" onClick={() => this.setPage(pager.currentPage - 1)}><i className="material-icons">chevron_left</i></a>
        </li>
        {pager.pages.map((page, index) => (
          <li key={page} className={pager.currentPage === page ? 'active' : ''}>
            <a role="button" tabIndex="0" onClick={() => this.setPage(page)}>{page}</a>
          </li>))}
        <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
          <a role="button" tabIndex="0" onClick={() => this.setPage(pager.currentPage + 1)}><i className="material-icons">chevron_right</i></a>
        </li>
        <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
          <a role="button" tabIndex="0" className="chip" onClick={() => this.setPage(pager.totalPages)}>Last</a>
        </li>
      </ul>
    );
  }
}

Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;
export default Pagination;

