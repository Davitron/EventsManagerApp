import validator from 'validatorjs';
import model from '../models';


const Centers = model.Center;
const Events = model.Event;

// compliance rules for user input
const centerRules = {
  name: 'required|string|min:3|max:30',
  stateId: 'required|integer',
  address: 'required|string|min:10',
  hallCapacity: 'required|string',
  carParkCapacity: 'required|string',
  facilities: 'required|string',
  price: 'required|string',
};

/**
 *
 */
export default class CenterController {
  /**
   *
   * @param {*} req
   * @param {*} res
   * @returns {json} returns created center
   */
  static create(req, res) {
    const validate = new validator(req.body, centerRules);
    // check for validation compliance
    if (validate.passes()) {
      // chaeck if center name already exist
      return Centers.findAll({
        where: {
          name: req.body.name
        }
      }).then((centers) => {
        if (centers.length > 0) {
          res.status(400).json({
            message: 'Center already exist ' // return this if  center name is taken
          });
        }
        // check if useris an admin
        if (req.decoded.isAdmin === true) {
          const facilityArr = req.body.facilities.split(',')
            .map(facility => facility.trim().toLowerCase())
            .filter(word => word !== ' ');
          return Centers.create({
            name: req.body.name,
            stateId: parseInt(req.body.stateId, 10),
            address: req.body.address,
            hallCapacity: parseInt(req.body.hallCapacity, 10),
            carParkCapacity: parseInt(req.body.carParkCapacity, 10),
            facilities: facilityArr,
            image: 'uhvhsiuvsivi',
            createdBy: parseInt(req.decoded.id, 10),
            updatedBy: parseInt(req.decoded.id, 10),
            price: parseInt(req.body.price, 10)
          })
            .then(center => res.status(201).json({
              message: 'New Center Is Created Successully', // return this if center creation is successful is successful
              [center]: center
            }))
            .catch(err => res.status(500).json({
              message: 'Oops!, an error has occured', // return this if center creation is not successful
              error: err
            }));
        }
        // return this if user is not an admin
        return res.status(401).json({ message: 'You do not have admin priviledge' });
      });
    }
    res.status(400).json({ message: validate.errors }); // return this if validation compliancr fails
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   * @returns {json} returns a list of all centers
   */
  static getAll(req, res) {
    // to fetch all centers available in the database
    return Centers.findAll().then((centers) => {
      if (centers.length < 1) {
        res.status(200).json({
          message: 'No Centers Available' // return this if centers table is empty
        });
      }
      res.status(200).json(centers); // return all centers retrieved from the database
    }).catch(err => res.status(500).json({
      message: 'Oops!, an error has occured', // return this if an error occurs
      error: err.name
    }));
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   * @returns {json} returns a single center by id
   */
  static get(req, res) {
    // fecth single center with id provided in the request include dwith events in that center
    return Centers.findOne({
      where: {
        id: req.params.centerId
      },
      include: [{
        model: Events,
        as: 'events'
      }]
    }).then((center) => {
      if (!center) {
        return res.status(404).json({
          message: 'Center Not Found', // return this when center is not present
        });
      }
      return res.status(200).send(center); // return this if center is present
    })
      .catch(error => res.status(500).send(error)); 
  }

  /**
   * @param {*} req
   * @param {*} res
   * @returns {json} returns the updated center object
   */
  static update(req, res) {
    const validate = new validator(req.body, centerRules);
    // to check for validation conpliance
    if (validate.passes()) {
      return Centers.findById(req.params.centerId)
        .then((center) => {
          if (!center) {
            return res.status(404).json({
              message: 'Center does not exist',
            });
          }

          // check if user is admin
          if (req.decoded.isAdmin === true) {
            // to convert facilities string to an array
            const facilityArr = req.body.facilities.split(',')
              .map(facility => facility.trim().toLowerCase())
              .filter(word => word !== ' ');
            console.log(req.decoded.isAdmin);
            center.update({
              name: req.body.name || center.name,
              stateId: parseInt(req.body.stateId, 10) || center.stateId,
              address: req.body.address || center.address,
              hallCapacity: parseInt(req.body.hallCapacity, 10) || center.hallCapacity,
              carParkCapacity: parseInt(req.body.carParkCapacity, 10) || center.carParkCapacity,
              facilities: facilityArr || center.facilities,
              image: 'uhvhsiuvsivi' || center.image,
              updatedBy: parseInt(req.decoded.id, 10) || center.updatedBy,
              price: parseInt(req.body.price, 10) || center.price
            })
              .then((modifiedCenter) => {
                return res.status(200).json({
                  message: 'Center Is Modified',
                  center: modifiedCenter
                });
              })
              .catch(error => res.status(500).json({
                errorMessage: error
              }));
          } else {
            // to return this if user is not an admin
            return res.status(401).json({ message: 'You do not have admin priviledge' });
          }
        })
        .catch((error) => { 
          res.status(500).json({ errorMessage: error }); 
        });
    }
    // to return this if validation compliance fails
    res.status(400).json({ message: validate.errors });
  }


  /**
   *
   * @param {*} req
   * @param {*} res
   * @returns {json} returns message object id deletion is successful
   */
  static delete(req, res) {
    // to check if user is an admin
    if (req.decoded.isAdmin === true ) {
      return Centers.findById(req.params.centerId)
        .then((center) => {
          if (!center) {
            return res.status(404).json({
              message: 'Center does not exist',
            });
          }
          center.destroy()
          // to return this center is deleted successfully
            .then(() => res.status(200).json({ message: 'Center is successfully  deleted' }))
            .catch(error => res.status(400).json(error));
        })
        .catch(error => res.status(400).json(error));
    }
  }
}
