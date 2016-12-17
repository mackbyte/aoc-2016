const Simulation = require('./Simulation').Simulation,
      Item = require('./Item').Item,
      should = require('chai').should();

describe('Simulation', () => {
    describe('constructor', () => {
        it('should create simulation with empty state graph', () => {
            let simulation = new Simulation();
            simulation.state.size().should.equal(0);
        });
    });

    describe('initialise', () => {
        it('should add items to floors based on command', () => {
            let simulation = new Simulation();
            simulation.initialise([
                'The first floor contains a hydrogen-compatible microchip and a lithium-compatible microchip.'
            ]);
            let building = simulation.state.getNode(0).data;

            building.floors.get(0).should.deep.equal({
                items: [
                    {type: 'microchip', material: 'hydrogen'},
                    {type: 'microchip', material: 'lithium'}
                ]
            });
        });

        it('should adds items to multiple floors based on commands', () => {
            let simulation = new Simulation();
            simulation.initialise([
                'The first floor contains a hydrogen-compatible microchip and a lithium-compatible microchip.',
                'The second floor contains a hydrogen generator.',
                'The third floor contains a lithium generator.',
                'The fourth floor contains nothing relevant.'
            ]);
            let building = simulation.state.getNode(0).data;

            building.floors.get(0).should.deep.equal({
                items: [
                    {type: 'microchip', material: 'hydrogen'},
                    {type: 'microchip', material: 'lithium'}
                ]
            });
            building.floors.get(1).should.deep.equal({
                items: [
                    {type: 'generator', material: 'hydrogen'}
                ]
            });

            building.floors.get(2).should.deep.equal({
                items: [
                    {type: 'generator', material: 'lithium'}
                ]
            });

            building.floors.get(3).should.deep.equal({
                items: []
            });
        });
    });

    describe('process', () => {
        it('process the first step', () => {
            let simulation = new Simulation();
            simulation.initialise([
                'The first floor contains a hydrogen-compatible microchip'
            ]);

            simulation.process(0);

            simulation.state.size().should.equal(2);
            let nextState = simulation.state.getNode(1).data;
            nextState.lift.should.equal(1);
            nextState.floors.get(0).should.deep.equal({items: []});
            nextState.floors.get(1).should.deep.equal({items: [new Item('microchip', 'hydrogen')]});
        });

        it('process the first two steps - should ignore states that already been used', () => {
            let simulation = new Simulation();
            simulation.initialise([
                'The first floor contains a hydrogen-compatible microchip'
            ]);

            simulation.process(0);
            simulation.process(1);

            simulation.state.size().should.equal(3);
            let nextState = simulation.state.getNode(2).data;
            nextState.lift.should.equal(2);
            nextState.floors.get(0).should.deep.equal({items: []});
            nextState.floors.get(1).should.deep.equal({items: []});
            nextState.floors.get(2).should.deep.equal({items: [new Item('microchip', 'hydrogen')]});
        });

        // it('process the node and return -1 if not finished', () => {
        //     let simulation = new Simulation();
        //     simulation.initialise([
        //         'The first floor contains a hydrogen-compatible microchip'
        //     ]);
        //
        //     simulation.process(0).should.equal(-1);
        // });

        // it('process the node and return node num if finished', () => {
        //     let simulation = new Simulation();
        //     simulation.initialise([
        //         'The first floor contains nothing relevant',
        //         'The second floor contains nothing relevant',
        //         'The third floor contains nothing relevant',
        //         'The fourth floor contains a hydrogen-compatible microchip'
        //     ]);
        //
        //     simulation.process(0).should.equal(0);
        // });
    });

    describe('solve', () => {
        it('should solve the test simulation in 3 moves', () => {
            let simulation = new Simulation();
            simulation.initialise([
                'The first floor contains a hydrogen-compatible microchip'
            ]);

            simulation.solve().steps.should.equal(3);
        });

        it('should solve the test simulation in 3 moves multiple items', () => {
            let simulation = new Simulation();
            simulation.initialise([
                'The first floor contains a hydrogen-compatible microchip',
                'The first floor contains a hydrogen generator'
            ]);

            simulation.solve().steps.should.equal(3);
        });

        it('should solve the test simulation in 11 moves', () => {
            let simulation = new Simulation();
            simulation.initialise([
                'The first floor contains a hydrogen-compatible microchip and a lithium-compatible microchip.',
                'The second floor contains a hydrogen generator.',
                'The third floor contains a lithium generator.',
                'The fourth floor contains nothing relevant.'
            ]);

            simulation.solve().steps.should.equal(11);
        });

        // Takes too long
        xit('should solve the sample in 33 moves', () => {
            let simulation = new Simulation();
            simulation.initialise([
                'The first floor contains a promethium generator and a promethium-compatible microchip.',
                'The second floor contains a cobalt generator, a curium generator, a ruthenium generator, and a plutonium generator.',
                'The third floor contains a cobalt-compatible microchip, a curium-compatible microchip, a ruthenium-compatible microchip, and a plutonium-compatible microchip.',
                'The fourth floor contains nothing relevant.'
            ]);

            simulation.solve().steps.should.equal(33);
        });

        // Takes too long
        xit('should solve the sample in 33 moves', () => {
            let simulation = new Simulation();
            simulation.initialise([
                'The first floor contains an elerium generator, an elerium-compatible microchip, a dilithium generator, a dilithium-compatible microchip, a promethium generator, and a promethium-compatible microchip.',
                'The second floor contains a cobalt generator, a curium generator, a ruthenium generator, and a plutonium generator.',
                'The third floor contains a cobalt-compatible microchip, a curium-compatible microchip, a ruthenium-compatible microchip, and a plutonium-compatible microchip.',
                'The fourth floor contains nothing relevant.'
            ]);
            simulation.solve().steps.should.equal(57);
        });
    });
});