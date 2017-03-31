const fs = require('fs');
const path = require('path');

const data = require('./../database/get_user_data');

const serveError = (request, response, err) => {
  if(err) console.log(err.message);
  response.writeHead(404, {'Content-Type' : 'text/html'});
  response.end('404: Page not found: ' + err.message);
};

const getUser = (req, res, query) => {
  const userId = query.user.replace(/[^0-9]/gi, '');
  buildUser(userId, (err, html) => {
    if (err) {
      serveError(req, res, err);
      return;
    }
    res.writeHead(200, {'Content-Type':'text/html'});
    res.end(html);
  });

};

const buildUser = (userId, cb) => {
  if (!userId) {
    cb(new Error('No user ID defined.'));
  }

  //Get user data
  data.getUser(userId, (err, user) => {
    if (err) {
      cb(err);
      return;
    } else if (!user) {
      console.log('NO USER FOUND!');
      cb(new Error('No user found'));
      return;
    }

    //Pull in html template
    fs.readFile(path.join(__dirname, '..', 'assets', 'user.html'), 'utf8', (err, file) => {
      if (err) {
        cb(err);
        return;
      }

      //Define dynamic html
      const userHtml =
      `<h1>${user.first_name} ${user.middle_name || ''} ${user.last_name}</h1>
      <a class="userprofile__image" href="/">
      <img class="userprofile__image__img" src=${user.profile_img} />
      <section class="userprofile__image__back">Go back</section>
      </a>
      <table>

      <tr><td>Github: </td><td><a href="${'https://www.github.com/'+user.github_user_name}">${user.github_user_name}</a></td></tr>
      <tr><td>Nationality: </td><td>${user.nationality}</td></tr>
      <tr><td>Languages: </td><td>${user.languages}</td></tr>
      <tr><td>Place of birth: </td><td>${user.place_of_birth}</td></tr>
      <tr><td>Favourite hobby: </td><td>${user.favorite_hobby}</td></tr>
      <tr><td>Favourite book: </td><td>${user.favorite_book}</td></tr>
      <tr><td>Siblings: </td><td>${user.siblings}</td></tr>
      </table>`;

      //Insert dynamic html into template
      const html = file.replace(/<!--REPLACETHIS-->/, userHtml);

      cb(null, html);
    });

  });
};

module.exports = getUser;
