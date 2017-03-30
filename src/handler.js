const url = require('url');
const path = require('path');
const fs = require('fs');

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
 * HANDLE DATABASE QUERIES FOR USERS
 * @param  {object} req [description]
 * @param  {object} res [description]
 */
handler.teamSearch = (req, res) => {
  const query = url.parse(req.url, true);

  console.log(query);
}

/**
 * HANDLE DATABASE QUERIES FOR THE SEARCH PAGE
 * @param  {object} req [description]
 * @param  {object} res [description]
 */
handler.userSearch = (req, res) => {
  const query = url.parse(req.url, true).query;
  if (query.user) {
    const userId = query.user.replace(/[^0-9]/gi, '');
    if (userId) {
      fs.readFile('./public/user.html', 'utf8', (err, file) => {
        data.getUser(userId, (err, user) => {
          const userHtml =
          `<h1>${user.first_name} ${user.middle_name || ''} ${user.last_name}</h1>
          <img src='https://www.miami-institute.com/wp-content/uploads/2015/02/placeholder-500x5001.gif'>
          <ul>
          <li>Github username: <a href="${'https://www.github.com/'+user.github_user_name}">${user.github_user_name}</a></li>
          <li>Nationality: <span class="nationality">Mexican</span></li>
          <li>Languages spoken: <span class="languages">Spanish</span></li>
          <li>Place of birth: <span class="pob">DF</span></li>
          <li>Favourite hobby: <span class="hobby">salsa</span></li>
          <li>Favourite book: <span class="book">poetry</span></li>
          <li>Number of siblings: <span class="siblings">5</span></li>
          </ul>`

          const html = file.replace(/<!--REPLACETHIS-->/, userHtml);

          res.writeHead(200, {'Content-Type': 'text/html' });
          res.end(html);
        });

      })

    }

  } else if(Object.hasOwnProperty.call(query, 'all')) {
      data.getAllUsers((err, data)=>{
        if (err) throw new Error;
        res.writeHead(200, {'Content-Type':'application/json'});
        res.end(JSON.stringify(data));
      });

  } else {
    handler.serveError(req, res, new Error('Incorrect query.'))
  }
}

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
