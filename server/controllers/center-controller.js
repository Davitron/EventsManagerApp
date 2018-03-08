import validator from 'validatorjs';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import del from 'node-delete';
import cloudinary from 'cloudinary';
import model from '../models';
import CenterService from '../services/center-service';

const Centers = model.Center;
const Events = model.Event;
const uploadPath = path.resolve(__dirname, './public');

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
    if (req.files.image.size > 1000000) {
      CenterService.cleanUpFiles(req.files.image.path);
      return res.status(400).json({
        message: 'Image size to large. maximum size is 1MB',
        statusCode: 400
      });
    }
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
          CenterService.cleanUpFiles(req.files.image.path);
          console.log('here');
          return res.status(400).json({
            message: 'Center already exist',
            statusCode: 400
          });
        }

        // check if useris an admin
        if (req.decoded.isAdmin === true) {
          CenterService.handleImageUpload(req.files.image.path)
            .then((url) => {
              CenterService.create(req, url)
                .then((center) => {
                  // return this if center creation is successful is successful
                  const result = {
                    message: `${center.name} Is Created Successfully`,
                    centerId: center.id,
                    statusCode: 201
                  };
                  return res.status(result.statusCode).json(result);
                })
                .catch((err) => {
                  // return this if center creation is not successful
                  console.log(err);
                  CenterService.cleanUpFiles(req.files.image.path);
                  const result = {
                    message: 'Oops!, Server Error',
                    statusCode: 500
                  };
                  return res.status(result.statusCode).json(result);
                });
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          CenterService.cleanUpFiles(req.files.image.path);
          // return this if user is not an admin
          return res.status(401).json({ message: 'You do not have admin priviledge' });
        }
      });
    }
    // return this if validation compliancr fails
    console.log(validate.errors);
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
    return CenterService.getAll().then((centers) => {
      if (centers.length < 1) {
        res.status(200).json({
          message: 'No Centers Available',
          statusCode: 200
        });
      }
      res.status(200).json({
        allCenters: centers
      }); // return all centers retrieved from the database
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
    return CenterService.getOne(req.params.centerId)
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
    if (req.files.image && req.files.image.size > 1000000) {
      CenterService.cleanUpFiles(req.files.image.path);
      return res.status(400).json({
        message: 'Image size to large. maximum size is 1MB',
        statusCode: 400
      });
    }
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
              return CenterService.checkNameAvalability(req)
                .then((doesExist) => {
                // console.log(!doesNotExist);
                  if (doesExist) {
                    res.status(400).json({
                      message: 'Center with name and location already exist',
                      statusCode: 400
                    });
                  } else {
                    const file = req.files;
                    CenterService.handleImageUpdate(file, center.image)
                      .then((url) => {
                        req.body.image = url;
                        req.body.admin = req.decoded.id;
                        console.log(req.body);
                        CenterService.update(req.body, center)
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
                })
                .catch((error) => {
                  console.log(error);
                  return res.status(500).json({
                    message: 'Server Error',
                    statusCode: 500
                  });
                });
            }
            const file = req.files;
            CenterService.handleImageUpdate(file, center.image)
              .then((url) => {
                req.body.image = url;
                req.body.admin = req.decoded.id;
                console.log(req.body);
                CenterService.update(req.body, center)
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
          CenterService.handleImageDelete(center.image)
            .then((result) => {
              center.destroy()
              // to return this center is deleted successfully
                .then(() => res.status(200).json({ message: 'Center is successfully deleted' }))
                .catch(error => res.status(400).json(error));
            })
            .catch(error => res.status(500).json(error));
        })
        .catch(error => res.status(500).json(error));
    }
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   * @returns {*} returns centers result
   */
  static searchCenters(req, res) {
    CenterService.searchCenter(req.body)
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((error) => {
        return res.status(500).json({
          message: 'Internal Server Error'
        });
      });
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   * @returns {*} returns all states
   */
  static getAllStates(req, res) {
    return CenterService.getAllStates()
      .then((states) => {
        if (!states) {
          return res.status(404).json({
            massage: 'There are no centers'
          });
        }
        res.status(200).json(states);
      })
      .catch((error) => {
        console.log(error);
        return res.status(400).json(error);
      });
  }
}
