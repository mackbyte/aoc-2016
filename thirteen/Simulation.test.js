const Simulation = require('./Simulation').Simulation,
      Coordinate = require('./Coordinate').Coordinate,
      should = require('chai').should();

describe('Simulation', () => {
    describe('solve', () => {
        it('should solve the test simulation in 11 moves', () => {
            let simulation = new Simulation(new Coordinate(1, 1), new Coordinate(7, 4), 10);
            simulation.solve().steps.should.equal(11);
        });
    });
});