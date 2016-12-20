const fs = require("fs"),
      Ranges = require('./Ranges').Ranges;

fs.readFile("twenty/input.txt", "utf8", function(err, data) {
    if(err) {return console.log(err);}

    const ranges = new Ranges(data.split('\n'));

    console.log(`Smallest unblocked IP: ${ranges.find()}`);
});