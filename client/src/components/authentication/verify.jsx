import React from 'react';

/**
 * @param {*} props
 * @returns {*} rerurs view for landing page
 */
const VerifyEmail = props => (
  <div>
    <div className="home">
      <div className="section section__hero" style={{ color: 'white' }}>
        <div className="my-container" style={{ paddingTop: '8em' }}>
          <h2 className="animated fadeInUp">Registration Successful.</h2>
          <h3 style={{ paddingBottom: '60px' }} className="animated fadeInUp">A verification link has been sent to your mail</h3>
        </div>
      </div>
    </div>
  </div>
);

export default VerifyEmail;
