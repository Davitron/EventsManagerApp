'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _swaggerUiExpress = require('swagger-ui-express');

var _swaggerUiExpress2 = _interopRequireDefault(_swaggerUiExpress);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

require('./env');

var _index = require('./routes/v1/index');

var _index2 = _interopRequireDefault(_index);

var _swagger = require('./doc/swagger.json');

var _swagger2 = _interopRequireDefault(_swagger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

var port = process.env.PORT || 8000;

app.set('secret_key', process.env.SECRET_KEY);

app.use((0, _morgan2.default)('dev'));
app.use((0, _cors2.default)());
app.use(_bodyParser2.default.json({ limit: '5mb' }));
app.use(_bodyParser2.default.urlencoded({ limit: '5mb', extended: true }));
(0, _index2.default)(app);

app.use(_express2.default.static(_path2.default.join(__dirname, '../client/public')));

app.set('views', _path2.default.join(__dirname, '..', 'client', 'public'));

app.use('/docs', _swaggerUiExpress2.default.serve, _swaggerUiExpress2.default.setup(_swagger2.default));

app.use('/api/*', function (req, res) {
  return res.status(404).send({
    message: 'Sorry Route Not Found!',
    statusCode: 404
  });
});

app.get('*', function (req, res) {
  res.status(200).sendFile(_path2.default.join(__dirname, '..', 'client/public/index.html'));
});

app.listen(port, function () {
  console.log('Server running on port ' + port); // eslint-disable-line
});

exports.default = app;
//# sourceMappingURL=server.js.map