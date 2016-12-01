const Position = require('./Position').Position,
      Coordinate = require('./Coordinate').Coordinate;

class Navigator {
    constructor() {
        this.coordinate = new Coordinate(0, 0);
        this.position = new Position();
    }

    getCoordinates() {
        return this.coordinate;
    }

    navigate(instructions) {
        instructions.forEach(instruction => {
            let [direction, ...value] = instruction;
            value = value.join('');
            let facing = this.position.turn(direction);

            let move = facing.multiplier.map(pos => pos * value);
            this.coordinate = this.coordinate.add(new Coordinate(move[0], move[1]));
        })
    }
}

module.exports = {
    Navigator
};