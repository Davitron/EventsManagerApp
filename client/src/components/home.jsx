import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-materialize';
import Header from './header';
import AuthChecker from '../helpers/auth-checker';
import history from '../helpers/history';

/**
 *
 */
class Home extends Component {
  /**
   *
   */
  componentWillMount() {
    if (AuthChecker.checkUserAuth()) {
      history.push('/center-search');
    }
  }

  /**
   * 
   */
  render() {
    return (
      <div>
        <Header />
        <div className="home">
          <div>

            <div className="section section__hero" id="index-banner">
              <div className="container">
                <div className="banner row">
                  <div className="col s12 m7 animated fadeInUp">
                    <h1 className="header title">EventManager</h1>
                    <h5 className="header white-text title">The perfect meeting point for event centers and event planners</h5>
                  </div>
                </div>
                {/* <Row className="center">
                  <Link to="/login" className={['btn', 'btn-large', 'waves-effect'].join(' ')}>SignIn</Link>
                  <Link to="/register" className={['btn', 'btn-large', 'waves-effect', 'red'].join(' ')}>SignUp</Link>
                </Row> */}
                <div className="row center">
                  <Link to="/center-search" className={['waves-effect', 'orange', 'animated', 'fadeInUp', 'btn', 'btn-large'].join(' ')}>Continue as guest</Link>
                </div>
              </div>
            </div>


            {/* <Row className="center">
              <h3>
                <Col s={12} m={8} className={['landing', 'light', 'white-text', 'center', 'animated', 'bounceInDown'].join(' ')}>
                  <b>EventManager.</b><br />
                  The perfect meeting point for event centers and event planners
                </Col>
              </h3>
            </Row>
            <Row className="center">
              <Link to="/login" className={['btn', 'btn-large', 'waves-effect'].join(' ')}>SignIn</Link>
              <Link to="/register" className={['btn', 'btn-large', 'waves-effect', 'red'].join(' ')}>SignUp</Link>
            </Row>
            <Row className="center">
              <Link to="/center-search" className={['waves-effect', 'orange', 'animated', 'bounceInUp', 'btn', 'btn-large'].join(' ')}>Continue as guest</Link>
            </Row> */}
          </div>
        </div>
      </div>
    );
  }
}


// /**
//  * @param {*} props
//  * @returns {*} Home
//  */
// const Home = props =>
//   /**
//    *@returns {*} view for langing page
//    */
//   (
//     <div>
//       <Header />
//       <div className="home">
//         <div>

//           <div className="section section__hero" id="index-banner">
//             <div className="container">
//               <div className="banner row">
//                 <div className="col s12 m7 animated fadeInUp">
//                   <h1 className="header title">EventManager</h1>
//                   <h5 className="header white-text title">The perfect meeting point for event centers and event planners</h5>
//                 </div>
//               </div>
//               {/* <Row className="center">
//                 <Link to="/login" className={['btn', 'btn-large', 'waves-effect'].join(' ')}>SignIn</Link>
//                 <Link to="/register" className={['btn', 'btn-large', 'waves-effect', 'red'].join(' ')}>SignUp</Link>
//               </Row> */}
//               <div className="row center">
//                 <Link to="/center-search" className={['waves-effect', 'orange', 'animated', 'fadeInUp', 'btn', 'btn-large'].join(' ')}>Continue as guest</Link>
//               </div>
//             </div>
//           </div>


//           {/* <Row className="center">
//             <h3>
//               <Col s={12} m={8} className={['landing', 'light', 'white-text', 'center', 'animated', 'bounceInDown'].join(' ')}>
//                 <b>EventManager.</b><br />
//                 The perfect meeting point for event centers and event planners
//               </Col>
//             </h3>
//           </Row>
//           <Row className="center">
//             <Link to="/login" className={['btn', 'btn-large', 'waves-effect'].join(' ')}>SignIn</Link>
//             <Link to="/register" className={['btn', 'btn-large', 'waves-effect', 'red'].join(' ')}>SignUp</Link>
//           </Row>
//           <Row className="center">
//             <Link to="/center-search" className={['waves-effect', 'orange', 'animated', 'bounceInUp', 'btn', 'btn-large'].join(' ')}>Continue as guest</Link>
//           </Row> */}
//         </div>
//       </div>
//     </div>
//   );


export default Home;
