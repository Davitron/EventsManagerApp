'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _models = require('../../models');

var _models2 = _interopRequireDefault(_models);

var _Pagination = require('../../services/Pagination');

var _Pagination2 = _interopRequireDefault(_Pagination);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Centers = _models2.default.Center;
var Events = _models2.default.Event;
var States = _models2.default.State;

var Op = _sequelize2.default.Op;


var centerAtributes = ['id', 'name', 'address', 'fullAddress', 'price', 'hallCapacity', 'carParkCapacity', 'image', 'price'];

var dbInclude = [{
  model: _models2.default.State,
  required: true,
  as: 'state',
  attributes: ['stateName']
}, {
  model: _models2.default.User,
  required: true,
  as: 'user',
  attributes: ['username']
}];

/**
 * @export
 *
 * @class CenterController
 *
 */

var CenterController = function () {
  function CenterController() {
    _classCallCheck(this, CenterController);
  }

  _createClass(CenterController, null, [{
    key: 'generateQuery',

    /**
     *
     * @param {object} req - HTTP request object
     * @param {object} res - HTTP response object
     * @param {function} next - call next function
     * @returns {next}
     *
     * generates a query and passes it into the next function
     */
    value: function generateQuery(req, res, next) {
      var customQuery = {};
      var query = {};

      var defaultQuery = {
        attributes: [].concat(centerAtributes),
        include: dbInclude,
        limit: req.meta.limit,
        offset: req.meta.offset,
        order: [['name']]
      };

      if (Object.keys(req.query).length === 0) {
        req.meta.query = defaultQuery;
        return next();
      }

      if (req.query.search) {
        query = _defineProperty({}, Op.or, [{ name: { ilike: '%' + req.query.search + '%' } }, { fullAddress: { ilike: '%' + req.query.search + '%' } }]);
      }
      if (req.query.state) query.stateId = req.query.state;
      if (req.query.facilities) query.facilities = _defineProperty({}, Op.contains, req.query.facilities);
      if (req.query.capacity) query.hallCapacity = _defineProperty({}, Op.gte, req.query.capacity);

      customQuery = _extends({ where: query }, defaultQuery);
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

  }, {
    key: 'validateCenterName',
    value: function validateCenterName(req, res, next) {
      var query = void 0;
      if (req.validateName !== false) {
        if (req.params.centerId) {
          query = {
            name: req.body.name,
            stateId: req.body.stateId,
            address: req.body.address,
            id: _defineProperty({}, _sequelize2.default.Op.ne, parseInt(req.params.centerId, 10))
          };
        } else {
          query = {
            name: req.body.name,
            address: req.body.address,
            stateId: req.body.stateId
          };
        }
        return Centers.findAll({ where: query }).then(function (centers) {
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

  }, {
    key: 'handleCenterInsert',
    value: function handleCenterInsert(req, res) {
      req.body.facilities = req.body.facilities.map(function (f) {
        return f.toLowerCase();
      });
      Centers.create({
        name: req.body.name,
        stateId: parseInt(req.body.stateId, 10),
        address: req.body.address,
        fullAddress: req.body.fullAddress,
        hallCapacity: parseInt(req.body.hallCapacity, 10),
        carParkCapacity: parseInt(req.body.carParkCapacity, 10),
        facilities: req.body.facilities,
        image: req.body.image,
        createdBy: parseInt(req.decoded.id, 10),
        updatedBy: parseInt(req.decoded.id, 10),
        price: parseFloat(req.body.price)
      }).then(function (center) {
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

  }, {
    key: 'handleGetAll',
    value: function handleGetAll(req, res) {
      return Centers.findAndCountAll(req.meta.query).then(function (centers) {
        if (centers.rows.length === 0) {
          return res.status(404).json({
            message: 'No centers found',
            statusCode: 404,
            data: [],
            metadata: null
          });
        }
        return res.status(200).json({
          message: 'Centers Retrieved',
          data: centers.rows,
          metadata: {
            pagination: _Pagination2.default.createPagingData(centers, req.meta)
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

  }, {
    key: 'handleCenterUpdate',
    value: function handleCenterUpdate(req, res) {
      var center = req.currentCenter;
      return center.update({
        name: req.body.name || center.name,
        stateId: parseInt(req.body.stateId, 10) || center.stateId,
        address: req.body.address || center.address,
        fullAddress: req.body.fullAddress || center.fullAddress,
        hallCapacity: parseInt(req.body.hallCapacity, 10) || center.hallCapacity,
        carParkCapacity: parseInt(req.body.carParkCapacity, 10) || center.carParkCapacity,
        facilities: req.body.facilities || center.facilities,
        image: req.body.image || center.image,
        updatedBy: parseInt(req.body.admin, 10) || center.updatedBy,
        price: parseFloat(req.body.price) || center.price
      }).then(function (updatedCenter) {
        return res.status(200).json({
          message: 'Center update successful',
          statusCode: 200,
          updatedCenter: updatedCenter
        });
      });
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

  }, {
    key: 'get',
    value: function get(req, res) {
      return Centers.findOne({
        where: {
          id: req.params.centerId
        },
        attributes: [].concat(centerAtributes, ['stateId', 'facilities', 'createdBy']),
        include: dbInclude
      }).then(function (center) {
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
          }
        }).then(function (count) {
          var pendingEvents = count;
          return res.status(200).send({
            message: 'Center Retrieved',
            center: center,
            metadata: {
              pendingEventCount: pendingEvents,
              events: req.protocol + '://' + req.get('host') + req.baseUrl + '/events?centerId=' + center.id
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

  }, {
    key: 'fetchCenterforUpdate',
    value: function fetchCenterforUpdate(req, res, next) {
      return Centers.findOne({
        where: {
          id: req.params.centerId
        }
      }).then(function (center) {
        if (!center) {
          return res.status(404).json({
            message: 'center does not exist',
            statusCode: 404
          });
        }
        if (req.body.facilities) {
          req.body.facilities = req.body.facilities.map(function (f) {
            return f.toLowerCase();
          });
        }
        if (req.body.name && center.name !== req.body.name) {
          req.currentCenter = center;
          req.validateName = true;
          return next();
        }
        req.currentCenter = center;
        req.validateName = false;
        next();
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

  }, {
    key: 'delete',
    value: function _delete(req, res) {
      return Centers.findById(req.params.centerId).then(function (center) {
        if (!center) {
          return res.status(404).json({
            message: 'Center does not exist',
            statusCode: 404
          });
        }
        return center.destroy().then(function () {
          return res.status(200).json({ message: 'Center is successfully deleted', statusCode: 200 });
        });
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

  }, {
    key: 'getAllStates',
    value: function getAllStates(req, res) {
      return States.findAll({ limit: 37 }).then(function (states) {
        if (states.length === 0) {
          return res.status(404).json({
            message: 'States Not Found',
            statusCode: 404
          });
        }
        return res.status(200).json({ message: 'States Retrieved', states: states, statusCode: 200 });
      });
    }
  }]);

  return CenterController;
}();

exports.default = CenterController;
//# sourceMappingURL=CenterController.js.map