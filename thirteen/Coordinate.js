class Coordinate {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    equal(other) {
        return this.x === other.x && this.y === other.y;
    }
}

module.exports = {
    Coordinate
};