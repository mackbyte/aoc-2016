const Bot = require('./Bot').Bot,
      should = require('chai').should();

describe('Bot', () => {
    describe('constructor', () => {
        it('it should set initial value to carry', () => {
            let bot = new Bot(10);
            bot.carrying.should.deep.equal([10]);
        });
    });

    describe('carry', () => {
        it('should add value to carry', () => {
            let bot = new Bot(10);
            bot.carry(20);
            bot.carrying.should.deep.equal([10, 20]);
        });

        it('should add carry in order', () => {
            let bot = new Bot(20);
            bot.carry(10);
            bot.carrying.should.deep.equal([10, 20]);
        });
    });

    describe('getCarry', () => {
        it('should get low number that bot is carrying', () => {
            let bot = new Bot(10);
            bot.carry(20);
            bot.getCarry('low').should.equal(10);
        });

        it('should get high number that bot is carrying', () => {
            let bot = new Bot(10);
            bot.carry(20);
            bot.getCarry('high').should.equal(20);
        });

        it('should get low number that bot is carrying when there are more than two numbers', () => {
            let bot = new Bot(50);
            bot.carry(60);
            bot.carry(70);
            bot.getCarry('low').should.equal(50);
        });

        it('should get high number that bot is carrying when there are more than two numbers', () => {
            let bot = new Bot(50);
            bot.carry(60);
            bot.carry(70);
            bot.getCarry('high').should.equal(70);
        });

        it('should remove number when returning it', () => {
            let bot = new Bot(10);
            bot.carry(20);
            bot.getCarry('high').should.equal(20);
            bot.carrying.should.deep.equal([10]);
        });
    });

    describe('history', () => {
        it('should return history of comparisons', () => {
            let bot = new Bot(10);
            bot.carry(20);
            bot.getCarry('high').should.equal(20);
            bot.history.should.deep.equal([
                {values: [10]},
                {values: [10, 20]},
                {values: [10]},
            ]);
        });

        it('should return history of comparisons when there is more than one', () => {
            let bot = new Bot(10);
            bot.carry(20);
            bot.carry(30);
            bot.getCarry('high').should.equal(30);
            bot.getCarry('low').should.equal(10);

            bot.history.should.deep.equal([
                {values: [10]},
                {values: [10, 20]},
                {values: [10, 20, 30]},
                {values: [10, 20]},
                {values: [20]},
            ]);
        });
    });

    describe('inHistory', () => {
        it('should return true if number is in history', () => {
            let bot = new Bot(10);
            bot.carry(20);
            bot.carry(30);
            bot.getCarry('high').should.equal(30);
            bot.getCarry('low').should.equal(10);

            bot.inHistory(30).should.equal(true);
        });

        it('should return false if number is not in history', () => {
            let bot = new Bot(10);
            bot.carry(20);
            bot.carry(30);
            bot.getCarry('high').should.equal(30);
            bot.getCarry('low').should.equal(10);

            bot.inHistory(50).should.equal(false);
        });
    });

    describe('isReady', () => {
       it('should return ready if bot is carrying 2 values', () => {
           let bot = new Bot(10);
           bot.carry(20);

           bot.isReady().should.equal(true);
       });

        it('should return not ready if bot is carrying less than 2 values', () => {
            let bot = new Bot(10);

            bot.isReady().should.equal(false);
        });
    });
});