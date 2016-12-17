class Floor {
    constructor(items = []) {
        this.items = items;
    }

    hasItem(type, material) {
        return this.items.findIndex(item => item.type === type && item.material === material) > -1;
    }

    addItem(item) {
        this.items.push(item);
    }

    takeItem(type, material) {
        let foundItemIndex = this.items.findIndex(item => item.type === type && item.material === material);
        if(foundItemIndex > -1) {
            return this.items.splice(foundItemIndex, 1)[0];
        }
    }

    pairs(items) {
        let microchips = items.filter(item => item.type === 'microchip'),
            generators = items.filter(item => item.type === 'generator');

        let pairedChips = microchips.filter(chip => {
            return generators.some(generator => generator.material === chip.material)
        });

        return items.filter(item => {
            return pairedChips.some(chip => item.material === chip.material)
        });
    }

    canAdd(items) {
        if(this.items.length === 0) {return true}

        let allItems = this.items.slice(0).concat(items),
            pairs = this.pairs(allItems);

        if(allItems.length === pairs.length) {return true}

        let notPaired = allItems.filter(item => !pairs.some(paired => item.equal(paired))),
            containsGenerator = allItems.some(item => item.type === 'generator'),
            containsMicrochip = notPaired.some(item => item.type === 'microchip');

        return !(containsGenerator && containsMicrochip);
    }

    canTake(items) {
        let itemsLeft = this.items.filter(item => !items.some(removeItem => removeItem.equal(item))),
            pairs = this.pairs(itemsLeft),
            notPaired = itemsLeft.filter(item => !pairs.some(paired => item.equal(paired)));

        return pairs === itemsLeft || notPaired.reduce((current, item) => current && !itemsLeft.some(left => !left.compatible(item)), true);
    }

    print() {
        return this.items.map(item => {
            return item.print();
        }).sort().join(', ');
    }

    equal(other) {
        if(this.items.length !== other.items.length) {
            return false
        } else {
            let equal = true;
            this.items.forEach(item => {
                if(!other.items.some(it => it.equal(item))) {
                    equal = false;
                }
            });
            return equal;
        }
    }
}

module.exports = {
    Floor
};