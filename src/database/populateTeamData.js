const db_connection = require('./../../build_database/db_connection.js');

const populateTeams = {};

populateTeams.team = (teamNames, cb) => {
  let len = 0;
  teamNames.forEach(teamName => {
    db_connection.query(`INSERT INTO teams (team_names) VALUES ('${teamName}');`, (err, id) => {
      if (err) {
        cb(err);
        return;
      }
      len++;
      if (len >= teamNames.length) cb(null, id);
    });
  });
};

populateTeams.userteam = (user, team) => {
  db_connection.query(`INSERT INTO userteam (user_id, team_id) VALUES ((SELECT id FROM users WHERE users.first_name = '${user}'), (SELECT id FROM teams WHERE teams.team_names = '${team}'));`,
  (err, id) => {
    if (err) {
      console.log(err);
    } else console.log('it worked.');
  });
};

const teams = [
  ['Yvonne', 'SoFly'],
  ['Finn', 'SoFly'],
  ['Lucy', 'SoFly'],
  ['Samatar', 'SoFly'],
  ['Jessica', 'Jajascript'],
  ['Alexis', 'Jajascript'],
  ['Alice', 'Zapo'],
  ['Oliver', 'Zapo'],
  ['Maja', 'ammp'],
  ['Akin', 'ammp'],
  ['Piotr', 'ammp'],
  ['Joey', 'Jajascript'],
  ['Philippa', 'Zapo'],
  ['Martha', 'ammp'],
  ['Antonio', 'Jajascript'],
  ['Zooey', 'Zapo'],
  ['Yvonne', 'FACXMachine'],
  ['Finn', 'PAMF'],
  ['Lucy', 'JZLP'],
  ['Samatar', 'Facalacalaca'],
  ['Jessica', 'FACXMachine'],
  ['Alexis', 'Facalacalaca'],
  ['Alice', 'Facalacalaca'],
  ['Oliver', 'FACXMachine'],
  ['Maja', 'PAMF'],
  ['Akin', 'FACXMachine'],
  ['Piotr', 'JZLP'],
  ['Joey', 'JZLP'],
  ['Philippa', 'PAMF'],
  ['Martha', 'Facalacalaca'],
  ['Antonio', 'PAMF'],
  ['Zooey', 'JZLP']
];

const buildUserTeam = (teams) => {
  teams.forEach(([user, team]) => {
    populateTeams.userteam(user, team);
  })
};

const buildTeams = (teams) => {

  const teamNames = teams.reduce((acc, user) => {
    if (acc.indexOf(user[1]) === -1) {
      acc.push(user[1]);
    }
    return acc;
  }, []);

  populateTeams.team(teamNames, () => {
    buildUserTeam(teams);
  });
}

buildTeams(teams);
