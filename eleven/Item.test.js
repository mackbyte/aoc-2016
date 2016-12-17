const Item = require('./Item').Item,
      should = require('chai').should();

describe('Item', () => {
    describe('constructor', () => {
        it('create item with type and material', () => {
            let item = new Item('chip', 'promethium');
            item.type.should.equal('chip');
            item.material.should.equal('promethium');
        });
    });

    describe('compatible', () => {
        it('item should be compatible if of different types but same material', () => {
            let item1 = new Item('chip', 'promethium');
            let item2 = new Item('generator', 'promethium');
            item1.compatible(item2).should.equal(true);
        });

        it('item should be not compatible if same type', () => {
            let item1 = new Item('chip', 'promethium');
            let item2 = new Item('chip', 'promethium');
            item1.compatible(item2).should.equal(true);
        });

        it('item should be not compatible if different types and different materials', () => {
            let item1 = new Item('chip', 'promethium');
            let item2 = new Item('generator', 'curium');
            item1.compatible(item2).should.equal(false);
        });
    });

    describe('equal', () => {
        it('should be equal if same type and material', () => {
            let item1 = new Item('chip', 'promethium');
            let item2 = new Item('chip', 'promethium');
            item1.equal(item2).should.equal(true);
        });

        it('should not be equal if different type', () => {
            let item1 = new Item('chip', 'promethium');
            let item2 = new Item('gen', 'promethium');
            item1.equal(item2).should.equal(false);
        });

        it('should not be equal if different material', () => {
            let item1 = new Item('chip', 'curium');
            let item2 = new Item('chip', 'promethium');
            item1.equal(item2).should.equal(false);
        });

        it('should not be equal if different type and material', () => {
            let item1 = new Item('chip', 'curium');
            let item2 = new Item('gen', 'promethium');
            item1.equal(item2).should.equal(false);
        });
    });

    describe('pair', () => {
        it('should return false if item is same type', () => {
            let item1 = new Item('chip', 'curium');
            let item2 = new Item('chip', 'curium');
            item1.pair(item2).should.equal(false);
        });

        it('should return false if item is different material', () => {
            let item1 = new Item('chip', 'curium');
            let item2 = new Item('gen', 'promethium');
            item1.pair(item2).should.equal(false);
        });

        it('should return true if item is different type but same material', () => {
            let item1 = new Item('chip', 'curium');
            let item2 = new Item('gen', 'curium');
            item1.pair(item2).should.equal(true);
        });
    });
});