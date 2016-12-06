class Messages {
    constructor() {
        this.messageColumns = new Map();
    }

    loadMessages(messages) {
        messages.forEach(message => {
            message.split('').forEach((char, idx) => {
                this.messageColumns.set(idx, this.messageColumns.get(idx) ? this.messageColumns.get(idx) + char : char)
            });
        });
    }

    static mostCommonCharacter(string) {
        let charMap = new Map();

        for(let char of string) {
            charMap.set(char, charMap.get(char)+1 || 1)
        }

        return Array.from(charMap)
            .sort((a, b) => {
                let dif = a[1] - b[1];

                if(dif !== 0) {return dif}

                return a[0] < b[0] ? 1 : -1;
            })
            .slice(-1)[0][0];
    }

    correctMessage() {
        let message = '';

        for(let [,column] of this.messageColumns) {
            message += Messages.mostCommonCharacter(column);
        }

        return message;
    }
}

module.exports = {
    Messages
};