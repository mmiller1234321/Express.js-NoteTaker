const fs = require('fs');
const util = require('util');

// Promise fs.readFile
const readFileAsync = util.promisify(fs.readFile);

// Writes data to JSON file and returns a promise
const writeToFile = (destination, content) =>
    fs.writeFile(destination, JSON.stringify(content), (err) =>
        err ? console.error(err) : console.info(`\nData written to ${destination}`)
    );

// Function to read from file and append to it
const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            writeToFile(file, parsedData);
        }
    });
};

// Exporting the functions
module.exports = { readFileAsync, readAndAppend };
