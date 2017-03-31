BEGIN;

DROP TABLE IF EXISTS users, teams, userteam, teamprojects, mentors, usermentor CASCADE;

CREATE TABLE users (
    id                SERIAL     PRIMARY KEY,
    first_name        VARCHAR(64)  NOT NULL,
    middle_name       VARCHAR(64),
    last_name         VARCHAR(64)  NOT NULL,
    github_user_name  VARCHAR(64)  NOT NULL,
    nationality       VARCHAR(64)  NOT NULL,
    languages         VARCHAR(64)  NOT NULL,
    place_of_birth    VARCHAR(64)  NOT NULL,
    favorite_hobby    VARCHAR(64)  NOT NULL,
    favorite_book     VARCHAR(64)  NOT NULL,
    siblings          INTEGER,
    profile_img       VARCHAR(64)  NOT NULL
);

INSERT INTO users (first_name, middle_name, last_name, github_user_name, nationality, languages, place_of_birth, favorite_hobby, favorite_book, siblings, profile_img)
VALUES ('Yvonne', '禹彤', 'Liu', 'yvonne-liu', 'American', 'English, Mandarin Chinese, some Italian', 'Taipei, Taiwan', 'Hiking', 'East of Eden', 0, './public/assets/profile-pics/yvonne_headshot.jpg'),
       ('Finn', 'Webb Newell', 'Hodgkin', 'finnhodgkin', 'British', 'English', 'London, UK', 'Climbing', 'The Lacuna', 2, './public/assets/profile-pics/finn_headshot.jpg'),
       ('Lucy', 'Rose', 'Sabin', 'lucyrose93', 'British', 'English, French, Spanish', 'West Sussex, UK', 'Yoga', 'Alice"s Adventures in Wonderland', 1, './public/assets/profile-pics/lucy_headshot.jpg'),
       ('Samatar', NULL, 'Axmed', 'samatar26', 'Dutch', 'English, Somali, Dutch', 'Apeldoorn', 'Weightlifting', 'Het lot van de familie Meijer', 4, './public/assets/profile-pics/samatar_headshot.jpg'),
       ('Jessica', 'Ruth', 'Salmon', 'bo-bok', 'British', 'British, Russian', 'England', 'Reading', 'Brothers Karamazov', 0, './public/assets/profile-pics/jessica_headshot.jpg'),
       ('Alexis', NULL, 'Lui', 'alexis-l8', 'British', 'English, Cantonese, Spanish, Japanese, Mandarin, Esperanto', 'London', 'Squash', 'Harry Potter', 2, './public/assets/profile-pics/alexis_headshot.jpg'),
       ('Alice', 'Eleanor', 'Carr', 'ConchobarMacNessa', 'British/Australian', 'English/Mandarin', 'Australia', 'Drawing', 'Steppenwolf', 2, './public/assets/profile-pics/alice_headshot.jpg'),
       ('Oliver', 'James', 'Phillips', 'oliverjam', 'British', 'English', 'Stevenage, UK', 'JavaScript', 'JavaScript: The Good Parts', 3, './public/assets/profile-pics/oliver_headshot.jpg'),
       ('Maja', 'M', 'Kudlicka', 'majakudlicka', 'Polish', 'English, Polish, Broken German, Spanish and French', 'Poland', 'Travelling', 'Harry Potter', 1, './public/assets/profile-pics/maja_headshot.jpg'),
       ('Akin', 'Mariah', 'Sowemimo', 'akin909', 'Estonian', 'English, French', 'UK', 'Coding', 'Love in the Time of Cholera', 2, './public/assets/profile-pics/akin_headshot.jpg'),
       ('Piotr', NULL, 'Berebecki', 'PiotrBerebecki', 'Jamaican', 'English', 'Martian', 'Watering flowers', 'Advanced Watering Flowers Techniques for Beginners', 7, './public/assets/profile-pics/piotr_headshot.jpg'),
       ('Joey', 'Louise', 'Scott', 'joeylouise', 'British', 'English, Spanish', 'London', 'Singing', 'In Cold Blood', 1, './public/assets/profile-pics/joey_headshot.jpg'),
       ('Philippa', NULL, 'Bywater', 'pbywater', 'British/Canadian', 'English, French', 'Germany', 'Coding', 'The Famished Road', 1, './public/assets/profile-pics/philippa_headshot.jpg'),
       ('Martha', NULL, 'Ciobaniuc', 'smarthutza', 'Romanian', 'English, Romanian, Spanish, German', 'Romania', 'Dancing', 'Too many', 0, './public/assets/profile-pics/martha_headshot.jpg'),
       ('Antonio', NULL, 'Trabalza', 'antoniotrkdz', 'Italian', 'Italian, English', 'Italy', 'LINUX, Coding and Keyboards', 'ABC of Economics', 0, './public/assets/profile-pics/antonio_headshot.jpg'),
       ('Zooey', 'Ben', 'Miller', 'zooeymiller', 'British', 'English', 'Isle of Wight', 'Cycling', 'The Myth of Sisyphus', 1, './public/assets/profile-pics/zooey_headshot.jpg');

CREATE TABLE teams (
    id            SERIAL    PRIMARY KEY,
    team_names    VARCHAR(64)  NOT NULL
);

CREATE TABLE userteam (
    user_id       INTEGER REFERENCES users(id),
    team_id       INTEGER REFERENCES teams(id)
);

CREATE TABLE teamprojects (
    id               SERIAL       PRIMARY KEY,
    team_id          INTEGER REFERENCES teams(id),
    project_names    VARCHAR(64)  NOT NULL,
    project_url      VARCHAR(64)  NOT NULL
);

CREATE TABLE mentors (
    id              SERIAL    PRIMARY KEY,
    mentor_name     VARCHAR(64)  NOT NULL,
    github_profile  VARCHAR(64)  NOT NULL
);

CREATE TABLE usermentor (
    mentor_id     INTEGER REFERENCES mentors(id),
    user_id       INTEGER REFERENCES users(id)
);

COMMIT;
