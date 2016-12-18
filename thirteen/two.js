const Simulation = require('./Simulation').Simulation,
    Coordinate = require('./Coordinate').Coordinate,
    simulation = new Simulation(new Coordinate(1, 1), new Coordinate(-1, -1), 1358, 50),
    result = simulation.solve();

console.log(`Unique: ${result.unique}\n`);

