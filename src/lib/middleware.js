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

  isPassword: (item,variable=item, length=4, hasUpper=false, hasNumber=false, hasSpecial=false) => {
    const upper = /[A-Z]/g;
    const num = /[0-9]/g;
    const special = /[!@#$%^&*(),.?":{}|<>]/g;
    checkAndPush(validate.req.body[item] && validate.req.body[item].length < length, `${variable} must have a minimum length of ${length}`, validate);
    
    if(hasUpper){
      checkAndPush(validate.req.body[item] && !upper.test(validate.req.body[item]), `${variable} must have contain an uppercase letter`, validate);
    }
    if(hasNumber){
      checkAndPush(validate.req.body[item] && !num.test(validate.req.body[item]), `${variable} must have contain a number`, validate);
    }
    if(hasSpecial){
      checkAndPush(validate.req.body[item] && !special.test(validate.req.body[item]), `${variable} must have contain an special character`, validate);
    }
    return options(validate)
  },

  isPhoneNumber: (item, variable=item, length=11) => {
    const pattern = `^(([+]{1}[0-9]{2}|0)[0-9]{${length-1}})$`
    const phone = new RegExp(pattern, 'g');

    checkAndPush(
       validate.req.body[item] && !phone.test(validate.req.body[item]), 
       `${variable} must be a valid phone number`, validate);
    return options(validate)
  },

  isDateFormat: (item, variable=item) => {
  const date = /^((0?[13578]|10|12)(-|\/)(([1-9])|(0[1-9])|([12])([0-9]?)|(3[01]?))(-|\/)((19)([2-9])(\d{1})|(20)([01])(\d{1})|([8901])(\d{1}))|(0?[2469]|11)(-|\/)(([1-9])|(0[1-9])|([12])([0-9]?)|(3[0]?))(-|\/)((19)([2-9])(\d{1})|(20)([01])(\d{1})|([8901])(\d{1})))$/g;
    
     checkAndPush(
       validate.req.body[item] && !date.test(validate.req.body[item]), 
       `${variable} must be a valid date`, validate);
    return options(validate)
  },

  isUrl: (item, variable=item) => {
    const url = /(http[s]?:\/\/)?[^\s(["<,>]*\.[^\s[",><]*/igm;

     checkAndPush(
       validate.req.body[item] && !url.test(validate.req.body[item]), 
       `${variable} must be a valid URL`, validate);
    return options(validate)
  },

  isDate: (item, variable=item) => {
      const date = new Date(validate.req.body[item]);
      checkAndPush(date.toDateString() === 'Invalid Date', `${variable} must be a date`, validate);
      return options(validate);
  },

  contains: (item, sub, variable=item) => {
    const val = validate.req.body[item];
    checkAndPush(!val.includes(sub), `${variable} must include ${sub}`, validate);
    return options(validate);
  },

  isEnum: (item, array, variable=item) => {
    const val = validate.req.body[item];
  
    checkAndPush(
      val && !array.includes(val),
      `${variable} must be be one of these: ${array}`,
      validate
    );
    return options(validate);
  },

  isUUID: (item, variable=item) => {
    const uuidTest = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    const val = validate.req.body[item];
    checkAndPush(
      val && !uuidTest.test(val),
      `${variable} must be a UUID`,
      validate
    );
    return options(validate);
  },
  isDatePast: (date, variable=date, compare = new Date()) => {
    checkPast(date, compare, variable, validate, true);
    return options(validate);
  },

  isDateFuture: (date, variable=date, compare = new Date()) => {
    checkPast(date, compare, variable, validate, false);
  return options(validate);
},

  check: () => {
    if (validate.errors.length > 0) {

      if(validate.messageFormat.data){
        validate.messageFormat.data.errors = validate.errors;
    } else {
      validate.messageFormat.errors = validate.errors;
    }
      return validate.res.status(validate.status).send(validate.messageFormat);
    }
    return validate.next();
  },
});

const validate = (req, res, next, status=400, messageFormat = {
  errors: null,
  message: 'Invalid Parameter(s)',
  status: 'error'}) => options({
  req, res, next, errors: [], status, messageFormat
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

const checkPast = (date, compare, variable, validate, check=false) => {
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