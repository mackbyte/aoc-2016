const fs = require("fs"),
      KeyInstructionReader = require('./KeyInstructionReader').KeyInstructionReader;

fs.readFile("two/input.txt", "utf8", function(err, data) {
    if(err) {return console.log(err);}

    const instructionList = data.split('\n');
    const keyInstructionReader = new KeyInstructionReader();
    const code = keyInstructionReader.read(instructionList);

    console.log(code.join(''));
});