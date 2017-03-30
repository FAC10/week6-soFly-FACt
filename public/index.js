var fetch = function(url, cb) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        cb(null, JSON.parse(xhr.responseText));
      } else {
        cb(new Error('Api request failed'));
      }
    }
  };
  xhr.open('GET', url, true);
  xhr.send();
};

fetch('/users?all', handleUsers);

function handleUsers (err, users) {
  if (err) {
    console.log(err.message);
    return;
  }

  users.forEach(function (user) {
    document.querySelector('main').appendChild(buildUser(user));
  });
}

function createElement(tag, options) {
  var element = document.createElement(tag);
  for (option in options) {
    element[option] = options[option];
  }
  return element;
};

function buildUser (user) {
  var userLink = createElement('a', { href: '/users?user=' + user.id, className: 'user', innerText: 'View ' + user.first_name + '\'s profile'  });

  var user_DOM = createElement('figure', { className: 'user__profile' });

  var imageLink = './public/assets/profile-pics/' + user.first_name.toLowerCase() + '_headshot.jpg';
  var userImage = createElement('img', { className: 'user__profile__image', src: imageLink, alt:user.first_name + '\'s profile portrait' });

  var name = user.first_name + ' ' + user.last_name;
  var caption = createElement('figcaption', { innerText: name, className: 'user__profile__caption' });

  user_DOM.appendChild(userImage);
  user_DOM.appendChild(caption);
  userLink.appendChild(user_DOM);

  return userLink;
}
