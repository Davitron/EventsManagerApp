import React from 'react';

/**
 * @param {*} props
 * @returns {*} Home
 */
const NotFound = props =>
  /**
   *@returns {*} view for langing page
   */
  (
    <div>
      <div className="my-container" style={{ paddingTop: '20em', color: 'black' }}>
        <h1 className="animated fadeInUp" style={{ fontSize: '50px' }}>Oops! Not Found</h1>
        <h3 style={{ paddingBottom: '60px', fontSize: '20px' }} className="animated fadeInUp">Request is either invalid or the requested resouce does not exist.</h3>
      </div>
    </div>
  );


export default NotFound;
