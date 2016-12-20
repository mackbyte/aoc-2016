const Elves = require('./Elves').Elves,
      elves = new Elves(3005290);

console.log(`Seat: ${elves.solve()}`);