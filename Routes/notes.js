// Import Express.js framework for creating routers
const express = require('express');
const notes = express.Router();

// Import functions from fsUtils.js for file system operations
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');

// Import uuid package to generate unique IDs for notes
const { v4: uuidv4 } = require('uuid');

// Import fs module for file system operations
const fs = require('fs');

// GET request to read the db file containing notes
notes.get('/', (req, res) => {
    // Read data from db.json file and send it as JSON response
    readFromFile('./db/db.json')
        .then(data => res.json(JSON.parse(data)))
        .catch(err => {
            console.error(err);
            res.status(500).json('Server Error');
        });
});

// POST request to receive notes and assign them a unique id
notes.post('/', (req, res) => {
    // Destructure title and text from request body
    const { title, text } = req.body;
    // Check if both title and text exist
    if (title && text) {
        // Create a new note object with a unique id using uuid
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };
        // Append the new note to db.json file
        readAndAppend(newNote, './db/db.json')
            .then(() => res.json('Note added'))
            .catch(err => {
                console.error(err);
                res.status(500).json('Server Error');
            });
    } else {
        res.status(400).json('Invalid request');
    }
});

// DELETE request that removes an entry from the db.json file based on its unique note id
notes.delete('/:id', (req, res) => {
    // Assign note id from request parameters to a variable
    const noteId = req.params.id;
    // Read data from the database file
    readFromFile('./db/db.json')
        .then(data => JSON.parse(data))
        .then(json => {
            // Filter out notes that don't match the provided noteId
            const result = json.filter(note => note.id !== noteId);
            return result;
        })
        .then(result => {
            // Convert filtered results to a string because fs.writeFile only accepts strings, not objects
            const updatedData = JSON.stringify(result);
            // Write updated data back to the db.json file
            fs.writeFile('./db/db.json', updatedData, err => {
                // Handle errors during file writing
                if (err) {
                    console.error(err);
                    res.status(500).json('Error deleting note');
                } else {
                    // Send response indicating success
                    res.json('Note deleted');
                }
            });
        })
        // Handle errors from promises
        .catch(err => {
            console.error(err);
            res.status(500).json('Server Error');
        });
});

// Export router for modularization
module.exports = notes;

