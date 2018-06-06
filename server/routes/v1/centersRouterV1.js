import express from 'express';
import CenterController from '../../controllers/v1/CenterController';
import Security from '../../middlewares/Security';
import RequestSanitizer from '../../middlewares/RequestSanitizer';

const centersRouterV1 = express.Router();

centersRouterV1.post(
  '/centers',
  Security.check,
  RequestSanitizer.checkIfAdmin,
  RequestSanitizer.newCenterPreValidation,
  RequestSanitizer.handleValidation,
  CenterController.validateCenterName,
  CenterController.handleCenterInsert
);

centersRouterV1.get(
  '/centers',
  RequestSanitizer.sanitizeQuery,
  RequestSanitizer.prepareGetAllRequest,
  CenterController.generateQuery,
  CenterController.handleGetAll
);

centersRouterV1.get(
  '/centers/:centerId',
  RequestSanitizer.validateParameters,
  CenterController.get
);

centersRouterV1.get('/states', CenterController.getAllStates);

centersRouterV1.put(
  '/centers/:centerId',
  Security.check,
  RequestSanitizer.checkIfAdmin,
  RequestSanitizer.validateParameters,
  RequestSanitizer.updateCenterPreValidation,
  RequestSanitizer.handleValidation,
  CenterController.fetchCenterforUpdate,
  CenterController.validateCenterName,
  CenterController.handleCenterUpdate
);
centersRouterV1.delete(
  '/centers/:centerId',
  Security.check,
  RequestSanitizer.checkIfAdmin,
  RequestSanitizer.validateParameters,
  CenterController.delete
);

export default centersRouterV1;
