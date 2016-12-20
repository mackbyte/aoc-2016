const rangeRegex = /(\d+)-(\d+)/;

class Range {
    constructor(from, to) {
        this.min = Math.min(from, to);
        this.max = Math.max(from, to)
    }

    static fromString(string) {
        let match = rangeRegex.exec(string);
        return new Range(match[1], match[2]);
    }

    inRange(number) {
        return this.min <= number && number <= this.max;
    }
}

module.exports = {
    Range
};