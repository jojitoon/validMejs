import isEmail from 'validator/lib/isEmail';

const options = validate => ({
  isEmail: (name='email', variable=name) => {
    checkAndPush(
      validate.req.body[name] && !isEmail(validate.req.body[name]),
      `${variable.charAt(0).toUpperCase() + variable.slice(1)} must be a valid email`,
      validate );
    return options(validate);
  },

  hasElement: (item, variable=item) => {
    checkAndPush(
      !validate.req.body[item],
      `${variable} is required`,
      validate
      );
      return options(validate);
  },

  isLength: (item, value, variable=item) => {
    checkAndPush(
      validate.req.body[item] && validate.req.body[item].replace(/\s/g, '').length < value,
      `${variable} must have at least a length of ${value}`,
      validate
    );
    return options(validate);
  },

  hasSpaces: (item, variable=item) => {
    checkAndPush(
      validate.req.body[item] && /\s/.test(validate.req.body[item]),
      `${variable} must not have spaces`,
      validate
    );
    return options(validate);
  },

  isBool: (item, variable=item) => {
    checkTypeOf(validate.req.body[item], 'boolean', `${variable} must be a boolean`, validate);
    return options(validate)
  },

  isNumber: (item, variable=item) => {
    checkAndPush(
      typeof validate.req.body[item] !== 'number' || isNaN(validate.req.body[item]),
      `${variable} must be a number`,
      validate
    );
    return options(validate);
  },

  isString: (item, variable=item) => {
    checkTypeOf(validate.req.body[item], 'string', `${variable} must be a string`, validate);
    return options(validate)
  },

  isDate: (item, variable=item) => {
      const date = new Date(validate.req.body[item]);
      checkAndPush(date.toDateString() === 'Invalid Date', `${variable} must be a date`, validate);
      return options(validate);
  },


  isDatePast: (date, variable=date, compare = new Date()) => {
      const checkDate = new Date(validate.req.body[date]);
      const today = new Date(compare);
      const message = `${variable} is an invalid date. Must not be later than ${today.toDateString()}`
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

  isDateFuture: (date, variable=date, compare = new Date()) => {
    checkPast(date, compare, variable, validate, false);
  return options(validate);
},

  check: () => {
    if (validate.errors.length > 0) {
      return validate.res.status(400).send({
        message: 'Invalid Parameters',
        errors: validate.errors,
      });
    }
    return validate.next();
  },
});

const validate = (req, res, next) => options({
  req, res, next, errors: [],
});

export default validate;

const checkTypeOf = (item, type, message, validate) => {
  if (typeof item !== type) {
    validate.errors.push(message);
  }
};

const checkAndPush = (condition, message, validate) => {
  if(condition) {
    validate.errors.push(message);
  }
};

const checkPast = (date, compare, variable, validate, check) => {
    const checkDate = new Date(validate.req.body[date]);
    const today = new Date(compare);
    const message = check
                      ?`${variable} is an invalid date. Must not be later than ${today.toDateString()}`
                      :`${variable} is an invalid date. Must not be further than ${today.toDateString()}`;

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