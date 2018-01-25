// import React from 'react';
// import { Route, Redirect } from 'react-router';
// import { Card, CardTitle, Row, Button, Col } from 'react-materialize';
// import PropTypes from 'prop-types';
// import InfiniteScroll from 'react-infinite-scroll-component';

// /**
//  *
//  */
// class CenterCard extends Component {
//   /**
//    *
//    * @param {*} props
//    */
//   constructor(props) {
//     super(props);
//     this.state = {
//       centerId: undefi
//     };
//   }

//   /**
//    * @returns {*} initialize centerId
//    */
//   componentWillMount() {
//     this.setState({
//       centerId: this.props.centerId
//     });
//   }

//   /**
//    * @returns {}
//    */
//   render() {
//     const {center}
//     return (
//       <Card
//         header={<CardTitle reveal image={center.image || '../../../../src/assests/image/banner4.jpg'} waves="light" />}
//         title={center.name}
//         className="cardText"
//         reveal={
//           <div>
//             <Row>
//               <Col s={3}>
//                 State:
//               </Col>
//               <Col s={9}>
//                 {center.State.statName}
//               </Col>
//             </Row>
//             <Row>
//               <Col s={3}>
//                 Capacity:
//               </Col>
//               <Col s={9}>
//                 {center.hallCapacity}
//               </Col>
//             </Row>
//             <Row>
//               <Col s={3}>
//                 Carpark Space:
//               </Col>
//               <Col s={9}>
//                 {center.carParkCapacity}
//               </Col>
//             </Row>
//             <Row>
//               <Col s={3}>
//                 facilities:
//               </Col>
//               <Col s={9}>
//                 {center.facilities}
//               </Col>
//             </Row>
//             <Row className="center">
//               <Button waves="light" large className={['animated', 'bounceInUp'].join(' ')}>View Upcoming Events</Button>
//             </Row>
//           </div>
//         }
//       >
//         <p><a href="#createEvent" onClick={() => handleOpen((center.id))}>Book this center</a></p>
//       </Card>
//     );
//   }

// }

// const CenterCard = ({
//   center
// }) =>
//   (
//     <Card
//       header={<CardTitle reveal image={center.image || '../../../../src/assests/image/banner4.jpg'} waves="light" />}
//       title={center.name}
//       className="cardText"
//       reveal={
//         <div>
//           <Row>
//             <Col s={3}>
//               State:
//             </Col>
//             <Col s={9}>
//               {center.State.statName}
//             </Col>
//           </Row>
//           <Row>
//             <Col s={3}>
//               Capacity:
//             </Col>
//             <Col s={9}>
//               {center.hallCapacity}
//             </Col>
//           </Row>
//           <Row>
//             <Col s={3}>
//               Carpark Space:
//             </Col>
//             <Col s={9}>
//               {center.carParkCapacity}
//             </Col>
//           </Row>
//           <Row>
//             <Col s={3}>
//               facilities:
//             </Col>
//             <Col s={9}>
//               {center.facilities}
//             </Col>
//           </Row>
//           <Row className="center">
//             <Button waves="light" large className={['animated', 'bounceInUp'].join(' ')}>View Upcoming Events</Button>
//           </Row>
//         </div>
//       }
//     >
//       <p><a href="#createEvent" onClick={() => handleOpen((center.id))}>Book this center</a></p>
//     </Card>
//   );


// CenterCard.propTypes = {
//   center: PropTypes.objectOf(() => null).isRequired
// };
// export default CenterCard;
