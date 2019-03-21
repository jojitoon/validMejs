import isEmail from 'validator/lib/isEmail';

const options = validate => ({
  
  isEmail: (name='email', message=`${name.charAt(0).toUpperCase() + name.slice(1)} must be a valid email`) => {
    checkAndPush(
      validate.req.body[name] && !isEmail(validate.req.body[name]),
      message,
      validate );
    return options(validate);
  },

  hasElement: (item, message=`${item} is required`) => {
    checkAndPush(
      !validate.req.body[item],
      message,
      validate
      );
      return options(validate);
  },

  isLength: (item, value, message=`${item} must have at least a length of ${value}`) => {
    checkAndPush(
      validate.req.body[item] && validate.req.body[item].replace(/\s/g, '').length < value,
      message,
      validate
    );
    return options(validate);
  },

  hasSpaces: (item, message=`${item} must not have spaces`)=> {
    checkAndPush(
      validate.req.body[item] && /\s/.test(validate.req.body[item]),
      message,
      validate
    );
    return options(validate);
  },

  isBool: (item, message=`${item} must be a boolean`) => {
    checkTypeOf(validate.req.body[item], 'boolean', message, validate);
    return options(validate)
  },

  isNumber: (item, message=`${item} must be a number`) => {
    checkAndPush(
      typeof validate.req.body[item] !== 'number' || isNaN(validate.req.body[item]),
      message,
      validate
    );
    return options(validate);
  },

  isString: (item, message=`${item} must be a string`) => {
    checkTypeOf(validate.req.body[item], 'string', message, validate);
    return options(validate)
  },

  isPassword: (item, length=4, hasUpper=false, hasNumber=false, hasSpecial=false, message={
    length: `${item} must have a minimum length of ${length}`,
    upper: `${item} must have contain an uppercase letter`,
    number:  `${item} must have contain a number`,
    special: `${item} must have contain an special character`
  }) => {
    const upper = /[A-Z]/g;
    const num = /[0-9]/g;
    const special = /[!@#$%^&*(),.?":{}|<>]/g;
    checkAndPush(validate.req.body[item] && validate.req.body[item].length < length, message.length, validate);
    
    if(hasUpper){
      checkAndPush(validate.req.body[item] && !upper.test(validate.req.body[item]), message.upper, validate);
    }
    if(hasNumber){
      checkAndPush(validate.req.body[item] && !num.test(validate.req.body[item]), message.number, validate);
    }
    if(hasSpecial){
      checkAndPush(validate.req.body[item] && !special.test(validate.req.body[item]), message.special , validate);
    }
    return options(validate)
  },

  isPhoneNumber: (item, length=11, message=`${item} must be a valid phone number`) => {
    const pattern = `^(([+]{1}[0-9]{2}|0)[0-9]{${length-1}})$`
    const phone = new RegExp(pattern, 'g');

    checkAndPush(
       validate.req.body[item] && !phone.test(validate.req.body[item]), 
       message, validate);
    return options(validate)  
  },

  isDateFormat: (item, message=`${item} must be a valid date`) => {
  const date = /^((0?[13578]|10|12)(-|\/)(([1-9])|(0[1-9])|([12])([0-9]?)|(3[01]?))(-|\/)((19)([2-9])(\d{1})|(20)([01])(\d{1})|([8901])(\d{1}))|(0?[2469]|11)(-|\/)(([1-9])|(0[1-9])|([12])([0-9]?)|(3[0]?))(-|\/)((19)([2-9])(\d{1})|(20)([01])(\d{1})|([8901])(\d{1})))$/g;
    
     checkAndPush(
       validate.req.body[item] && !date.test(validate.req.body[item]), 
       message, validate);
    return options(validate)
  },

  isUrl: (item, message=`${item} must be a valid URL`) => {
    const url = /(http[s]?:\/\/)?[^\s(["<,>]*\.[^\s[",><]*/igm;

     checkAndPush(
       validate.req.body[item] && !url.test(validate.req.body[item]), 
       message, validate);
    return options(validate)
  },

  isDate: (item, message=`${item} must be a date`) => {
      const date = new Date(validate.req.body[item]);
      checkAndPush(date.toDateString() === 'Invalid Date', message, validate);
      return options(validate);
  },

  contains: (item, sub, message=`${item} must include ${sub}`) => {
    const val = validate.req.body[item];
    checkAndPush(val && !val.includes(sub), message, validate);
    return options(validate);
  },

  isEnum: (item, array, message=`${item} must be be one of these: ${array}`) => {
    const val = validate.req.body[item];
  
    checkAndPush(
      val && !array.includes(val),
      message,
      validate
    );
    return options(validate);
  },

  isUUID: (item, message= `${item} must be a UUID`) => {
    const uuidTest = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    const val = validate.req.body[item];
    checkAndPush(
      val && !uuidTest.test(val),
      message,
      validate
    );
    return options(validate);
  },

  isDatePast: (date, compare = new Date(), message=`${date} is an invalid date. Must not be later than ${new Date().toDateString()}`) => {
    checkPast(date, compare, validate, true, message);
    return options(validate);
  },

  isDateFuture: (date, compare = new Date(), message=`${date} is an invalid date. Must not be further than ${new Date().toDateString()}`) => {
    checkPast(date, compare, validate, false, message);
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

const checkPast = (date, compare, validate, check=false, message) => {
    const checkDate = new Date(validate.req.body[date]);
    const today = new Date(compare);

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