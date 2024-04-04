const fs = require('fs');
const csv = require('csv-parser');
const { createObjectCsvWriter } = require('csv-writer');
const faker = require('faker');

// Load MLB games data from CSV file
const mlbGames = [];
fs.createReadStream('./data/mlb_games.csv')
    .pipe(csv())
    .on('data', (row) => {
        mlbGames.push(row);
    })
    .on('end', () => {
        generateMlbPicks(mlbGames);
    });

// Function to generate random MLB picks based on games data
function generateMlbPicks(mlbGames) {
    const mlbPicks = [];

    mlbGames.forEach(game => {
        const { "Home Team": homeTeam, "Away Team": awayTeam, "Start Time": startTime } = game;
        const startTimeObj = new Date(startTime);

        // Generate random MLB picks based on player type and criteria
        for (let i = 0; i < 5; i++) {
            const playerType = faker.random.arrayElement(['Pitcher', 'Hitter']);
            let pick;

            if (playerType === 'Pitcher') {
                pick = generatePitcherPick(homeTeam, awayTeam, startTimeObj);
            } else {
                pick = generateHitterPick(homeTeam, awayTeam, startTimeObj);
            }

            mlbPicks.push(pick);
        }
    });

    writePicksToCsv(mlbPicks, 'mlb_picks.csv');
}

// Function to generate pitcher pick with strikeouts, walks, strikes
function generatePitcherPick(homeTeam, awayTeam, startTime) {
    return {
        homeTeam,
        awayTeam,
        startTime,
        playerType: 'Pitcher',
        playerName: faker.name.findName(),
        strikeouts: faker.datatype.number({ min: 0, max: 15 }),
        walks: faker.datatype.number({ min: 0, max: 5 }),
        strikes: faker.datatype.number({ min: 0, max: 20 })
    };
}

// Function to generate hitter pick with single, double, triple, HR
function generateHitterPick(homeTeam, awayTeam, startTime) {
    return {
        homeTeam,
        awayTeam,
        startTime,
        playerType: 'Hitter',
        playerName: faker.name.findName(),
        single: faker.datatype.number({ min: 0, max: 5 }),
        double: faker.datatype.number({ min: 0, max: 3 }),
        triple: faker.datatype.number({ min: 0, max: 2 }),
        HR: faker.datatype.number({ min: 0, max: 2 })
    };
}

// Function to write picks data to CSV file
function writePicksToCsv(picks, filename) {
    const csvWriter = createObjectCsvWriter({
        path: `./data/${filename}`,
        header: [
            { id: 'homeTeam', title: 'Home Team' },
            { id: 'awayTeam', title: 'Away Team' },
            { id: 'startTime', title: 'Start Time' },
            { id: 'playerType', title: 'Player Type' },
            { id: 'playerName', title: 'Player Name' },
            { id: 'strikeouts', title: 'Strikeouts' },
            { id: 'walks', title: 'Walks' },
            { id: 'strikes', title: 'Strikes' },
            { id: 'single', title: 'Single' },
            { id: 'double', title: 'Double' },
            { id: 'triple', title: 'Triple' },
            { id: 'HR', title: 'Home Runs' }
        ]
    });

    csvWriter.writeRecords(picks)
        .then(() => console.log(`${filename} file written successfully`))
        .catch(err => console.error(`Error writing ${filename} file:`, err));
}
