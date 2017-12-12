import validator from 'validatorjs';
import model from '../models';
import centerService from '../services/center-service';

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

const centerUpdateRules = {
  name: 'string|min:3|max:30',
  stateId: 'integer',
  address: 'string|min:10',
  hallCapacity: 'string',
  carParkCapacity: 'string',
  facilities: 'string',
  price: 'string',
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
          name: req.body.name,
          stateId: req.body.stateId,
          address: req.body.address
        }
      }).then((centers) => {
        // return this if  center name is taken
        if (centers.length > 0) {
          return res.status(400).json({
            message: 'Center already exist',
            statusCode: 400
          });
        }
        // check if useris an admin
        if (req.decoded.isAdmin === true) {
          return centerService.create(req)
            .then((center) => {
              // return this if center creation is successful is successful
              const result = {
                message: `${center.name} Is Created Successfully`,
                statusCode: 201
              };
              res.status(result.statusCode).json(result);
            })
            .catch((err) => {
              // return this if center creation is not successful
              console.log(err);
              const result = {
                message: 'Oops!, Server Error',
                statusCode: 500
              };
              res.status(result.statusCode).json(result);
            });
        }
        // return this if user is not an admin
        return res.status(401).json({ message: 'You do not have admin priviledge' });
      });
    }
    // return this if validation compliancr fails
    res.status(400).json({ message: validate.errors });
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   * @returns {json} returns a list of all centers
   */
  static getAll(req, res) {
    // to fetch all centers available in the database
    return centerService.getAll().then((centers) => {
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
    return centerService.getOne(req.params.centerId)
      .then((center) => {
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
    const validate = new validator(req.body, centerUpdateRules);
    if (req.decoded.isAdmin === true) {
      if (validate.passes()) {
        return Centers.findById(req.params.centerId)
          .then((center) => {
            if (!center) {
              return res.status(404).json({
                message: 'Center does not exist',
                statusCode: 404
              });
            }
            if (req.body.name) {
              return centerService.checkNameAvalability(req)
                .then((doesNotExist) => {
                  console.log(!doesNotExist);
                  if (doesNotExist) {
                    res.status(400).json({
                      message: 'Center with name and location already exist',
                      statusCode: 400
                    });
                  } else {
                    centerService.update(req, center)
                      .then((modifiedCenter) => {
                      // console.log(modifiedCenter);
                        return res.status(200).json({
                          message: 'Center Is Modified',
                          center: modifiedCenter,
                          statusCode: 200
                        });
                      })
                      .catch((error) => {
                        console.log(error);
                        return res.status(500).json({
                          message: 'Server Error',
                          statusCode: 500
                        });
                      });
                  }
                })
                .catch((error) => {
                  console.log(error);
                  return res.status(500).json({
                    message: 'Server Error',
                    statusCode: 500
                  });
                });
            }
            return centerService.update(req, center)
              .then((modifiedCenter) => {
                // console.log(modifiedCenter);
                return res.status(200).json({
                  message: 'Center Is Modified',
                  center: modifiedCenter,
                  statusCode: 200
                });
              })
              .catch((error) => {
                console.log(error);
                return res.status(500).json({
                  message: 'Server Error',
                  statusCode: 500
                });
              });
          })
          .catch((error) => {
            console.log(error);
            return res.status(500).json({
              message: 'Server Error',
              statusCode: 500
            });
          });
      }
    } else {
      return res.status(401).json({ message: 'You do not have admin priviledge' });
    }
  }


  /**
   *
   * @param {*} req
   * @param {*} res
   * @returns {json} returns message object id deletion is successful
   */
  static delete(req, res) {
    // to check if user is an admin
    if (req.decoded.isAdmin === true) {
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
