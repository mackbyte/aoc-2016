class Register {
    constructor() {
        this.value = 0;
    }

    inc() {
        this.value++;
    }

    dec() {
        this.value--;
    }

    set(value) {
        this.value = value;
    }
}

module.exports = {
    Register
};