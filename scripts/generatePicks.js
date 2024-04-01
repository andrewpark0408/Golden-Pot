const faker = require('faker');
const { createCsvWriter } = require('csv-writer');

const generateUsersData = (numberOfUsers) => {
    const users = [];

    for (let i = 0; i < numberOfUsers; i++) {
        users.push({
            username: faker.internet.userName(),
            email: faker.internet.email(),
            password: faker.internet.password()
        });
    }

    return users;
};

const writeDataToCSV = (data, fileName) => {
    const csvWriter = createCsvWriter({
        path: `./data/${fileName}.csv`,
        header: [
            { id: 'username', title: 'USERNAME' },
            { id: 'email', title: 'EMAIL' },
            { id: 'password', title: 'PASSWORD' }
        ]
    });

    csvWriter.writeRecords(data)
        .then(() => console.log(`${fileName}.csv file was written successfully`));
};

const usersData = generateUsersData(10);
writeDataToCSV(usersData, 'users');
