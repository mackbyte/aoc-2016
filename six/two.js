const fs = require("fs"),
      Messages = require('./Messages').Messages;

fs.readFile("six/input.txt", "utf8", function(err, data) {
    if(err) {return console.log(err);}

    const errorMessages = data.split('\n'),
          messages = new Messages();

    messages.loadMessages(errorMessages);
    console.log(messages.correctMessage2());
});