class Coordinate {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(coordinate) {
        return new Coordinate(this.x + coordinate.x, this.y + coordinate.y);
    }

    route(coordinate) {
        let route = [];
        if(this.x === coordinate.x) {
            if(this.y < coordinate.y) {
                for(let y = this.y+1; y <= coordinate.y; y++) {
                    route.push(new Coordinate(this.x, y));
                }
            } else {
                for(let y = this.y-1; y >= coordinate.y; y--) {
                    route.push(new Coordinate(this.x, y));
                }
            }
        } else {
            if(this.x < coordinate.x) {
                for(let x = this.x+1; x <= coordinate.x; x++) {
                    route.push(new Coordinate(x, this.y));
                }
            } else {
                for(let x = this.x-1; x >= coordinate.x; x--) {
                    route.push(new Coordinate(x, this.y));
                }
            }
        }

        return route;
    }

    distanceFromOrigin() {
        return Math.abs(this.x) + Math.abs(this.y);
    }

    equals(coordinate) {
        return this.x === coordinate.x && this.y === coordinate.y;
    }
}

module.exports = {
    Coordinate
};