import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as _ from 'lodash';


const propTypes = {
  items: PropTypes.arrayOf(() => null),
  onChangePage: PropTypes.func.isRequired,
  initialPage: PropTypes.number,
  itemsPerPage: PropTypes.number
};

const defaultProps = {
  initialPage: 1,
  items: [],
  itemsPerPage: 7
};

/**
 *
 */
class Pagination extends React.Component {
  /**
   *
   * @param {*} props
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
   * @param {*} newProps
   * @param {*} nextState
   *@returns {*} handle prop changes
   */
  componentWillUpdate(newProps, nextState) {
    if (this.props.itemsPerPage !== newProps.itemsPerPage) {
      this.setPage(this.props.initialPage);
    }
  }

  /**
   *
   * @param {*} prevProps
   * @param {*} prevState
   * @returns {*} l
   */
  componentDidUpdate(prevProps, prevState) {
    // reset page if items array has changed
    if (this.props.items !== prevProps.items) {
      this.setPage(this.props.initialPage);
    }
  }


  /**
 *
 * @param {*} page
 * @returns {*} l
 */
  setPage(page) {
    const { items } = this.props;
    let { pager } = this.state;
    if (items === null) return;
    if (page < 1 || page > pager.totalPages) {
      return;
    }
    // get new pager object for specified page
    pager = this.getPager(items.length, page);
    // get new page of items from items array
    const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
    // update state
    this.setState({ pager });
    // call change page function in parent component
    this.props.onChangePage(pageOfItems);
  }

  /**
   *
   * @param {*} totalItems
   * @param {*} currentPage
   * @param {*} pageSize
   * @returns {*} configures paginator
   */
  getPager(totalItems, currentPage, pageSize) {
    const { itemsPerPage } = this.props;
    // default to first page
    currentPage = currentPage || 1;

    // default page size is 10
    pageSize = itemsPerPage;

    // calculate total pages
    const totalPages = Math.ceil(totalItems / pageSize);

    let startPage;
    let endPage;
    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
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

    // calculate start and end item indexes
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    const pages = _.range(startPage, endPage + 1);
    // return object with all pager properties required by the view
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
          <a className="chip" onClick={() => this.setPage(1)} >First</a>
        </li>
        <li className={pager.currentPage === 1 ? 'disabled' : ''}>
          <a onClick={() => this.setPage(pager.currentPage - 1)}><i className="material-icons">chevron_left</i></a>
        </li>
        {pager.pages.map((page, index) => (
          <li key={page} className={pager.currentPage === page ? 'active' : ''}>
            <a onClick={() => this.setPage(page)}>{page}</a>
          </li>))}
        <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
          <a onClick={() => this.setPage(pager.currentPage + 1)}><i className="material-icons">chevron_right</i></a>
        </li>
        <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
          <a className="chip" onClick={() => this.setPage(pager.totalPages)}>Last</a>
        </li>
      </ul>
    );
  }
}

Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;
export default Pagination;
