import Sequelize from 'sequelize';
import model from '../../models';
import Pagination from '../../services/pagingService';

const Centers = model.Center;
const Events = model.Event;
const States = model.State;

const { Op } = Sequelize;

/**
 * @export
 *
 * @class CenterController
 *
 */
export default class CenterController {
  /**
   *
   * @param {object} req - HTTP request object
   * @param {object} res - HTTP response object
   * @param {function} next - call next function
   * @returns {next}
   *
   * generates a query and passes it into the next function
   */
  static generateQuery(req, res, next) {
    let customQuery = {};
    let query = {};

    const defaultQuery = {
      include: [
        { model: model.State, required: true, attributes: ['stateName'] },
        { model: model.User, required: true, attributes: ['username'] },
      ],
      limit: req.meta.limit,
      offset: req.meta.offset,
      order: [['id']]
    };

    if (Object.keys(req.query).length === 0) {
      req.meta.query = defaultQuery;
      return next();
    }

    if (req.query.search) {
      query = {
        [Op.or]: [
          { name: { ilike: `%${req.query.search}%` } },
          { address: { ilike: `%${req.query.search}%` } }
        ]
      };
    }
    if (req.query.state) query.stateId = req.query.state;
    if (req.query.facilities) query.facilities = { [Op.contains]: req.query.facilities };
    if (req.query.capacity) query.hallCapacity = { [Op.gte]: req.query.capacity };

    customQuery = { where: query, ...defaultQuery };
    req.meta.query = customQuery;
    return next();
  }

  /**
   * Check if Center already exists
   *
   * @memberOf {CenterController}
   *
   * @param {object} req - HTTP request Object
   *
   * @param {object} res - HTTP response Object
   *
   * @param {object} next - call next function
   *
   * @return {object|next} - JSON response if center exists or null if otherwise
   *
   * @memberof CenterController
   */
  static validateCenterName(req, res, next) {
    let query;
    if (req.validateName !== false) {
      if (req.params.centerId) {
        query = {
          name: req.body.name,
          stateId: req.body.stateId,
          address: req.body.address,
          id: {
            [Sequelize.Op.ne]: parseInt(req.params.centerId, 10)
          }
        };
      } else {
        query = {
          name: req.body.name,
          address: req.body.address,
          stateId: req.body.stateId
        };
      }
      return Centers.findAll({ where: query })
        .then((centers) => {
          if (centers.length > 0) {
            return res.status(409).json({ message: 'Center already exists', statusCode: 409 });
          }
          next();
        });
    }
    return next();
  }


  /**
   * Insert new center into database
   *
   * @param {object} req - HTTP request object
   *
   * @param {object} res - HTTP response object
   *
   * @returns {CenterInsertResponse} - JSON response
   *
   * @memberof CenterController
   */
  static handleCenterInsert(req, res) {
    req.body.facilities = req.body.facilities.map(f => f.toLowerCase());
    Centers.create({
      name: req.body.name,
      stateId: parseInt(req.body.stateId, 10),
      address: req.body.address,
      hallCapacity: parseInt(req.body.hallCapacity, 10),
      carParkCapacity: parseInt(req.body.carParkCapacity, 10),
      facilities: req.body.facilities,
      image: req.body.image,
      createdBy: parseInt(req.decoded.id, 10),
      updatedBy: parseInt(req.decoded.id, 10),
      price: parseFloat(req.body.price)
    })
      .then((center) => {
        res.status(201).json({ message: 'New Center Created', centerId: center.id, statusCode: 201 });
      });
  }

  /**
   *
   * @param {object} req
   *
   * @param {object} res
   *
   * @return {object} The list of all centers
   */
  static handleGetAll(req, res) {
    return Centers.findAndCountAll(req.meta.query)
      .then((centers) => {
        if (centers.rows.length === 0) {
          return res.status(404).json({
            message: 'No centers found',
            statusCode: 404,
            data: [],
            metadata: null,
          });
        }
        return res.status(200).json({
          message: 'Centers Retrieved',
          data: centers.rows,
          metadata: {
            pagination: Pagination.createPagingData(centers, req.meta),
          },
          statusCode: 200
        });
      });
  }

  /**
   *
   *
   * @param {object} req - HTTP request body
   *
   * @param {object} res - HTTP response object
   *
   * @returns {CenterUpdateResponse} - JSON response
   *
   * @memberof CenterController
   */
  static handleCenterUpdate(req, res) {
    const center = req.currentCenter;
    return center.update({
      name: req.body.name || center.name,
      stateId: parseInt(req.body.stateId, 10) || center.stateId,
      address: req.body.address || center.address,
      hallCapacity: parseInt(req.body.hallCapacity, 10) || center.hallCapacity,
      carParkCapacity: parseInt(req.body.carParkCapacity, 10) ||
      center.carParkCapacity,
      facilities: req.body.facilities || center.facilities,
      image: req.image || center.image,
      updatedBy: parseInt(req.admin, 10) || center.updatedBy,
      price: parseFloat(req.price) || center.price
    })
      .then(updatedCenter => res.status(200).json({
        message: 'Center update successful',
        statusCode: 200,
        updatedCenter
      }));
  }


  /**
   *
   * @param {object} req - HTTP request object
   *
   * @param {object} res - HTTP response object
   *
   * @returns {object} The requested center object
   *
   * @memberof CenterController
   */
  static get(req, res) {
    return Centers.findOne({
      where: {
        id: req.params.centerId
      },
      attributes: ['id', 'stateId', 'name', 'address', 'facilities', 'hallCapacity', 'carParkCapacity', 'price', 'createdBy', 'image'],
      include: [{
        model: model.State,
        required: true,
        attributes: ['stateName']
      }, {
        model: model.User,
        required: true,
        attributes: ['username']
      }]
    })
      .then((center) => {
        if (!center) {
          return res.status(404).json({
            message: 'Center Not Found',
            statusCode: 404 // return this when center is not present
          });
        }
        Events.count({
          where: {
            centerId: center.id,
            status: 'pending'
          },
        })
          .then((count) => {
            const pendingEvents = count;
            return res.status(200).send({
              message: 'Center Retrieved',
              center,
              metadata: {
                pendingEventCount: pendingEvents,
                events: `${req.protocol}://${req.get('host')}${req.baseUrl}/events?centerId=${center.id}`
              },
              statusCode: 200
            });
          });
      });
  }

  /**
   *
   * @param {object} req - HTTP request object
   *
   * @param {object} res - HTTP request object
   *
   * @param {object} next - call next function
   *
   * @returns {json} Object with properties message and statusCode
   *
   * @memberof CenterController
   */
  static fetchCenterforUpdate(req, res, next) {
    return Centers.findOne({
      where: {
        id: req.params.centerId
      }
    })
      .then((center) => {
        if (!center) {
          return res.status(404).json({
            message: 'center does not exist',
            statusCode: 404
          });
        }
        if (req.body.facilities) {
          req.body.facilities = req.body.facilities.map(f => f.toLowerCase());
        }
        if (req.body.name && center.name !== req.body.name) {
          req.currentCenter = center;
          req.validateName = true;
          return next();
        }
        req.currentCenter = center;
        req.validateName = false;
        next();
        // return CenterController.handleCenterUpdate(center, req.body, res);
      });
  }

  /**
   * @param {object} req - HTTP request object
   *
   * @param {object} res - HTTP response object
   *
   * @returns {object} - JSON object if deletion is successful
   *
   * @memberof CenterController
   */
  static delete(req, res) {
    return Centers.findById(req.params.centerId)
      .then((center) => {
        if (!center) {
          return res.status(404).json({
            message: 'Center does not exist',
            statusCode: 404
          });
        }
        return center.destroy()
          .then(() => res.status(200).json({ message: 'Center is successfully deleted', statusCode: 200 }));
      });
  }

  /**
   *
   * @param {object} req - HTTP request object
   *
   * @param {object} res - HTTP response object
   *
   * @returns {object} - List of states
   *
   * @memberof CenterController
   *
   */
  static getAllStates(req, res) {
    return States.findAll({ limit: 37 })
      .then((states) => { res.status(200).json({ message: 'States Retrieved', states, statusCode: 200 }); });
  }
}
