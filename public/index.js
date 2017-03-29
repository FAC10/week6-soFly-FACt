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

fetch('/users', console.log);
fetch('/teams', console.log);
