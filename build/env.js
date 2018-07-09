'use strict';

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
//# sourceMappingURL=env.js.map