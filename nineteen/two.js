const Elves = require('./Elves').Elves,
      elves = new Elves(3005290, true);

console.log(`Seat: ${elves.solve2()}`);