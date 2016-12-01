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
        let visits = [];
        let BreakException = {};
        try {
            instructions.forEach(instruction => {
                let [direction, ...value] = instruction;
                value = value.join('');
                let facing = this.position.turn(direction);

                let move = facing.multiplier.map(pos => pos * value);
                var nextCoordinate = this.coordinate.add(new Coordinate(move[0], move[1]));

                if(this.dontRevisit) {
                    let route = this.coordinate.route(nextCoordinate);
                    route.forEach(point => {
                        visits.push(point);
                        this.coordinate = point;
                        if(visits.filter(loc => loc.equals(point)).length > 1) {
                            throw BreakException;
                        }
                    })
                } else {
                    this.coordinate = nextCoordinate;
                }
            });
        } catch (e) {}
    }
}

module.exports = {
    Navigator
};