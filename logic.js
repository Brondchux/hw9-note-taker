// DEPENDENCIES =================
const fs = require("fs");
const dbFile = "./db/db.json";
const notesArray = [];

// Fetch all notes
const extractNotes = () => {
	fs.readFile(dbFile, (err, data) => {
		if (err) return err;
		const notesJson = JSON.parse(data);
		notesJson.forEach((note) => {
			updateNotesArray(note);
		});
	});
};

// Update notes array
const updateNotesArray = (noteObj) => {
	notesArray.push(noteObj);
	console.log("Updated notes array: ", notesArray);
	// Fetcth the updated array
	fetchNotes();
};

// Fetch the existing notes
const fetchNotes = () => notesArray;

// Add new notes
const addNewNote = (noteObj) => {
	const combinedNotes = JSON.stringify([...fetchNotes(), noteObj]);
	console.log("combinedNotes: ", combinedNotes);
	fs.writeFile(dbFile, combinedNotes, (err, data) => {
		if (err) throw err;
		extractNotes();
	});
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
	updateNotesArray,
};
