const fs = require("fs"),
      Password = require('./Password').Password;

fs.readFile("twentyone/input.txt", "utf8", function(err, data) {
    if(err) {return console.log(err);}

    let password = new Password('abcdefgh');
    password.scramble(data.split('\n'));

    console.log(`Scrambled password: ${password.string}`);
});