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

      if (validate.req.body[item]) {
        checkTypeOf(validate.req.body[item], 'boolean', "".concat(variable, " must be a boolean"), validate);
      }

      return options(validate);
    },
    isNumber: function isNumber(item) {
      var variable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : item;
      checkAndPush(validate.req.body[item] && (typeof validate.req.body[item] !== 'number' || isNaN(validate.req.body[item])), "".concat(variable, " must be a number"), validate);
      return options(validate);
    },
    isEnum: function isEnum(item) {
      var array = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var variable = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : item;
      checkAndPush(validate.req.body[item] && !array.includes(validate.req.body[item]), "".concat(variable, " must be one of these => ").concat(array), validate);
      return options(validate);
    },
    isArray: function isArray(item) {
      var variable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : item;
      checkAndPush(validate.req.body[item] && !Array.isArray(validate.req.body[item]), "".concat(variable, " must be an array"), validate);
      return options(validate);
    },
    isString: function isString(item) {
      var variable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : item;

      if (validate.req.body[item]) {
        checkTypeOf(validate.req.body[item], 'string', "".concat(variable, " must be a string"), validate);
      }

      return options(validate);
    },
    isArrayOfType: function isArrayOfType(item, type) {
      var variable = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : item;
      checkAndPush(validate.req.body[item] && !isArrayObject(validate.req.body[item], type), "".concat(variable, " must be an array of ").concat(type, "s"), validate);
      return options(validate);
    },
    isArrayOfObjects: function isArrayOfObjects(item) {
      var variable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : item;
      checkAndPush(validate.req.body[item] && !isArrayObject(validate.req.body[item], 'object'), "".concat(variable, " must be an array of objects"), validate);
      return options(validate);
    },
    isPassword: function isPassword(item) {
      var variable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : item;
      var length = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 4;
      var hasUpper = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var hasNumber = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      var hasSpecial = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
      var upper = /[A-Z]/g;
      var num = /[0-9]/g;
      var special = /[!@#$%^&*(),.?":{}|<>]/g;
      checkAndPush(validate.req.body[item] && validate.req.body[item].length < length, "".concat(variable, " must have a minimum length of ").concat(length), validate);

      if (hasUpper) {
        checkAndPush(validate.req.body[item] && !upper.test(validate.req.body[item]), "".concat(variable, " must have contain an uppercase letter"), validate);
      }

      if (hasNumber) {
        checkAndPush(validate.req.body[item] && !num.test(validate.req.body[item]), "".concat(variable, " must have contain a number"), validate);
      }

      if (hasSpecial) {
        checkAndPush(validate.req.body[item] && !special.test(validate.req.body[item]), "".concat(variable, " must have contain an special character"), validate);
      }

      return options(validate);
    },
    isPhoneNumber: function isPhoneNumber(item) {
      var variable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : item;
      var length = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 11;
      var pattern = "^(([+]{1}[0-9]{2}|0)[0-9]{".concat(length - 1, "})$");
      var phone = new RegExp(pattern, 'g');
      checkAndPush(validate.req.body[item] && !phone.test(validate.req.body[item]), "".concat(variable, " must be a valid phone number"), validate);
      return options(validate);
    },
    isDateFormat: function isDateFormat(item) {
      var variable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : item;
      var date = /^((0?[13578]|10|12)(-|\/)(([1-9])|(0[1-9])|([12])([0-9]?)|(3[01]?))(-|\/)((19)([2-9])(\d{1})|(20)([01])(\d{1})|([8901])(\d{1}))|(0?[2469]|11)(-|\/)(([1-9])|(0[1-9])|([12])([0-9]?)|(3[0]?))(-|\/)((19)([2-9])(\d{1})|(20)([01])(\d{1})|([8901])(\d{1})))$/g;
      checkAndPush(validate.req.body[item] && !date.test(validate.req.body[item]), "".concat(variable, " must be a valid date"), validate);
      return options(validate);
    },
    isUrl: function isUrl(item) {
      var variable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : item;
      var url = /(http[s]?:\/\/)?[^\s(["<,>]*\.[^\s[",><]*/igm;
      checkAndPush(validate.req.body[item] && !url.test(validate.req.body[item]), "".concat(variable, " must be a valid URL"), validate);
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
      checkPast(date, compare, variable, validate, true);
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

var checkPast = function checkPast(date, compare, variable, validate) {
  var check = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
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

var isArrayObject = function isArrayObject(arr, type) {
  if (!Array.isArray(arr)) {
    return false;
  }

  for (var i = 0; i < arr.length; i++) {
    if (_typeof(arr[i]) !== type) {
      return false;
    }
  }

  return true;
};