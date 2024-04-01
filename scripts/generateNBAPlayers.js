const faker = require('faker');
const { createObjectCsvWriter } = require('csv-writer');

const generatePlayersData = (numberOfPlayers, teams, maxPlayersPerTeam) => {
    const players = [];

    for (let i = 0; i < numberOfPlayers; i++) {
        const playerName = faker.name.findName();
        const team = teams[Math.floor(Math.random() * teams.length)];
        players.push({ playerName, team });
    }

    return players;
};

const writePlayersToCSV = (players, fileName) => {
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
};

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

const nbaTeams = [
    "Atlanta Hawks", "Boston Celtics", "Brooklyn Nets", "Charlotte Hornets",
    "Chicago Bulls", "Cleveland Cavaliers", "Dallas Mavericks", "Denver Nuggets",
    "Detroit Pistons", "Golden State Warriors", "Houston Rockets", "Indiana Pacers",
    "LA Clippers", "Los Angeles Lakers", "Memphis Grizzlies", "Miami Heat",
    "Milwaukee Bucks", "Minnesota Timberwolves", "New Orleans Pelicans",
    "New York Knicks", "Oklahoma City Thunder", "Orlando Magic", "Philadelphia 76ers",
    "Phoenix Suns", "Portland Trail Blazers", "Sacramento Kings", "San Antonio Spurs",
    "Toronto Raptors", "Utah Jazz", "Washington Wizards"
];

const mlbPlayers = generatePlayersData(500, mlbTeams, 26);
const nbaPlayers = generatePlayersData(300, nbaTeams, 15);

writePlayersToCSV(mlbPlayers, 'mlb_players');
writePlayersToCSV(nbaPlayers, 'nba_players');
