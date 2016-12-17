const fs = require("fs"),
      Simulation = require('./Simulation').Simulation;

fs.readFile("eleven/input.txt", "utf8", function(err, data) {
    if(err) {return console.log(err);}

    const simulation = new Simulation();
    simulation.initialise([
        'The first floor contains an elerium generator, an elerium-compatible microchip, a dilithium generator, a dilithium-compatible microchip, a promethium generator, and a promethium-compatible microchip.',
        'The second floor contains a cobalt generator, a curium generator, a ruthenium generator, and a plutonium generator.',
        'The third floor contains a cobalt-compatible microchip, a curium-compatible microchip, a ruthenium-compatible microchip, and a plutonium-compatible microchip.',
        'The fourth floor contains nothing relevant.'
    ]);
    let result = simulation.solve();

    result.solution.forEach(step => console.log(step.print()));
    console.log(`Steps: ${result.steps}`);
});