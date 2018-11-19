"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _isEmail2 = _interopRequireDefault(require("validator/lib/isEmail"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var options = function options(validate) {
  return {
    isEmail: function isEmail() {
      var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'email';
      var variable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : name;
      checkAndPush(validate.req.body[name] && !(0, _isEmail2.default)(validate.req.body[name]), "".concat(variable.charAt(0).toUpperCase() + variable.slice(1), " must be a valid email"), validate);
      return options(validate);
    },
    hasElement: function hasElement(item) {
      var variable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : item;
      checkAndPush(!validate.req.body[item], "".concat(variable, " is required"), validate);
      return options(validate);
    },
    isLength: function isLength(item, value) {
      var variable = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : item;
      checkAndPush(validate.req.body[item] && validate.req.body[item].replace(/\s/g, '').length < value, "".concat(variable, " must have at least a length of ").concat(value), validate);
      return options(validate);
    },
    hasSpaces: function hasSpaces(item) {
      var variable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : item;
      checkAndPush(validate.req.body[item] && /\s/.test(validate.req.body[item]), "".concat(variable, " must not have spaces"), validate);
      return options(validate);
    },
    isBool: function isBool(item) {
      var variable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : item;
      checkTypeOf(validate.req.body[item], 'boolean', "".concat(variable, " must be a boolean"), validate);
      return options(validate);
    },
    isNumber: function isNumber(item) {
      var variable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : item;
      checkAndPush(typeof validate.req.body[item] !== 'number' || isNaN(validate.req.body[item]), "".concat(variable, " must be a number"), validate);
      return options(validate);
    },
    isString: function isString(item) {
      var variable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : item;
      checkTypeOf(validate.req.body[item], 'string', "".concat(variable, " must be a string"), validate);
      return options(validate);
    },
    isDate: function isDate(item) {
      var variable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : item;
      var date = new Date(validate.req.body[item]);
      checkAndPush(date.toDateString() === 'Invalid Date', "".concat(variable, " must be a date"), validate);
      return options(validate);
    },
    isDatePast: function isDatePast(date) {
      var variable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : date;
      var compare = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new Date();
      var checkDate = new Date(validate.req.body[date]);
      var today = new Date(compare);
      var message = "".concat(variable, " is an invalid date. Must not be later than ").concat(today.toDateString());
      checkDate.setUTCHours(0);
      checkDate.setUTCMinutes(0);
      checkDate.setUTCSeconds(0);
      checkDate.setUTCMilliseconds(0);
      today.setUTCHours(0);
      today.setUTCMinutes(0);
      today.setUTCSeconds(0);
      today.setUTCMilliseconds(0);

      if (checkDate < today) {
        validate.errors.push(message);
      }

      return options(validate);
    },
    isDateFuture: function isDateFuture(date) {
      var variable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : date;
      var compare = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new Date();
      checkPast(date, compare, variable, validate, false);
      return options(validate);
    },
    check: function check() {
      if (validate.errors.length > 0) {
        return validate.res.status(400).send({
          message: 'Invalid Parameters',
          errors: validate.errors
        });
      }

      return validate.next();
    }
  };
};

var validate = function validate(req, res, next) {
  return options({
    req: req,
    res: res,
    next: next,
    errors: []
  });
};

var _default = validate;
exports.default = _default;

var checkTypeOf = function checkTypeOf(item, type, message, validate) {
  if (_typeof(item) !== type) {
    validate.errors.push(message);
  }
};

var checkAndPush = function checkAndPush(condition, message, validate) {
  if (condition) {
    validate.errors.push(message);
  }
};

var checkPast = function checkPast(date, compare, variable, validate, check) {
  var checkDate = new Date(validate.req.body[date]);
  var today = new Date(compare);
  var message = check ? "".concat(variable, " is an invalid date. Must not be later than ").concat(today.toDateString()) : "".concat(variable, " is an invalid date. Must not be further than ").concat(today.toDateString());
  checkDate.setUTCHours(0);
  checkDate.setUTCMinutes(0);
  checkDate.setUTCSeconds(0);
  checkDate.setUTCMilliseconds(0);
  today.setUTCHours(0);
  today.setUTCMinutes(0);
  today.setUTCSeconds(0);
  today.setUTCMilliseconds(0);

  if (check) {
    if (checkDate < today) {
      validate.errors.push(message);
    }
  } else {
    if (checkDate > today) {
      validate.errors.push(message);
    }
  }
};