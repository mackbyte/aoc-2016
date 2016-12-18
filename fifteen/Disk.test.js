const Disk = require('./Disk').Disk,
    should = require('chai').should();

describe('Disk', () => {
    describe('constructor', () => {
        it('should create disk with total slots, starting position and time', () => {
            let disk = new Disk(5, 4, 0);
            disk.slots.should.equal(5);
            disk.position.should.equal(4);
            disk.time.should.equal(0);
        });
    });

    describe('isOpen', () => {
        it('should return true if disk is open at a particular time', () => {
            let disk = new Disk(5, 4, 0);
            disk.isOpen(1).should.equal(true);
        });

        it('should reutnr false if disk is closed at particular time', () => {
            let disk = new Disk(17, 8, 0);
            disk.isOpen(10).should.equal(false);
        });
    });

    describe('create', () => {
        it('should create disk from string', () => {
            let disk = Disk.create('Disc #1 has 5 positions; at time=0, it is at position 4.');
            disk.slots.should.equal(5);
            disk.position.should.equal(4);
            disk.time.should.equal(0);
        });
    });
});