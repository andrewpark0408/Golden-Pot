const fs = require('fs');
const faker = require('faker');

// Array of MLB teams
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

// Function to shuffle an array (Fisher-Yates shuffle algorithm)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to generate random MLB games with the constraint of no games within 24 hours for the same team
function generateMLBGames() {
    const shuffledTeams = shuffleArray(mlbTeams.slice());
    const games = [];
    const teamStartTimes = {}; // Map to store start times for each team

    // Helper function to check if there is a game within 24 hours for the given team and time
    function hasGameWithin24Hours(team, startTime) {
        if (!teamStartTimes[team]) return false; // No previous games for this team

        const timeDifference = Math.abs(startTime - teamStartTimes[team]);
        const hoursDifference = timeDifference / (60 * 60 * 1000); // Convert milliseconds to hours
        return hoursDifference < 24; // Check if the difference is less than 24 hours
    }

    // Generate games for each pair of teams
    for (let i = 0; i < shuffledTeams.length - 1; i++) {
        for (let j = i + 1; j < shuffledTeams.length; j++) {
            const homeTeam = shuffledTeams[i];
            const awayTeam = shuffledTeams[j];
            const proposedStartTime = faker.date.between('2024-04-04T20:00:00', '2024-04-08T23:59:59'); // After April 4th, 2024, at 8 pm

            // Check if either team has a game within 24 hours of the proposed start time
            if (!hasGameWithin24Hours(homeTeam, proposedStartTime) && !hasGameWithin24Hours(awayTeam, proposedStartTime)) {
                // No conflicts, add the game
                games.push({
                    homeTeam,
                    awayTeam,
                    startTime: proposedStartTime.toISOString().slice(0, 19).replace('T', ' '), // Convert to correct format
                    location: homeTeam  // Example: Arizona Diamondbacks
                });

                // Update start times for both teams
                teamStartTimes[homeTeam] = proposedStartTime;
                teamStartTimes[awayTeam] = proposedStartTime;
            }
        }
    }

    // Write games data to CSV file
    const csvData = games.map(game => ({
        "Home Team": game.homeTeam,
        "Away Team": game.awayTeam,
        "Start Time": game.startTime,
        "Location": game.location
    }));

    const csvHeader = Object.keys(csvData[0]).join(',') + '\n';
    const csvRows = csvData.map(row => Object.values(row).join(',')).join('\n');

    const csvContent = csvHeader + csvRows;

    fs.writeFileSync('./data/mlb_games.csv', csvContent);

    console.log('MLB Games CSV file created: mlb_games.csv');
}

// Generate MLB games with the constraint of no games within 24 hours for the same team
generateMLBGames();
