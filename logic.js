// DEPENDENCIES =================
const fs = require("fs");
const dbFile = "./db/db.json";
/* changed it to const to enable me empty it out before extracting new elements into it */
let notesArray = [];

// Fetch all notes
const extractNotes = () => {
	// empty notesArray out before pushing in new extracted elements
	notesArray = [];
	fs.readFile(dbFile, (err, data) => {
		if (err) return err;
		const notesJson = data.length > 0 ? JSON.parse(data) : [];
		notesJson.forEach((note) => {
			pushIntoNotesArray(note);
		});
	});
};

// Update notes array
const pushIntoNotesArray = (noteObj) => {
	notesArray.push(noteObj);
};

// Fetch the existing notes
const fetchNotes = () => notesArray;

// Add new notes
const addNewNote = (noteObj) => {
	const combinedNotes = [...fetchNotes(), noteObj];
	updateJsonFile(combinedNotes);
};

// Write to db json file
const updateJsonFile = (notesArray) => {
	notesArray = JSON.stringify(notesArray);
	fs.writeFile(dbFile, notesArray, (err, data) => {
		if (err) throw err;
	});
	init();
};

// Delete note
const removeNote = (noteId) => {
	const notesArray = fetchNotes();
	const filteredNotesArray = notesArray.filter(
		(note) => `${note.id}` !== `${noteId}`
	);
	updateJsonFile(filteredNotesArray);
};

// Start the app
const init = () => {
	extractNotes();
};

// Export all functions
module.exports = {
	init,
	addNewNote,
	fetchNotes,
	removeNote,
};
