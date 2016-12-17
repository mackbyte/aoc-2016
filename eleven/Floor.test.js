const Floor = require('./Floor').Floor,
    Item = require('./Item').Item,
    should = require('chai').should();

describe('Floor', () => {
    describe('constructor', () => {
        it('create floor with no items by default', () => {
            let floor = new Floor();
            floor.items.should.deep.equal([]);
        });

        it('should be able to create floor with items', () => {
            let floor = new Floor([
                new Item('microchip', 'cobalt'),
                new Item('generator', 'promethium')
            ]);
            floor.items.should.deep.equal([
                {type: 'microchip', material: 'cobalt'},
                {type: 'generator', material: 'promethium'}
            ]);
        });
    });

    describe('addItem', () => {
        it('should add item to list of items on floor', () => {
            let floor = new Floor();
            floor.addItem(new Item('microchip', 'cobalt'));
            floor.items.should.deep.equal([{type: 'microchip', material: 'cobalt'}]);
        });
    });

    describe('takeItem', () => {
        it('should take item from floor', () => {
            let floor = new Floor([new Item('microchip', 'promethium')]);
            let item = floor.takeItem('microchip', 'promethium');
            item.should.deep.equal({type: 'microchip', material: 'promethium'});
            floor.items.should.deep.equal([]);
        });

        it('should take item from floor when there are multiple items', () => {
            let floor = new Floor([new Item('microchip', 'promethium'), new Item('microchip', 'cobalt')]);
            let item = floor.takeItem('microchip', 'cobalt');
            item.should.deep.equal({type: 'microchip', material: 'cobalt'});
            floor.items.should.deep.equal([{type: 'microchip', material: 'promethium'}]);
        });

        it('should return nothing if item not on floor', () => {
            let floor = new Floor([new Item('microchip', 'promethium'), new Item('microchip', 'cobalt')]);
            let item = floor.takeItem('generator', 'cobalt');
            should.not.exist(item);
            floor.items.should.deep.equal([
                {type: 'microchip', material: 'promethium'},
                {type: 'microchip', material: 'cobalt'}
            ]);
        });
    });

    describe('canAdd', () => {
        it('should allow item if there is no other item and item is microchip', () => {
            let floor = new Floor([]);
            floor.canAdd([new Item('microchip', 'madeupium')]).should.equal(true);
        });

        it('should allow item there is no other item and item is generator', () => {
            let floor = new Floor([]);
            floor.canAdd([new Item('generator', 'madeupium')]).should.equal(true);
        });

        it('should allow microchip if its generator is already present', () => {
            let floor = new Floor([new Item('generator', 'madeupium')]);
            floor.canAdd([new Item('microchip', 'madeupium')]).should.equal(true);
        });

        it('should allow microchip if there are only other chips', () => {
            let floor = new Floor([new Item('microchip', 'madeupium')]);
            floor.canAdd([new Item('microchip', 'fakeioso')]).should.equal(true);
        });

        it('should allow generator if there are only other generators', () => {
            let floor = new Floor([new Item('generator', 'madeupium')]);
            floor.canAdd([new Item('generator', 'fakeioso')]).should.equal(true);
        });

        it('should allow microchip if there is a compatible generator', () => {
            let floor = new Floor([new Item('microchip', 'madeupium')]);
            floor.canAdd([new Item('generator', 'madeupium')]).should.equal(true);
        });

        it('should allow generator if there is a compatible microchip', () => {
            let floor = new Floor([new Item('generator', 'something')]);
            floor.canAdd([new Item('microchip', 'something')]).should.equal(true);
        });

        it('should not allow microchip if there is a non compatible generator', () => {
            let floor = new Floor([new Item('generator', 'something')]);
            floor.canAdd([new Item('microchip', 'somethingElse')]).should.equal(false);
        });

        it('should not allow generator if there is a non compatible microchip', () => {
            let floor = new Floor([new Item('microchip', 'something')]);
            floor.canAdd([new Item('generator', 'somethingElse')]).should.equal(false);
        });
        
        it('should allow pair to move to empty floor', () => {
            let floor = new Floor();
            floor.canAdd([new Item('generator', 'somethingElse'), new Item('microchip', 'somethingElse')]).should.equal(true);
        });

        it('should allow pair if there are other pairs', () => {
            let floor = new Floor([new Item('generator', 'something'), new Item('microchip', 'something')]);
            floor.canAdd([new Item('generator', 'somethingElse'), new Item('microchip', 'somethingElse')]).should.equal(true);
        });

        it('should allow pair if there are only generators', () => {
            let floor = new Floor([new Item('generator', 'something')]);
            floor.canAdd([new Item('generator', 'somethingElse'), new Item('microchip', 'somethingElse')]).should.equal(true);
        });

        it('should not allow pair if there are other microchips generators', () => {
            let floor = new Floor([new Item('microchip', 'something')]);
            floor.canAdd([new Item('generator', 'somethingElse'), new Item('microchip', 'somethingElse')]).should.equal(false);
        });
    });

    describe('canTake', () => {
        it('should return true if item can be safely removed from the floor', () => {
            let floor = new Floor([new Item('generator', 'hydrogen'), new Item('microchip', 'hydrogen'), new Item('generator', 'lithium')]);
            floor.canTake([new Item('generator', 'lithium')]).should.equal(true);
        });

        it('should return true if all items can be safely removed from the floor', () => {
            let floor = new Floor([new Item('generator', 'hydrogen'), new Item('microchip', 'hydrogen'), new Item('generator', 'lithium')]);
            floor.canTake([new Item('generator', 'hydrogen'), new Item('microchip', 'hydrogen')]).should.equal(true);
        });

        it('should return false if item cannot be safely removed from the floor', () => {
            let floor = new Floor([new Item('generator', 'hydrogen'), new Item('microchip', 'hydrogen'), new Item('generator', 'lithium')]);
            floor.canTake([new Item('generator', 'hydrogen')]).should.equal(false);
        });

        it('should return false if all items cannot be safely removed from the floor', () => {
            let floor = new Floor([
                new Item('generator', 'hydrogen'),
                new Item('microchip', 'hydrogen'),
                new Item('generator', 'lithium'),
                new Item('microchip', 'lithium'),
                new Item('generator', 'cobalt'),
                new Item('microchip', 'cobalt')
            ]);
            floor.canTake([new Item('generator', 'hydrogen'), new Item('generator', 'lithium')]).should.equal(false);
        });

        it('should return true if floor has pairs left', () => {
            let floor = new Floor([
                new Item('generator', 'hydrogen'),
                new Item('microchip', 'hydrogen'),
                new Item('generator', 'lithium'),
                new Item('microchip', 'lithium'),
                new Item('generator', 'cobalt'),
                new Item('microchip', 'cobalt')
            ]);
            floor.canTake([new Item('generator', 'hydrogen'), new Item('microchip', 'hydrogen')]).should.equal(true);
        });
    });

    describe('pairs', () => {
        it('should return pairs of items', () => {
            let floor = new Floor();
            let items = [new Item('microchip', 'promethium'), new Item('microchip', 'curium'), new Item('generator', 'curium')];
            let pairs = floor.pairs(items);
            pairs.should.deep.equal([new Item('microchip', 'curium'), new Item('generator', 'curium')]);
        });
    });

    describe('print', () => {
        it('should print state of floor', () => {
            let floor = new Floor([new Item('microchip', 'promethium'), new Item('microchip', 'cobalt'), new Item('generator', 'curium')]);
            floor.print().should.equal('CO-M, CU-G, PR-M');
        });
    });

    describe('equal', () => {
        it('should be equal if floor has the same items', () => {
            let floor1 = new Floor([new Item('microchip', 'promethium'), new Item('microchip', 'cobalt')]);
            let floor2 = new Floor([new Item('microchip', 'promethium'), new Item('microchip', 'cobalt')]);
            floor1.equal(floor2).should.equal(true);
        });

        it('should not be equal if does not have the same items', () => {
            let floor1 = new Floor([new Item('generator', 'promethium'), new Item('microchip', 'cobalt')]);
            let floor2 = new Floor([new Item('microchip', 'promethium'), new Item('microchip', 'cobalt')]);
            floor1.equal(floor2).should.equal(false);
        });
    });

    describe('hasItem', () => {
        it('should return true if it has an item', () => {
            let floor = new Floor([new Item('microchip', 'promethium'), new Item('microchip', 'cobalt')]);
            floor.hasItem('microchip', 'promethium').should.equal(true);
        });

        it('should return false if it does not have an item', () => {
            let floor = new Floor([new Item('microchip', 'promethium'), new Item('microchip', 'cobalt')]);
            floor.hasItem('microchip', 'curium').should.equal(false);
        });
    });
});