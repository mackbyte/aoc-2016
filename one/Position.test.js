const Position = require('./Position').Position,
      should = require('chai').should();

describe('Position', () => {
    let position;

    beforeEach(() => {
        position = new Position();
    });

    describe('Turn', () => {
        it('default to facing north', () => {
            position.getCurrentFacing().direction.should.equal('N');
        });

        it('should face east after turning right once', () => {
            position.turn('R');
            position.getCurrentFacing().direction.should.equal('E');
        });

        it('should face west after turning left once', () => {
            position.turn('L');
            position.getCurrentFacing().direction.should.equal('W');
        });

        it('should face south after turning left twice', () => {
            position.turn('R');
            position.turn('R');
            position.getCurrentFacing().direction.should.equal('S');
        });

        it('should face south after turning right twice', () => {
            position.turn('L');
            position.turn('L');
            position.getCurrentFacing().direction.should.equal('S');
        });

        it('should face north after turning right 4 times', () => {
            position.turn('R');
            position.turn('R');
            position.turn('R');
            position.turn('R');
            position.getCurrentFacing().direction.should.equal('N');
        });

        it('should face west after turning right 6 times and left twice', () => {
            position.turn('R');
            position.turn('R');
            position.turn('R');
            position.turn('R');
            position.turn('R');
            position.turn('R');
            position.turn('L');
            position.turn('L');
            position.getCurrentFacing().direction.should.equal('N');
        });
    });
});