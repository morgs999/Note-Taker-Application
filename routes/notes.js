const notes = require('express').Router();
const { readFromFile, readAndAppend, writeToFile, } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');

notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req, res) => {
    // console.log(req.body);

    const { title, text } = req.body;

    if (req.body) {
        const activeNote = {
            title,
            text,
            id: uuidv4(),
        };
        readAndAppend(activeNote, './db/db.json');
        res.json(`Note added successfully.`);

    } else {
        res.error('Error adding note!');
    }
});

notes.delete('/:id', (req, res) => {
    const noteTitle = req.params.title;
    const noteId = req.params.id;
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((notes) => notes.id !== noteId);

            // Save that array to the filesystem
            writeToFile('./db/db.json', result);

            // Respond to the DELETE request
            res.json(`Item ${noteTitle} has been deleted 🗑️`);
        });
});

module.exports = notes;