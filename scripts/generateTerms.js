const faker = require('faker');
const fs = require('fs');

function generateTermsAndDefinitions(count) {
    let termsAndDefinitions = [];
    for (let i = 0; i < count; i++) {
        const term = faker.commerce.productName();
        const definition = `The ${term} is known for its ${faker.commerce.productAdjective()} ${faker.commerce.productMaterial()} used primarily in ${faker.commerce.department()}.`;

        // Add the term and definition as an object to the array
        termsAndDefinitions.push({ [term]: definition });
    }
    return termsAndDefinitions;
}

const terms = generateTermsAndDefinitions(100);

fs.writeFile('termsAndDefinitions.json', JSON.stringify(terms, null, 2), (err) => {
    if (err) {
        console.error('Error writing file:', err);
    } else {
        console.log('Successfully wrote terms and definitions to termsAndDefinitions.json');
    }
});
