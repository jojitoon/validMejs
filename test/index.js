import { expect } from 'chai';
import { middleware, customMiddleware, validate} from '../src';

const options = item => ({
    status: (status) => {
        item.status = status;
        return options(item);
    },

    send: (value) => {
        item.body = value;
        return item;
    }
})

const valid = {valid: true, errors: []};
const res = options({});
const req = {
    body: {
        email: 'email@example.com',
        myMail: 'email@example.com',
        text: 'something',
        myDate: '10-21-2018',
        myDat: '10-21-2021',
        date: '11-12-2018',
        amI: true,
        num: 3,
        password: 'Password@1',
        pass: 'pass',
        phone: '07037881413',
        url: 'https://google.com',
        uuid: '5808bee3-8b70-42be-9684-89c9450b4154'
    }
};

const next = () => true;

describe('initial test', () => {
    it('it is trivial', () => {
        expect(true).to.equal(true);
    });

    it('it is trivial 2', () => {
        expect(res.status(200).send('i am here')).to.eql({ 
                                                                status: 200, 
                                                                body: 'i am here' 
                                                            });
    });
});

describe('middleware test', () => {
    it('it should validate the req', () => {
        const validator = middleware(req, res, next)
                            .hasElement('email')
                            .isEmail()
                            .isUrl('url')
                            .isDate('date')
                            .hasElement('text')
                            .check();


        expect(validator).to.eql(true);
    });

    it('it should validate the req to be wrong', () => {
        const validator = middleware(req, res, next)
                            .hasElement('email')
                            .hasElement('tex')
                            .hasSpaces('text')
                            .isString('text')
                            .isPhoneNumber('phone')
                            .isDateFormat('date')
                            .isBool('date')
                            .isLength('text',2,'check')
                            .check();


        expect(validator).to.eql({ 
                                    status: 400, 
                                    body: {
                                        errors: [
                                           "tex is required",
                                           "date must be a boolean"
                                         ],
                                         message: "Invalid Parameter(s)",
                                         status: "error"
                                        }
                                });
    });

    it('it should validate the req to have wrong date', () => {
        const validator = middleware(req, res, next)
                            .hasElement('email')
                            .hasElement('tex')
                            .isDatePast('myDate', 'My Date')
                            .isDateFuture('myDat', 'My Date')
                            .isPassword('password','Password',8,true,true,true)
                            .check();


        expect(validator).to.eql({ 
                                    status: 400, 
                                    body: {
                                        errors: [
                                           "tex is required",
                                           `My Date is an invalid date. Must not be later than ${new Date().toDateString()}`,
                                           `My Date is an invalid date. Must not be further than ${new Date().toDateString()}`
                                         ],
                                         message: "Invalid Parameter(s)",
                                         status: "error"
                                        }
                                });
    });

    it('it should validate the req to have wrong params', () => {
        const validator = middleware(req, res, next)
                            .hasElement('email')
                            .hasElement('tex')
                            .isBool('amI')
                            .isNumber('num')
                            .isEmail()
                            .check();


        expect(validator).to.eql({ 
                                    status: 400, 
                                    body: {
                                        errors: [
                                           "tex is required",
                                         ],
                                         message: "Invalid Parameter(s)",
                                         status: "error"
                                        }
                                });
    });

    it('it should validate the req to have wrong params', () => {
        const validator = middleware(req, res, next)
        .contains('email', '@gmail.com')
        .isUUID('uuid')
        .isEnum('pass', ['password', 'more'])
        .check();


        expect(validator).to.eql({ 
                                    status: 400, 
                                    body: {
                                        errors: [
                                            "email must include @gmail.com",
                                            "pass must be be one of these: password,more"    
                                         ],
                                         message: "Invalid Parameter(s)",
                                         status: "error"
                                        }
                                });
    });
});

describe('custom middleware test', () => {
    it('it should validate the req', () => {
        const validator = customMiddleware(req, res, next)
                            .hasElement('email')
                            .isEmail()
                            .isUrl('url')
                            .isDate('date')
                            .hasElement('text')
                            .check();


        expect(validator).to.eql(true);
    });

    it('it should validate the req to be wrong', () => {
        const validator = customMiddleware(req, res, next)
                            .hasElement('email')
                            .hasElement('tex')
                            .hasSpaces('text')
                            .isString('text')
                            .isPhoneNumber('phone')
                            .isDateFormat('date')
                            .isBool('date')
                            .isLength('text',2,'check')
                            .check();


        expect(validator).to.eql({ 
                                    status: 400, 
                                    body: {
                                        errors: [
                                           "tex is required",
                                           "date must be a boolean"
                                         ],
                                         message: "Invalid Parameter(s)",
                                         status: "error"
                                        }
                                });
    });

    it('it should validate the req to have wrong date', () => {
        const validator = customMiddleware(req, res, next)
                            .hasElement('email')
                            .hasElement('tex')
                            .isDatePast('myDate')
                            .isDateFuture('myDat',new Date() ,'not making sense abi !!!')
                            .isPassword('pass',18,true,true,true, {
                                length: 'length is bad',
                                upper: 'no upper',
                                number:  'no number',
                                special: 'no special'
                                })
                            .check();


        expect(validator).to.eql({ 
                                    status: 400, 
                                    body: {
                                        errors: [
                                           "tex is required",
                                           `myDate is an invalid date. Must not be later than ${new Date().toDateString()}`,
                                           'not making sense abi !!!',
                                           'length is bad',
                                           'no upper',
                                           'no number',
                                           'no special'
                                         ],
                                         message: "Invalid Parameter(s)",
                                         status: "error"
                                        }
                                });
    });

    it('it should validate the req to have wrong params', () => {
        const validator = customMiddleware(req, res, next)
                            .hasElement('email')
                            .hasElement('tex')
                            .isBool('amI')
                            .isNumber('num')
                            .isEmail()
                            .check();


        expect(validator).to.eql({ 
                                    status: 400, 
                                    body: {
                                        errors: [
                                           "tex is required",
                                         ],
                                         message: "Invalid Parameter(s)",
                                         status: "error"
                                        }
                                });
    });

    it('it should validate the req to have wrong params', () => {
        const validator = customMiddleware(req, res, next)
        .contains('email', '@gmail.com')
        .isUUID('uuid')
        .isEnum('pass', ['password', 'more'])
        .check();


        expect(validator).to.eql({ 
                                    status: 400, 
                                    body: {
                                        errors: [
                                            "email must include @gmail.com",
                                            "pass must be be one of these: password,more"    
                                         ],
                                         message: "Invalid Parameter(s)",
                                         status: "error"
                                        }
                                });
    });
});

describe('validate test', () => {
    it('it should validate the req', () => {
        const validator = validate(req.body)
                            .hasElement('email')
                            .isEmail()
                            .isUrl('url')
                            .isDate('date')
                            .hasElement('text')
                            .check();


        expect(validator).to.eql(valid);
    });

    it('it should validate the req to be wrong', () => {
        const validator = validate(req.body)
                            .hasElement('email')
                            .hasElement('tex')
                            .hasSpaces('text')
                            .isString('text')
                            .isPhoneNumber('phone')
                            .isDateFormat('date')
                            .isBool('date')
                            .isLength('text',2,'check')
                            .check();


        expect(validator).to.eql({
            "errors": [
                "tex is required",
                "date must be a boolean"
            ],
            "valid": false });
    });

    it('it should validate the req to have wrong date', () => {
        const validator = validate(req.body)
                            .hasElement('email')
                            .hasElement('tex')
                            .isDatePast('myDate', 'My Date')
                            .isDateFuture('myDat', 'My Date')
                            .isPassword('password','Password',8,true,true,true)
                            .check();


        expect(validator).to.eql({ "errors": [
                                    "tex is required"
                                    ],
                                    "valid": false
                                });
    });

    it('it should validate the req to have wrong params', () => {
        const validator = validate(req.body)
                            .hasElement('email')
                            .hasElement('tex')
                            .isBool('amI')
                            .isNumber('num')
                            .isEmail()
                            .check();

        const { valid } = validator;
        expect(validator).to.eql({ "errors": [
                                        "tex is required"
                                        ],
                                        "valid": false
                                    });
        expect(valid).to.eql(false);
    });

    it('it should validate the req to have wrong params', () => {
        const validator = validate(req.body)
                            .contains('email', '@gmail.com')
                            .isUUID('uuid')
                            .isEnum('pass', ['password', 'more'])
                            .check();

        const { valid } = validator;
        expect(validator).to.eql({ "errors": [
                                        "email must include @gmail.com",
                                        "pass must be be one of these: password,more"
                                        ],
                                        "valid": false
                                    });
        expect(valid).to.eql(false);
    });
});