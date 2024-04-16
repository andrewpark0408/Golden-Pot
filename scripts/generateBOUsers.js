const faker = require('faker');
const fs = require('fs');

function generateUsers(count) {
    let users = [];
    for (let i = 0; i < count; i++) {
        const name = faker.name.findName();
        const email = faker.internet.email();
        const password = faker.internet.password();

        // Add the user data as an object to the array
        users.push({ name, email, password });
    }
    return users;
}

const userData = generateUsers(100);

fs.writeFile('userData.json', JSON.stringify(userData, null, 2), (err) => {
    if (err) {
        console.error('Error writing file:', err);
    } else {
        console.log('Successfully wrote user data to userData.json');
    }
});
