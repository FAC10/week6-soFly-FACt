const router = require('./router.js');
const server = require('http').createServer(router);

const port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log('server is listening on port: ', port);

});
