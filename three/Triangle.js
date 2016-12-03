class Triangle {
    constructor(dimensions) {
        this.dimensions = dimensions.map(num=> parseInt(num));
    }

    isValid() {
        let max = Math.max(...this.dimensions);
        let otherSides = this.dimensions.filter(num => num != max);

        if(otherSides.length < 2) {otherSides.push(max)}

        return max < otherSides[0] + otherSides[1];
    }
}

module.exports = {
    Triangle
};