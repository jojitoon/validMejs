"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "middleware", {
  enumerable: true,
  get: function get() {
    return _middleware.default;
  }
});
Object.defineProperty(exports, "customMiddleware", {
  enumerable: true,
  get: function get() {
    return _customMiddleware.default;
  }
});

var _middleware = _interopRequireDefault(require("./lib/middleware"));

var _customMiddleware = _interopRequireDefault(require("./lib/customMiddleware"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }