const faker = require('faker');
const fs = require('fs');

function generateFlashcards(count) {
    let flashcards = [];
    for (let i = 0; i < count; i++) {
        const term = faker.hacker.noun();
        const definition = faker.hacker.phrase();
        const confidenceLevel = faker.datatype.number({ min: 1, max: 10 });

        // Add the flashcard data as an object to the array
        flashcards.push({ term, definition, confidenceLevel });
    }
    return flashcards;
}

const flashcardData = generateFlashcards(100);

fs.writeFile('flashcardData.json', JSON.stringify(flashcardData, null, 2), (err) => {
    if (err) {
        console.error('Error writing file:', err);
    } else {
        console.log('Successfully wrote flashcard data to flashcardData.json');
    }
});
