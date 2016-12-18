const Room = require('./Room').Room,
      should = require('chai').should();

describe('Room', () => {
    describe('complete', () => {
        it('should get next value from 1', () => {
            let room = new Room();
            room.x = 3;
            room.y = 3;

            room.completed().should.equal(true);
        });
    });

    describe('getMoves', () => {
        it('should get possible moves based on current path', () => {
            let room = new Room('hijkl');
            room.getMoves().should.deep.equal(['D']);
        });
    });
});