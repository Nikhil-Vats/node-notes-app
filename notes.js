//console.log('Starting notes.js');

const fs = require('fs');

var fetchNotes = () => {
    try {
      var noteString = fs.readFileSync('notes-data.json');
      return JSON.parse(noteString);
    } catch (e) {
      return [];    
    }
};

 /*try runs if it doesnt fail the code works as if there is no try catch otherwise if it fails catch works and try doesnt*/ 

var saveNotes = (notes) => {
     fs.writeFileSync('notes-data.json',JSON.stringify(notes));
};

var addNote = (title, body) => {
    var notes = fetchNotes();
    var note = {
        title,
        body
    }
    
    var duplicateNotes = notes.filter((note)=> note.title === title          //same as{return note.title===title}
    );
    if(duplicateNotes.length === 0) {
    notes.push(note);
    saveNotes(notes);    
    return note;
    }
};

var getAll = () => {
    return fetchNotes();  
};

var getNote = (title) => {
    var notes = fetchNotes();
    var duplicateNotes = notes.filter((note)=> note.title === title          //same as{return note.title===title}
    );
    return duplicateNotes[0];
};

var removeNote = (title) => {
    var notes = fetchNotes();
    var filteredNotes = notes.filter((note)=> note.title !== title          //same as{return note.title===title}
    );
    saveNotes(filteredNotes);

    return notes.length !== filteredNotes.length;
    
}
var logNote = (note) => {
  debugger;
//break on this line and use repl to output note   
//use read with title    
  console.log("Title : ",note.title);
  console.log(`Body: ${note.body}`);  
};

module.exports = {
    addNote, //same as addNote:addNote works if key value is key  name
    getAll,
    getNote,
    removeNote,
    logNote
};