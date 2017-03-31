const url = require('url');
const path = require('path');
const fs = require('fs');

const getUser = require('./handlers/getUser');
const data = require('./database/get_user_data.js');

const handler = {};

/**
 * SERVE STATIC PAGES
 * @param  {object} request  [description]
 * @param  {object} response [description]
 * @param  {string} page     [html file name]
 */
handler.serveStatic = (request, response, page) => {
  const filePath = path.join(__dirname, '..', 'public', page);
  const readStream = fs.createReadStream(filePath);

  readStream.on('open', () => {
    readStream.pipe(response);
  });

  readStream.on('open', () => {
    response.writeHead(200, {'Content-Type': 'text/html'});
  });

  readStream.on('error', (err) => {
    handler.serveError(request, response, err);
  });

};

/**
 * SERVE PUBLIC ASSETS
 * @param  {object} request
 * @param  {object} response
 */
handler.servePublic = (request, response) => {
  const url = request.url;
  const extension = url.split('.')[1];
  const extensionType = {
    'css':'text/css',
    'js':'application/javascript',
    'ico':'image/x-icon',
    'jpg':'image/jpeg',
    'png':'image/png',
    'gif':'image/gif'
  };
  if (extensionType[extension]) {
    const readStream = fs.createReadStream(path.join(__dirname, '..', url));

    readStream.on('open', () => {
      readStream.pipe(response);
    });

    let headerNotSet = true;
    readStream.on('data', () => {
      if (headerNotSet) {
        headerNotSet = false;
        response.writeHead(200, {'Content-Type':extensionType[extension]});
      }
    });

    readStream.on('error', (err) => {
      handler.serveError(request, response, err);
    });

  } else {
    handler.serveError(request, response, new Error(`Incorrect Content-Type: ${extension || 'none'}`));
  }
};

/**
 * INPUT NEW USERS FROM OUR FRONTEND FORM
 * @param {object} req
 * @param {object} res
 */
handler.addUser = (req, res) =>{
  let body = '';
  req.on('data', function(chunk){
    body += chunk;
  });
  req.on('end', ()=>{
    var ampersandSplit = body.split('&');
    var arr = [];

    var userinfo = ampersandSplit.reduce((acc, item)=>{
      var keyValue = item.split('=');
      acc[keyValue[0]]=keyValue[1];
      return acc;
    }, {});

    data.addUserToDatabase(userinfo, (err)=>{
      if (err){ handler.serveError(err);return;}
      res.writeHead(301, {Location: '/'});
      res.end();
    });

  });
};

/**
* HANDLE DATABASE QUERIES FOR THE USER SEARCH PAGE
* @param  {object} req [http server request object]
* @param  {object} res [http server response object]
*/
handler.userSearch = (req, res) => {
  const query = url.parse(req.url, true).query;

  if (query.user) {
    getUser(req, res, query);

  } else if(Object.hasOwnProperty.call(query, 'all')) {

    data.getAllUsers((err, data)=>{
      if (err) return handler.serveError(req, res, err);
      res.writeHead(200, {'Content-Type':'application/json'});
      res.end(JSON.stringify(data));
    });

  } else if (query.team) {

    data.getUsersFromTeam(query.team, (err, data) => {
      if (err) return handler.serveError(req, res, err);
      res.writeHead(200, {'Content-Type':'application/json'});
      res.end(JSON.stringify(data));
    });

  } else {

    handler.serveError(req, res, new Error('Incorrect query.'));

  }
};

/**
 * SERVE ERROR PAGE
 * @param  {object} request
 * @param  {object} response
 * @param  {string} err      [optional error message]
 */
handler.serveError = (request, response, err) => {
  if(err) console.log(err.message);
  response.writeHead(404, {'Content-Type' : 'text/html'});
  response.end('404: Page not found');

};

module.exports = handler;
