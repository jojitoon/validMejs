import isEmail from 'validator/lib/isEmail';

const options = validate => ({
  isEmail: (name='email', variable=name) => {
    if (validate.req.body[name] && !isEmail(validate.req.body[name])) {
      validate.errors.push(`${variable.charAt(0).toUpperCase() + variable.slice(1)} must be a valid email`);
    }
    
    console.log(`${variable.charAt(0).toUpperCase() + variable.slice(1)} must be a valid email`)
    return options(validate);
  },

  hasElement: (item, variable=item) => {
    if (!validate.req.body[item]) {
      validate.errors.push(`${variable} is required`);
    }
    return options(validate);
  },

  isLength: (item, value, variable=item) => {
    if (validate.req.body[item] && validate.req.body[item].replace(/\s/g, '').length < value) {
      validate.errors.push(`${variable} must have at least a length of ${value}`);
    }
    return options(validate);
  },

  hasSpaces: (item, variable=item) => {
    if (validate.req.body[item] && /\s/.test(validate.req.body[item])) {
      validate.errors.push(`${variable} must not have spaces`);
    }
    return options(validate);
  },

  isBool: (item, variable=item) => {
    if (typeof validate.req.body[item] !== 'boolean') {
      validate.errors.push(`${variable} must be a boolean`);
    }
    return options(validate);
  },

  isNumber: (item, variable=item) => {
    if (typeof validate.req.body[item] !== 'number' || isNaN(validate.req.body[item])) {
      validate.errors.push(`${variable} must be a number`);
    }
    return options(validate);
  },

  isString: (item, variable=item) => {
    if (typeof validate.req.body[item] !== 'string') {
      validate.errors.push(`${variable} must be a string`);
    }
    return options(validate);
  },

  isDate: (item, variable=item) => {
      const date = new Date(validate.req.body[item]);
    if (date.toDateString() === 'Invalid Date') {
      validate.errors.push(`${variable} must be a date`);
    }
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
    const checkDate = new Date(validate.req.body[date]);
    const today = new Date(compare);
    const message = `${variable} is an invalid date. Must not be further than ${today.toDateString()}`
    checkDate.setUTCHours(0);
    checkDate.setUTCMinutes(0);
    checkDate.setUTCSeconds(0);
    checkDate.setUTCMilliseconds(0);

    today.setUTCHours(0);
    today.setUTCMinutes(0);
    today.setUTCSeconds(0);
    today.setUTCMilliseconds(0);
  if (checkDate > today) {
    validate.errors.push(message);
  }
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