const faker = require('faker');
const fs = require('fs');

function generateCollections(count) {
    let collections = [];
    for (let i = 0; i < count; i++) {
        const title = faker.commerce.productName(); // Using this as a placeholder for collection title
        const description = faker.lorem.sentences(); // Generating a random description

        // Add the collection data as an object to the array
        collections.push({ title, description });
    }
    return collections;
}

const collectionData = generateCollections(100);

fs.writeFile('collectionData.json', JSON.stringify(collectionData, null, 2), (err) => {
    if (err) {
        console.error('Error writing file:', err);
    } else {
        console.log('Successfully wrote collection data to collectionData.json');
    }
});
