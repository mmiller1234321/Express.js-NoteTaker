//notes used to keep track of note in textarea
const notes = require('express').Router();
const { readFromFile, readAndAppend, writeToFile, readAndDelete } = require('../helpers/fsUtils');

//uuid used to keep track of note id
const {v4: uuidv4} = require('uuid');
const fs = require('fs');

//GET route for /api/notes
notes.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
}

//POST route for /api/notes
notes.post('/', (req, res) => { 
    const { title, text } = req.body;
    //if the request body exists, creates a new note with a title, text, and id
    if (req.body) {
        const newNote = {
        title,
        text,
        id: uuidv4(),
        };
        readAndAppend(newNote, './db/db.json');
        res.json('Note added');
    } else {
        res.error('Error in adding note');
    }
    });

//DELETE route for /api/notes/:id
notes.delete('/:id', (req, res) => {
    //creates a variable to hold the note id
    const noteId = req.params.id;
    readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
        //removes the note with the specified id
        const result = json.filter((note) => note.id !== noteId);
        
        return result;
    })
    //writes the new note to the db.json file
    .then((result) => {
        const newData = JSON.stringify(result);
        fs.writeFile('./db/db.json', newData, (err) => {
            if (err) {
                console.log(err);
                res.status(500).json('Error in deleting note');
                return;
            } else {
                res.json('Note deleted');
            }
        });
        //catches any errors
    .catch((err) => {
        console.log(err);
        res.status(500).json('Error in deleting note');
    });
//exports notes
    module.exports = notes;