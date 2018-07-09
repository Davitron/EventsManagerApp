'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _centersRouterV = require('./centersRouterV1');

var _centersRouterV2 = _interopRequireDefault(_centersRouterV);

var _eventsRouterV = require('./eventsRouterV1');

var _eventsRouterV2 = _interopRequireDefault(_eventsRouterV);

var _usersRouterV = require('./usersRouterV1');

var _usersRouterV2 = _interopRequireDefault(_usersRouterV);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routesV1 = function routesV1(app) {
  app.use('/api/v1/', _centersRouterV2.default);
  app.use('/api/v1/', _eventsRouterV2.default);
  app.use('/api/v1/', _usersRouterV2.default);
};

exports.default = routesV1;
//# sourceMappingURL=index.js.map