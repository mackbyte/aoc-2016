const Triangle = require('./Triangle').Triangle;

class TriangleReader {
    constructor() {}

    read(data) {
        return data.split('\n')
            .map(dimensions => dimensions.trim())
            .map(sides => sides.split(/ +/))
            .reduce((a, b) => a.concat(b))
            .slice(0, -1)
            .map(num => parseInt(num))
    }

    triangles(numbers) {
        function tris(nums) {
            let result = [];

            while(nums.length > 0) {
                result.push(new Triangle(nums.splice(0,3)));
            }

            return result;
        }

        const first = numbers.filter((num, index) => index % 3 === 0),
              second = numbers.filter((num, index) => index % 3 === 1),
              third = numbers.filter((num, index) => index % 3 === 2);

        return tris(first).concat(tris(second)).concat(tris(third));
    }
}

module.exports = {
    TriangleReader
};