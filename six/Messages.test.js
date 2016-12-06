const Messages = require('./Messages').Messages,
    should = require('chai').should();

describe('Messages', () => {
    describe('loadMessages', () => {
        let messages;

        beforeEach(() => {
            messages = new Messages();
        });

        it('should create messageColumns from array of messages', () => {
            messages.loadMessages([
                'abcde',
                'abcde',
                'abcde',
                'abcde',
                'abcde',
            ]);

            messages.messageColumns.get(0).should.equal('aaaaa');
            messages.messageColumns.get(1).should.equal('bbbbb');
            messages.messageColumns.get(2).should.equal('ccccc');
            messages.messageColumns.get(3).should.equal('ddddd');
            messages.messageColumns.get(4).should.equal('eeeee');
        });
    });

    describe('correctMessage', () => {
        it('should correct the message by using the most common character of each column', () => {
            let messages = new Messages();
            messages.loadMessages([
                'eedadn',
                'drvtee',
                'eandsr',
                'raavrd',
                'atevrs',
                'tsrnev',
                'sdttsa',
                'rasrtv',
                'nssdts',
                'ntnada',
                'svetve',
                'tesnvt',
                'vntsnd',
                'vrdear',
                'dvrsen',
                'enarar'
            ]);

            messages.correctMessage().should.equal('easter');
        });
    });
});
