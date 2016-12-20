const Range = require('./Range').Range;

class Ranges {
    constructor(list) {
        this.list = list.map(range => Range.fromString(range));
    }

    sort(list = this.list) {
        return list.sort((rangeA, rangeB) => rangeA.min - rangeB.min);
    }

    merge(list = this.list) {
        let sorted = this.sort(list),
            merged = [];

        while(sorted.length > 0) {
            let range = sorted.shift(),
                didMerge = false;

            sorted.forEach((other, idx) => {
                if(range.inRange(other.min)) {
                    sorted.push(new Range(range.min, Math.max(range.max, other.max)));
                    sorted.splice(idx, 1);
                    didMerge = true;
                }
            });

            if(!didMerge) {
                merged.push(range);
            }
        }

        if(merged.some((range, index) => merged.reduce((inRange, other, otherIndex) => inRange || (index !== otherIndex && range.inRange(other.min)), false))) {
            return this.merge(merged);
        }

        return this.sort(merged);
    }

    find() {
        const ranges = this.merge();
        let i = 0,
            lowest = 0;

        for(let i = 0; i < ranges.length; i++) {
            if(ranges[i].inRange(lowest)) {
                lowest = ranges[i].max+1;
            }
        }

        return lowest;
    }
}

module.exports = {
    Ranges
};