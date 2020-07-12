# Trails To Go Server

Where users can search for trails by zipcode and mark them as completed.

<a href="https://trails-to-go-client.mesupi.vercel.app/" target="_blank">Live Version</a>

This repo contains the server-side API built with Node/Express. Looking for the front-end Trail-To-Go Client? 
**[Click Here](https://github.com/supu4aqua/trails-to-go-client.git)**

## Introduction

Users can search for trails by zipcode and can also filter the list by trail rating or length.
Users can also register and mark a trail as completed after logging in.
User profile section shows the statistics based on the trails completed by the user.
Leaderboard shows the top hikers based on trails completed

## Technology

### Back End
* [Node](https://nodejs.org/en/) and [Express](https://expressjs.com/)
    * [Mocha](https://mochajs.org/) test framework and [Chai](http://www.chaijs.com/) assertion library
* [Postgres](https://www.postgresql.org)

### Production
* [Heroku](https://www.heroku.com/) Cloud Application Platform

## Run Trail To Go API in a local development environment

### Prerequisites
* You will need these programs installed
    * [Git](https://git-scm.com/)
    * [Node.js](https://nodejs.org/en/)
    * [npm](https://www.npmjs.com/)
    * [Postgres](https://www.postgresql.org)
  
### Installation
* Clone this repository:
    * `git clone https://github.com/supu4aqua/trails-to-go-server.git`
* Move into folder:
    * `cd trails-to-go-server/`
* Run `npm install`

### Run Program
* Start PostgresSQL local server: `postgres`
* Run `npm start` (or `npm run dev` to run with nodemon which auto-restarts on save changes)
* Make requests using the root: `localhost:8080` or your specified port

### Test
* Start PostgresSQL local server
    * `postgres`
* Run `npm test`


## API Overview

## API

```
/api
.
├── /users
│   └── GET
│       ├── /
│   └── POST
│       └── /
├── /completed
│   └── GET
│       ├── /
│   └── POST
│       └── /
├── /leaderboard
│   └── GET
│       ├── /

```
