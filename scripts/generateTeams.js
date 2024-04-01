const { createObjectCsvWriter } = require('csv-writer');

const mlbTeams = [
  "Arizona Diamondbacks",
  "Atlanta Braves",
  "Baltimore Orioles",
  "Boston Red Sox",
  "Chicago Cubs",
  "Chicago White Sox",
  "Cincinnati Reds",
  "Cleveland Guardians",
  "Colorado Rockies",
  "Detroit Tigers",
  "Houston Astros",
  "Kansas City Royals",
  "Los Angeles Angels",
  "Los Angeles Dodgers",
  "Miami Marlins",
  "Milwaukee Brewers",
  "Minnesota Twins",
  "New York Mets",
  "New York Yankees",
  "Oakland Athletics",
  "Philadelphia Phillies",
  "Pittsburgh Pirates",
  "San Diego Padres",
  "San Francisco Giants",
  "Seattle Mariners",
  "St. Louis Cardinals",
  "Tampa Bay Rays",
  "Texas Rangers",
  "Toronto Blue Jays",
  "Washington Nationals"
];

const nbaTeams = [
  "Atlanta Hawks",
  "Boston Celtics",
  "Charlotte Bobcats",
  "Chicago Bulls",
  "Cleveland Cavaliers",
  "Dallas Mavericks",
  "Denver Nuggets",
  "Detroit Pistons",
  "Golden State Warriors",
  "Houston Rockets",
  "Indiana Pacers",
  "LA Clippers",
  "LA Lakers",
  "Memphis Grizzlies",
  "Miami Heat",
  "Milwaukee Bucks",
  "Minnesota Timberwolves",
  "New Jersey Nets",
  "New Orleans Hornets",
  "New York Knicks",
  "Oklahoma City Thunder",
  "Orlando Magic",
  "Philadelphia Sixers",
  "Phoenix Suns",
  "Portland Trail Blazers",
  "Sacramento Kings",
  "San Antonio Spurs",
  "Toronto Raptors",
  "Utah Jazz",
  "Washington Wizards"
];

function generateTeamsData() {
    const teamsData = [];

    mlbTeams.forEach(team => {
        teamsData.push({ name: team, sport: 'MLB' });
    });

    nbaTeams.forEach(team => {
        teamsData.push({ name: team, sport: 'NBA' });
    });

    return teamsData;
}

function writeDataToCSV(data, fileName) {
    const csvWriter = createObjectCsvWriter({
        path: `./data/${fileName}.csv`,
        header: [
            { id: 'name', title: 'NAME' },
            { id: 'sport', title: 'SPORT' }
        ]
    });

    csvWriter.writeRecords(data)
        .then(() => console.log(`${fileName}.csv file was written successfully`));
}

const teamsData = generateTeamsData();
writeDataToCSV(teamsData, 'teams');