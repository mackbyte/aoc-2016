class Data {
    static next(current) {
        return current + '0' + current.split('').reverse().map(val => val === '1' ? '0' : '1').join('');
    }

    static fill(start, minSize) {
        let data = start;
        while(data.length < minSize) {
            data = Data.next(data);
        }
        return data;
    }

    static checksum(data) {
        let pairs = [];
        for(let i = 0; i < data.length-1; i+=2) {
            pairs.push(data.slice(i, i+2));
        }

        let checksum = pairs.map(pair => pair[0] === pair[1] ? '1' : '0').join('');
        if(checksum.length % 2 === 0) {
            return Data.checksum(checksum);
        }

        return checksum;
    }

    static solve(data, length) {
        let filled = Data.fill(data, length),
            trimmed = filled.slice(0, length);

        return Data.checksum(trimmed);
    }
}

module.exports = {
    Data
};