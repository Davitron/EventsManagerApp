import express from 'express';
import CenterController from '../../controllers/v1/center-controller';
import Security from '../../middlewares/security';
import ValidatRequest from '../../middlewares/request-validation';

const centersRouterV1 = express.Router();

centersRouterV1.post(
  '/centers',
  Security.check,
  ValidatRequest.checkIfAdmin,
  ValidatRequest.newCenterPreValidation,
  ValidatRequest.handleValidation,
  CenterController.validateCenterName,
  CenterController.handleCenterInsert
);

centersRouterV1.get(
  '/centers',
  ValidatRequest.sanitizeQuery,
  ValidatRequest.prepareGetAllRequest,
  CenterController.generateQuery,
  CenterController.handleGetAll
);

centersRouterV1.get(
  '/centers/:centerId',
  ValidatRequest.validateParameters,
  CenterController.get
);

centersRouterV1.get('/states', CenterController.getAllStates);

centersRouterV1.put(
  '/centers/:centerId',
  Security.check,
  ValidatRequest.checkIfAdmin,
  ValidatRequest.validateParameters,
  ValidatRequest.updateCenterPreValidation,
  ValidatRequest.handleValidation,
  CenterController.fetchCenterforUpdate,
  CenterController.validateCenterName,
  CenterController.handleCenterUpdate
);
centersRouterV1.delete(
  '/centers/:centerId',
  Security.check,
  ValidatRequest.checkIfAdmin,
  ValidatRequest.validateParameters,
  CenterController.delete
);

export default centersRouterV1;
