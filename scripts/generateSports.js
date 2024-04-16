const { createObjectCsvWriter } = require('csv-writer');

function generateSportsData() {
    // Static data for sports
    return [
        { name: 'MLB' },
        { name: 'NBA' }
    ];
}

function writeDataToCSV(data, fileName) {
    const csvWriter = createObjectCsvWriter({
        path: `./data/${fileName}.csv`,
        header: [
            { id: 'name', title: 'NAME' }
        ]
    });

    csvWriter.writeRecords(data)
        .then(() => console.log(`${fileName}.csv file was written successfully`));
}

const sportsData = generateSportsData();
writeDataToCSV(sportsData, 'sports');