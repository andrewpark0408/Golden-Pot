const { createObjectCsvWriter } = require('csv-writer');
const faker = require('faker');

// List of provided player names
const providedPlayerNames = [
    "Amarin Sam", "Andrew Park", "Chris Cheng", "Eric Roth", "Eric Yap",
    "Flora Zhang", "Greg Jenkins", "James Clover", "Justin Liang", "Malcolm Kam",
    "Maysie Ocera", "Michael Mcclanahan", "Michael O'Brien", "Mwani Ngemi",
    "Nhu Le", "Raul Garcia", "Reagan Tankersley", "Richard Li", "Stephen Capper",
    "Styles Kim", "Vincent Lieu", "William Tucker", "Wyatt Grayson Fulbright",
    "Julian Yuen", "Nat Massarany", "Mylani Demas", "Luke Larson", "Steven Kim"
];

// Function to generate MLB players and assign them to teams
function generateMLBPlayers(numberOfPlayers, teams) {
    const players = [];
    const maxPlayersPerTeam = Math.ceil(numberOfPlayers / teams.length);

    let shuffledPlayerNames = providedPlayerNames.slice();
    for (let i = 0; i < teams.length; i++) {
        for (let j = 0; j < maxPlayersPerTeam; j++) {
            const playerName = shuffledPlayerNames.length > 0 ? shuffledPlayerNames.pop() : faker.name.findName();
            players.push({ playerName, team: teams[i] });
        }
    }

    return players;
}

const mlbTeams = [
    "Arizona Diamondbacks", "Atlanta Braves", "Baltimore Orioles", "Boston Red Sox",
    "Chicago Cubs", "Chicago White Sox", "Cincinnati Reds", "Cleveland Guardians",
    "Colorado Rockies", "Detroit Tigers", "Houston Astros", "Kansas City Royals",
    "Los Angeles Angels", "Los Angeles Dodgers", "Miami Marlins", "Milwaukee Brewers",
    "Minnesota Twins", "New York Mets", "New York Yankees", "Oakland Athletics",
    "Philadelphia Phillies", "Pittsburgh Pirates", "San Diego Padres", "San Francisco Giants",
    "Seattle Mariners", "St. Louis Cardinals", "Tampa Bay Rays", "Texas Rangers",
    "Toronto Blue Jays", "Washington Nationals"
];

const mlbPlayers = generateMLBPlayers(500, mlbTeams);

function writePlayersToCSV(players, fileName) {
    const csvWriter = createObjectCsvWriter({
        path: `./data/${fileName}.csv`,
        header: [
            { id: 'playerName', title: 'Player Name' },
            { id: 'team', title: 'Team' }
        ]
    });

    csvWriter.writeRecords(players)
        .then(() => console.log(`${fileName}.csv file was written successfully`))
        .catch(error => console.error(`Error creating ${fileName}.csv file:`, error));
}

writePlayersToCSV(mlbPlayers, 'mlb_players');
