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


handler.addUser = (req, res) =>{
  let data = '';
  req.on('data', function(chunk){
    data+=chunk;
  });
  req.on('end', ()=>{
    // var formFields = data;
    // var newformFields = formFields.replace(/=/gi, '\': \'');
    var ampersandsplit = data.split('&');
    var arr = [];
    ampersandsplit.forEach(item=>{
      var keyValue = item.split('=');
      var obj = {};
      obj[keyValue[0]]=keyValue[1];
      arr.push(obj);
    });
    arr.forEach(item=>{
      data.addUser(item, (err, res)=>{
        if (err) console.log('not adding user');
        console.log('Added user')
      })
    })
    console.log(arr);

  });
};

/**
 * HANDLE DATABASE QUERIES FOR USERS
 * @param  {object} req [description]
 * @param  {object} res [description]
 */
handler.teamSearch = (req, res) => {
  const query = url.parse(req.url, true);

};

/**
* HANDLE DATABASE QUERIES FOR THE USER SEARCH PAGE
* @param  {object} req [http server request object]
* @param  {object} res [http server response object]
*/
handler.userSearch = (req, res) => {
  const query = url.parse(req.url, true).query;
  if (query.user) {
    const userId = query.user.replace(/[^0-9]/gi, '');
    if (userId) {
      fs.readFile(path.join(__dirname, 'assets', 'user.html'), 'utf8', (err, file) => {
        data.getUser(userId, (err, user) => {
          const userHtml =
          `<h1>${user.first_name} ${user.middle_name || ''} ${user.last_name}</h1>
          <img src=${'../public/assets/profile-pics/' + user.first_name.toLowerCase() + '_headshot.jpg'}>
          <ul>
          <li>Github username: <a href="${'https://www.github.com/'+user.github_user_name}">${user.github_user_name}</a></li>
          <li>Nationality: ${user.nationality}</li>
          <li>Languages spoken: ${user.languages}</li>
          <li>Place of birth: ${user.place_of_birth}</li>
          <li>Favourite hobby: ${user.favorite_hobby}</li>
          <li>Favourite book: ${user.favorite_book}</li>
          <li>Number of siblings: ${user.siblings}</li>
          </ul>`;


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
