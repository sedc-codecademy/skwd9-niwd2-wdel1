const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, description) => {
    const notes = loadNotes();
    const duplicateNote = notes.find((note) => note.title === title);
    if (!duplicateNote) {
        notes.push({
            title: title,
            description: description,
        })
        saveNotes(notes);
        console.log(chalk.inverse.green('Note Added'));
    } else {
        console.log('Note title is a duplicate');
    }
}

const removeNote = (title) => {
    const notes = loadNotes();
    if (notes.length <= 0) {
        console.log('No notes to delete!');
        return;
    }
    const notesToKeep = notes.filter((note) => note.title !== title);

    saveNotes(notesToKeep);
}

const readNote = (title) => {
    const notes = loadNotes();

    const foundNote = notes.find(note => note.title === title);

    if (foundNote) {
        console.log(foundNote.title);
        console.log(foundNote.description);
    } else {
        console.log('No note found with that title.');
    }
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJson = dataBuffer.toString();
        return JSON.parse(dataJson);
    } catch (e) {
        return [];
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    readNote: readNote,
}