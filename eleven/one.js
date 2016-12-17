const fs = require("fs"),
      Simulation = require('./Simulation').Simulation;

fs.readFile("eleven/input.txt", "utf8", function(err, data) {
    if(err) {return console.log(err);}

    const simulation = new Simulation();
    simulation.initialise(data.split('\n'));
    let result = simulation.solve(),
        solution = result.solution;

    console.log(solution[0].print());
    for(let i = 1; i < solution.length; i++) {
        console.log(solution[i].print(solution[i-1]));
    }
    console.log(`Steps: ${result.steps}`);
});