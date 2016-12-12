const Register = require('./Register').Register,
      should = require('chai').should();

describe('Register', () => {
    describe('constructor', () => {
        it('should create register with value of 0', () => {
            let register = new Register();
            register.value.should.equal(0);
        });
    });

    describe('inc', () => {
        it('should increment register value by 1', () => {
            let register = new Register();
            register.inc();
            register.value.should.equal(1);
        });
    });

    describe('dec', () => {
        it('should decrement register value by 1', () => {
            let register = new Register();
            register.dec();
            register.value.should.equal(-1);
        });
    });

    describe('set', () => {
        it('should set register to value', () => {
            let register = new Register();
            register.set(5);
            register.value.should.equal(5);
        });
    });
});