require('dotenv').config({ path: '.env.tests' });
require('dotenv').config({ path: '.env.tests.local' }); // gitignore'd file w/ PW
const chai = require('chai');
const chaiHttp = require('chai-http');
const fs = require('fs');
const path = require('path');
const app = require('../app');

// Add new dirs here, if you need them
const testFolders = [
  'test/controllers',
];

chai.use(chaiHttp);
chai.should();

// Figure out what to run
// ----------------------
const testFiles = [];
testFolders.forEach((folder) => {
  fs.readdirSync(folder)
    .filter((file) => file.endsWith('.js'))
    .forEach((file) => testFiles.push(path.resolve(folder, file)));
});

// Run the tests
// -------------
testFiles.forEach((testFile) => {
  // eslint-disable-next-line global-require, import/no-dynamic-require
  require(testFile)(chai, app);
});
