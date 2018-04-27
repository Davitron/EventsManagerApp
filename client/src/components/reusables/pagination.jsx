import React from 'react';
import PropTypes from 'prop-types';
import Pagination from 'rc-pagination';
import Select from 'rc-select';
import 'rc-pagination/assets/index.css';
import 'rc-select/assets/index.css';

const Paginator = ({
  pagingData,
  onChange,
  onShowSizeChange
}) => (
  <Pagination
    locale={{ items_per_page: 'Items' }}
    showSizeChanger
    selectComponentClass={Select}
    onChange={onChange}
    onShowSizeChange={onShowSizeChange}
    current={parseInt(pagingData.page, 10)}
    pageSize={parseInt(pagingData.limit, 10)}
    total={pagingData.count}
    className="pagination"
    pageSizeOptions={['9', '12', '18']}
  />
);


Paginator.propTypes = {
  pagingData: PropTypes.shape().isRequired,
  onChange: PropTypes.func.isRequired,
  onShowSizeChange: PropTypes.func.isRequired,
};

export default Paginator;
