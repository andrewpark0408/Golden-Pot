const usersETL = require('./usersETL');
const teamsETL = require('./teamsETL');
const mlbPlayersETL = require('./mlbPlayersETL');
const mlbGamesETL = require('./mlbGamesETL');
const mlbPicksETL = require('./mlbPicksETL');
// const nbaPlayersETL = require('./nbaPlayersETL');
// const nbaGamesETL = require('./nbaGamesETL');
// const nbaPicksETL = require('./nbaPicksETL');

async function runETL() {
    console.log('Starting ETL process...');

    await usersETL();
    console.log('Users data loaded.');

    await teamsETL();
    console.log('Teams data loaded.');

    await mlbPlayersETL();
    console.log('MLB players data loaded.');

    await mlbGamesETL();
    console.log('MLB Games data loaded.');

    await mlbPicksETL();
    console.log('MLB Picks data loaded.');



    console.log('ETL process completed.');
}

runETL();
// await nbaPlayersETL();
// console.log('Nba players data loaded.');

// await nbaGamesETL();
// console.log('NBA Games data loaded.');

// await nbaPicksETL();
// console.log('NBA Picks data loaded.');