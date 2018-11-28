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
    /** isEmail method: 
     * @description check if the string is a valid email
     * optional: supply name of key in body
     * optional: supply variable for message contruction
     * @param  {string} name
     * @param  {string} variable,
     */
    isEmail: function isEmail() {
      var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'email';
      var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "".concat(name.charAt(0).toUpperCase() + name.slice(1), " must be a valid email");
      checkAndPush(validate.req.body[name] && !(0, _isEmail2.default)(validate.req.body[name]), message, validate);
      return options(validate);
    },
    hasElement: function hasElement(item) {
      var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "".concat(item, " is required");
      checkAndPush(!validate.req.body[item], message, validate);
      return options(validate);
    },
    isLength: function isLength(item, value) {
      var message = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "".concat(item, " must have at least a length of ").concat(value);
      checkAndPush(validate.req.body[item] && validate.req.body[item].replace(/\s/g, '').length < value, message, validate);
      return options(validate);
    },
    hasSpaces: function hasSpaces(item) {
      var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "".concat(item, " must not have spaces");
      checkAndPush(validate.req.body[item] && /\s/.test(validate.req.body[item]), message, validate);
      return options(validate);
    },
    isBool: function isBool(item) {
      var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "".concat(item, " must be a boolean");
      checkTypeOf(validate.req.body[item], 'boolean', message, validate);
      return options(validate);
    },
    isNumber: function isNumber(item) {
      var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "".concat(item, " must be a number");
      checkAndPush(typeof validate.req.body[item] !== 'number' || isNaN(validate.req.body[item]), message, validate);
      return options(validate);
    },
    isString: function isString(item) {
      var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "".concat(item, " must be a string");
      checkTypeOf(validate.req.body[item], 'string', message, validate);
      return options(validate);
    },
    isPassword: function isPassword(item) {
      var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4;
      var hasUpper = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var hasNumber = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var hasSpecial = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      var message = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {
        length: "".concat(item, " must have a minimum length of ").concat(length),
        upper: "".concat(item, " must have contain an uppercase letter"),
        number: "".concat(item, " must have contain a number"),
        special: "".concat(item, " must have contain an special character")
      };
      var upper = /[A-Z]/g;
      var num = /[0-9]/g;
      var special = /[!@#$%^&*(),.?":{}|<>]/g;
      checkAndPush(validate.req.body[item] && validate.req.body[item].length < length, message.length, validate);

      if (hasUpper) {
        checkAndPush(validate.req.body[item] && !upper.test(validate.req.body[item]), message.upper, validate);
      }

      if (hasNumber) {
        checkAndPush(validate.req.body[item] && !num.test(validate.req.body[item]), message.number, validate);
      }

      if (hasSpecial) {
        checkAndPush(validate.req.body[item] && !special.test(validate.req.body[item]), message.special, validate);
      }

      return options(validate);
    },
    isPhoneNumber: function isPhoneNumber(item) {
      var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 11;
      var message = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "".concat(item, " must be a valid phone number");
      var pattern = "^(([+]{1}[0-9]{2}|0)[0-9]{".concat(length - 1, "})$");
      var phone = new RegExp(pattern, 'g');
      checkAndPush(validate.req.body[item] && !phone.test(validate.req.body[item]), message, validate);
      return options(validate);
    },
    isDateFormat: function isDateFormat(item) {
      var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "".concat(item, " must be a valid date");
      var date = /^((0?[13578]|10|12)(-|\/)(([1-9])|(0[1-9])|([12])([0-9]?)|(3[01]?))(-|\/)((19)([2-9])(\d{1})|(20)([01])(\d{1})|([8901])(\d{1}))|(0?[2469]|11)(-|\/)(([1-9])|(0[1-9])|([12])([0-9]?)|(3[0]?))(-|\/)((19)([2-9])(\d{1})|(20)([01])(\d{1})|([8901])(\d{1})))$/g;
      checkAndPush(validate.req.body[item] && !date.test(validate.req.body[item]), message, validate);
      return options(validate);
    },
    isUrl: function isUrl(item) {
      var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "".concat(item, " must be a valid URL");
      var url = /(http[s]?:\/\/)?[^\s(["<,>]*\.[^\s[",><]*/igm;
      checkAndPush(validate.req.body[item] && !url.test(validate.req.body[item]), message, validate);
      return options(validate);
    },
    isDate: function isDate(item) {
      var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "".concat(item, " must be a date");
      var date = new Date(validate.req.body[item]);
      checkAndPush(date.toDateString() === 'Invalid Date', message, validate);
      return options(validate);
    },
    isDatePast: function isDatePast(date) {
      var compare = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Date();
      var message = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "".concat(date, " is an invalid date. Must not be later than ").concat(new Date().toDateString());
      checkPast(date, compare, validate, true, message);
      return options(validate);
    },
    isDateFuture: function isDateFuture(date) {
      var compare = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Date();
      var message = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "".concat(date, " is an invalid date. Must not be further than ").concat(new Date().toDateString());
      checkPast(date, compare, validate, false, message);
      return options(validate);
    },
    check: function check() {
      var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Invalid Parameters';

      if (validate.errors.length > 0) {
        return validate.res.status(400).send({
          message: message,
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

var checkPast = function checkPast(date, compare, validate) {
  var check = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var message = arguments.length > 4 ? arguments[4] : undefined;
  var checkDate = new Date(validate.req.body[date]);
  var today = new Date(compare);
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