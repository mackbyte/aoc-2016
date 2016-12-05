const PasswordCracker = require('./PasswordCracker').PasswordCracker;

const cracker = new PasswordCracker('uqwqemis');
console.log(cracker.crack());