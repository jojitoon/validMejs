import { expect } from 'chai';
import { middleware, customMiddleware } from '../src';

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
        url: 'https://google.com'
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
                                         message: "Invalid Parameters"
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
                                         message: "Invalid Parameters"
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
                                         message: "Invalid Parameters"
                                        }
                                });
    });
});

describe('middleware test', () => {
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
                                         message: "Invalid Parameters"
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
                                         message: "Invalid Parameters"
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
                                         message: "Invalid Parameters"
                                        }
                                });
    });
});