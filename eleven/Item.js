class Item {
    constructor(type, material) {
        this.type = type;
        this.material = material;
    }

    compatible(item) {
        return this.type === item.type || this.material === item.material;
    }

    equal(item) {
        return this.type === item.type && this.material === item.material;
    }

    pair(item) {
        return this.type !== item.type && this.material === item.material;
    }

    print() {
        return this.material.slice(0,2).toUpperCase() + '-' + this.type.slice(0, 1).toUpperCase();
    }

    clone() {
        return new Item(this.type, this.material);
    }
}

module.exports = {
    Item
};