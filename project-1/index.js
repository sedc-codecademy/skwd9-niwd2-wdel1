const fs = require('fs');
const yargs = require('yargs');
const notes = require('./notes.js');

yargs.command({
    command: 'add',
    describe: 'Add a new note, with a title and a desc.',
    builder: {
        title: {
            describe: 'Adds a note title',
            demandOption: true,
            type: 'string'
        },
        description: {
            describe: 'Adds a note description',
            demandOption: true,
            type: 'string'  
        }
    },
    handler(args) {
        notes.addNote(args.title, args.description);
    }
});

yargs.command({
    command: 'remove',
    describe: 'Removes a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
    },
    handler(args) {
        notes.removeNote(args.title)
    }
});

yargs.command({
    command: 'read',
    describe: 'Reads a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
    },
    handler(args) {
        notes.readNote(args.title)
    }
});

yargs.parse();

// const noteToAdd = {
//     title: 'First Note',
//     description: 'Hello I am from node-starter'
// }

// // const writeableNote = JSON.stringify(noteToAdd);
// // fs.writeFileSync('notes.json', writeableNote);

// const file = fs.readFileSync('notes.json')
// console.log(file.toString());