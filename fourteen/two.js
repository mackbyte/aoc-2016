const KeyFinder = require('./KeyFinder').KeyFinder,
      finder = new KeyFinder('jlmsuwbz', true);

console.log(`Index: ${finder.find()}`);