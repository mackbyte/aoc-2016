const fs = require("fs"),
      Disk = require('./Disk').Disk;

fs.readFile("fifteen/input.txt", "utf8", function(err, data) {
    if(err) {return console.log(err);}

    const disks = data.split('\n').map(string => Disk.create(string));

    let i = 0;

    while(disks.some((disk, index) => !disk.isOpen(i+index+1))) {
        i++;
    }
    console.log(i);
});