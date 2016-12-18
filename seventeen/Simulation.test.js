const Simulation = require('./Simulation').Simulation,
      should = require('chai').should();

describe('Simulation', () => {
    describe('solve', () => {
        it('should get the shortest path from the test sample', () => {
            let simulation = new Simulation('ihgpwlah');
            simulation.solve().should.equal('DDRRRD');
        });

        it('should get the shortest path from the test sample, different passcode', () => {
            let simulation = new Simulation('kglvqrro');
            simulation.solve().should.equal('DDUDRLRRUDRD');
        });

        it('should get the shortest path from the test sample, another passcode', () => {
            let simulation = new Simulation('ulqzkmiv');
            simulation.solve().should.equal('DRURDRUDDLLDLUURRDULRLDUUDDDRR');
        });
    });

    describe('solveLongest', () => {
        it('should get the longest path from the test sample', () => {
            let simulation = new Simulation('ihgpwlah');
            simulation.solveLongest().should.equal(370);
        }).timeout(120000);

        it('should get the longest path from the test sample, different passcode', () => {
            let simulation = new Simulation('kglvqrro');
            simulation.solveLongest().should.equal(492);
        }).timeout(300000);

        it('should get the longest path from the test sample, another passcode', () => {
            let simulation = new Simulation('ulqzkmiv');
            simulation.solveLongest().should.equal(830);
        }).timeout(300000);
    });
});