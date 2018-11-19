import { expect } from 'chai';
import { middleware } from '../src';
import { isBoolean } from 'util';

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
        myDate: '2018-10-21',
        amI: true,
        num: 3
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
                            .hasElement('text')
                            .check();


        expect(validator).to.eql(true);
    });

    it('it should validate the req to be wrong', () => {
        const validator = middleware(req, res, next)
                            .hasElement('email')
                            .hasElement('tex')
                            .check();


        expect(validator).to.eql({ 
                                    status: 400, 
                                    body: {
                                        errors: [
                                           "tex is required"
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
                            .check();


        expect(validator).to.eql({ 
                                    status: 400, 
                                    body: {
                                        errors: [
                                           "tex is required",
                                           `My Date is an invalid date. Must not be later than ${new Date().toDateString()}`
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