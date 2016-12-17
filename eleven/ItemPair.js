class ItemPair {
    constructor(left, right) {
        this.left = left;
        this.right = right;
    }

    equal(other) {
        return (this.left === other.left && this.right === other.right) || (this.left === other.right && this.right === other.left);
    }
}

module.exports = {
    ItemPair
};