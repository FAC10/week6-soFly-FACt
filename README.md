# week6-soFly-FACt

[![Build Status](https://travis-ci.org/yvonne-liu/week6-soFly-FACt.svg?branch=master)](https://travis-ci.org/yvonne-liu/week6-soFly-FACt)
[![codecov](https://codecov.io/gh/yvonne-liu/week6-soFly-FACt/branch/master/graph/badge.svg)](https://codecov.io/gh/yvonne-liu/week6-soFly-FACt)

## Basic User Story

Our user will be able to search/select and access useful and interesting facts about each member of FAC 10.

## Getting Started
```
- Clone / fork this repo.
- cd into the repo in your command line $ cd db-morning-challenge
- Install dependencies with $ npm install
- In your browser, go to ElephantSQL
- Log into ElephantSQL via GitHub
- Click on 'Create new instance' to create a new database
- Give your database a name, choose the 'Tiny Turtly' free plan, and select any data center from the list
- Click on the name of your new new database to see details; you'll need the URL. Copy this to your clipboard!
- Back in your command line, create a config.env file with the url of your new database. You can do that like this  $ echo "export DB_URL = {YOUR_COPIED_URL}" >> "config.env"
- Build your database by running: $ node database/db_build.js
```

## Designing our Interface

{DESIGN}

## User Journey

The user will be able to see all FAC members' names and photos by default.

They can filter through the members using a drop-down list at the top, e.g. find all users in a certain team.

They can then click on a person which will take them to that person's profile page.

## Tables in our Database

Our database will be a "[Read profile](http://help.boomi.com/atomsphere/GUID-B15E86E2-A76A-435E-A3F5-F810075192F8.html)" database, i.e. it takes an input from the user in the DOM (e.g. What languages does Person X speak?), and this is used to extract relevant information from the database.

See our database.md(ADD URL) to see all of our tables clearly displayed.

## Architecting our App

![arch](https://cloud.githubusercontent.com/assets/22013117/24546946/6a360a7e-1605-11e7-8bd5-8142aa9540cb.png)
