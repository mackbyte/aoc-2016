class Facing {
    constructor(direction, multiplier) {
        this.direction = direction;
        this.multiplier = multiplier;
    }
}

module.exports = {
    facings: [
        new Facing('N', [0, 1]),
        new Facing('E', [1, 0]),
        new Facing('S', [0, -1]),
        new Facing('W', [-1, 0])
    ]
};