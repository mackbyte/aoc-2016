const Position = require('./Position').Position,
      Coordinate = require('./Coordinate').Coordinate;

class Navigator {
    constructor(dontRevisit) {
        this.coordinate = new Coordinate(0, 0);
        this.position = new Position();
        this.dontRevisit = dontRevisit;
    }

    getCoordinates() {
        return this.coordinate;
    }

    navigate(instructions) {
        let visits = [new Coordinate(0, 0)];
        loop: for(let instruction of instructions) {
            const direction = instruction.slice(0, 1),
                value = instruction.slice(1),
                facing = this.position.turn(direction),
                move = facing.multiplier.map(pos => pos * value),
                nextCoordinate = this.coordinate.add(new Coordinate(move[0], move[1]));

            if(this.dontRevisit) {
                while (!this.coordinate.equals(nextCoordinate)) {
                    this.coordinate = this.coordinate.add(new Coordinate(facing.multiplier[0], facing.multiplier[1]));
                    visits.push(this.coordinate);
                    if(visits.filter(loc => loc.equals(this.coordinate)).length > 1) {
                        break loop;
                    }
                }
            } else {
                this.coordinate = nextCoordinate;
            }
        }
    }
}

module.exports = {
    Navigator
};