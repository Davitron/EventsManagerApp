import React, { Component } from 'react';
import '../../../App.css';

/**
 * @param {*} props
* @returns {*} view for prealoader
*/
const Loader = props =>
  (
    <div className={['preloader-wrapper', 'small', 'active'].join(' ')}>
      <div className={['spinner-layer', 'spinner-green'].join(' ')}>
        <div className={['circle-clipper', 'left'].join(' ')}>
          <div className="circle" />
        </div>
        <div className="gap-patch">
          <div className="circle" />
        </div>
        <div className={['circle-clipper', 'right'].join(' ')}>
          <div className="circle" />
        </div>
      </div>
      <div className={['spinner-layer', 'spinner-yellow'].join(' ')}>
        <div className={['circle-clipper', 'left'].join(' ')}>
          <div className="circle" />
        </div>
        <div className="gap-patch">
          <div className="circle" />
        </div>
        <div className={['circle-clipper', 'right'].join(' ')}>
          <div className="circle" />
        </div>
      </div>
      <div className={['spinner-layer', 'spinner-red'].join(' ')}>
        <div className={['circle-clipper', 'left'].join(' ')}>
          <div className="circle" />
        </div>
        <div className="gap-patch">
          <div className="circle" />
        </div>
        <div className={['circle-clipper', 'right'].join(' ')}>
          <div className="circle" />
        </div>
      </div>
      <div className={['spinner-layer', 'spinner-blue'].join(' ')}>
        <div className={['circle-clipper', 'left'].join(' ')}>
          <div className="circle" />
        </div>
        <div className="gap-patch">
          <div className="circle" />
        </div>
        <div className={['circle-clipper', 'right'].join(' ')}>
          <div className="circle" />
        </div>
      </div>
    </div>
  );

export default Loader;
