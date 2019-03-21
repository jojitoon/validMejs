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
      var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "".concat(name.charAt(0).toUpperCase() + name.slice(1), " must be a valid email");
      checkAndPush(validate.req[name] && !(0, _isEmail2.default)(validate.req[name]), message, validate);
      return options(validate);
    },
    hasElement: function hasElement(item) {
      var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "".concat(item, " is required");
      checkAndPush(!validate.req[item], message, validate);
      return options(validate);
    },
    isLength: function isLength(item, value) {
      var message = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "".concat(item, " must have at least a length of ").concat(value);
      checkAndPush(validate.req[item] && validate.req[item].replace(/\s/g, '').length < value, message, validate);
      return options(validate);
    },
    hasSpaces: function hasSpaces(item) {
      var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "".concat(item, " must not have spaces");
      checkAndPush(validate.req[item] && /\s/.test(validate.req[item]), message, validate);
      return options(validate);
    },
    isBool: function isBool(item) {
      var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "".concat(item, " must be a boolean");
      checkTypeOf(validate.req[item], 'boolean', message, validate);
      return options(validate);
    },
    isNumber: function isNumber(item) {
      var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "".concat(item, " must be a number");
      checkAndPush(typeof validate.req[item] !== 'number' || isNaN(validate.req[item]), message, validate);
      return options(validate);
    },
    isString: function isString(item) {
      var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "".concat(item, " must be a string");
      checkTypeOf(validate.req[item], 'string', message, validate);
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
      checkAndPush(validate.req[item] && validate.req[item].length < length, message.length, validate);

      if (hasUpper) {
        checkAndPush(validate.req[item] && !upper.test(validate.req[item]), message.upper, validate);
      }

      if (hasNumber) {
        checkAndPush(validate.req[item] && !num.test(validate.req[item]), message.number, validate);
      }

      if (hasSpecial) {
        checkAndPush(validate.req[item] && !special.test(validate.req[item]), message.special, validate);
      }

      return options(validate);
    },
    isPhoneNumber: function isPhoneNumber(item) {
      var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 11;
      var message = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "".concat(item, " must be a valid phone number");
      var pattern = "^(([+]{1}[0-9]{2}|0)[0-9]{".concat(length - 1, "})$");
      var phone = new RegExp(pattern, 'g');
      checkAndPush(validate.req[item] && !phone.test(validate.req[item]), message, validate);
      return options(validate);
    },
    isDateFormat: function isDateFormat(item) {
      var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "".concat(item, " must be a valid date");
      var date = /^((0?[13578]|10|12)(-|\/)(([1-9])|(0[1-9])|([12])([0-9]?)|(3[01]?))(-|\/)((19)([2-9])(\d{1})|(20)([01])(\d{1})|([8901])(\d{1}))|(0?[2469]|11)(-|\/)(([1-9])|(0[1-9])|([12])([0-9]?)|(3[0]?))(-|\/)((19)([2-9])(\d{1})|(20)([01])(\d{1})|([8901])(\d{1})))$/g;
      checkAndPush(validate.req[item] && !date.test(validate.req[item]), message, validate);
      return options(validate);
    },
    isUrl: function isUrl(item) {
      var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "".concat(item, " must be a valid URL");
      var url = /(http[s]?:\/\/)?[^\s(["<,>]*\.[^\s[",><]*/igm;
      checkAndPush(validate.req[item] && !url.test(validate.req[item]), message, validate);
      return options(validate);
    },
    isDate: function isDate(item) {
      var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "".concat(item, " must be a date");
      var date = new Date(validate.req[item]);
      checkAndPush(date.toDateString() === 'Invalid Date', message, validate);
      return options(validate);
    },
    contains: function contains(item, sub) {
      var message = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "".concat(item, " must include ").concat(sub);
      var val = validate.req[item];
      checkAndPush(val && !val.includes(sub), message, validate);
      return options(validate);
    },
    isEnum: function isEnum(item, array) {
      var message = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "".concat(item, " must be be one of these: ").concat(array);
      var val = validate.req[item];
      checkAndPush(val && !array.includes(val), message, validate);
      return options(validate);
    },
    isUUID: function isUUID(item) {
      var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "".concat(item, " must be a UUID");
      var uuidTest = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      var val = validate.req[item];
      checkAndPush(val && !uuidTest.test(val), message, validate);
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
      if (validate.errors.length > 0) {
        return {
          valid: false,
          errors: validate.errors
        };
      }

      return {
        valid: true,
        errors: validate.errors
      };
    }
  };
};

var validate = function validate(req) {
  return options({
    req: req,
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
  var checkDate = new Date(validate.req[date]);
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