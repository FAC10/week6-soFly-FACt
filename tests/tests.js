const test = require('tape');
const backendTests = require('./back-end');
const frontendTests = require('./front-end');
const routeTests = require('./route-tests');

test('Check tape is working with a simple passing test', (t) => {
  t.pass('a message to print out on sucess');
  t.end();
});
