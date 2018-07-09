'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _CenterController = require('../../controllers/v1/CenterController');

var _CenterController2 = _interopRequireDefault(_CenterController);

var _Security = require('../../middlewares/Security');

var _Security2 = _interopRequireDefault(_Security);

var _RequestSanitizer = require('../../middlewares/RequestSanitizer');

var _RequestSanitizer2 = _interopRequireDefault(_RequestSanitizer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var centersRouterV1 = _express2.default.Router();

centersRouterV1.post('/centers', _Security2.default.check, _RequestSanitizer2.default.checkIfAdmin, _RequestSanitizer2.default.newCenterPreValidation, _RequestSanitizer2.default.handleValidation, _RequestSanitizer2.default.completeCenterAddress, _CenterController2.default.validateCenterName, _CenterController2.default.handleCenterInsert);

centersRouterV1.get('/centers', _RequestSanitizer2.default.sanitizeQuery, _RequestSanitizer2.default.prepareGetAllRequest, _CenterController2.default.generateQuery, _CenterController2.default.handleGetAll);

centersRouterV1.get('/centers/:centerId', _RequestSanitizer2.default.validateParameters, _CenterController2.default.get);

centersRouterV1.get('/states', _CenterController2.default.getAllStates);

centersRouterV1.put('/centers/:centerId', _Security2.default.check, _RequestSanitizer2.default.checkIfAdmin, _RequestSanitizer2.default.validateParameters, _RequestSanitizer2.default.updateCenterPreValidation, _RequestSanitizer2.default.handleValidation, _CenterController2.default.fetchCenterforUpdate, _RequestSanitizer2.default.completeCenterAddress, _CenterController2.default.validateCenterName, _CenterController2.default.handleCenterUpdate);
centersRouterV1.delete('/centers/:centerId', _Security2.default.check, _RequestSanitizer2.default.checkIfAdmin, _RequestSanitizer2.default.validateParameters, _CenterController2.default.delete);

exports.default = centersRouterV1;
//# sourceMappingURL=centersRouterV1.js.map