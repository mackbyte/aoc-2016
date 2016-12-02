class Key {
    constructor(number) {
        this.number = number;
        this.neighbours = {};
    }

    setNeighbours(neighbours) {
        this.neighbours = neighbours;
    }

    getNeighbour(direction) {
        return this.neighbours[direction] || this.number;
    }
}

module.exports = {
    Key
};