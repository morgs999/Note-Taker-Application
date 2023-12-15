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

// notes.delete('/:note_id', (req, res) => {
//     const noteId = req.params.note_id;
//     readFromFile('./db/db.json')
//       .then((data) => JSON.parse(data))
//       .then((json) => {
//         // Make a new array of all tips except the one with the ID provided in the URL
//         const result = json.filter((tip) => notes.note_id !== noteId);

//         // Save that array to the filesystem
//         writeToFile('./db/db.json', result);

//         // Respond to the DELETE request
//         res.json(`Item ${noteId} has been deleted 🗑️`);
//       });
//   });

module.exports = notes;