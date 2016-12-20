class Elves {
    constructor(number) {
        this.list = [];
        for(let i = 0; i < number; i++) {
            this.list.push(i);
        }
    }

    solve() {
        let filtered = this.list.slice(0);

        while(filtered.length > 1) {
            let odd = filtered.length % 2 === 1;
            filtered = filtered.filter((val, index) => index % 2 === 0);
            if(odd) {filtered.shift()}
        }
        return filtered[0]+1;
    }
}

module.exports = {
    Elves
};