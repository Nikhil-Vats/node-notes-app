const fs = require('fs');  
const _ = require('lodash');
const yargs = require('yargs');

const notes=require('./notes.js');
const noteTitle = {
    describe: 'title of note',
    demand: true, 
    alias: 't'   
};
const noteBody = {
    describe: 'body of note',
    demand: true,   //makes it mandatory
    alias: 'p'
};
const argv = yargs
.command('add','Add a new note', {
title: noteTitle,
body: noteBody,
})
.command('list','list all notes')
.command('read','read a note',{
    title: noteTitle
})
.command('remove','remove the note',{
    title: noteTitle
})
.help()         //provides help
.argv;
var command = process.argv[2];
//console.log('Command: ',command); //argv is array of all arguments
//console.log('Yargs: ',yargs.argv);
if(command === 'add')   {
    var note = notes.addNote(argv.title, argv.body);
    if(note)    {
        console.log('Note created');
        console.log("Title: ",note.title);
        console.log(`Body: ${note.body}`);
    }
    else 
        console.log('A node with same title exists');
}
else if(command === 'list')    {
    var allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s).`);
    allNotes.forEach((note) => notes.logNote(note));
}
else if(command === 'read') {
     var note = notes.getNote(argv.title);
     if(note)    {
        console.log('Note found');
        notes.logNote(note); 
     }
     else 
        console.log('node does not exist');

}
else if(command === 'remove')   {
    var noteRemoved = notes.removeNote(argv.title);
    var message = noteRemoved ? 'Note was removed' : 'Note not found';
    console.log(message);
}
else    {
    console.log('Command not recognised.');
}