// DEPENDENCIES =================
const fs = require("fs");
const dbFile = "./db/db.json";
const notesArray = [];

// Fetch all notes
const extractNotes = () => {
	fs.readFile(dbFile, (err, data) => {
		if (err) return err;
		const notesJson = data.length > 0 ? JSON.parse(data) : [];
		notesJson.forEach((note) => {
			updateNotesArray(note);
		});
	});
};

// Update notes array
const updateNotesArray = (noteObj) => {
	notesArray.push(noteObj);
	fetchNotes();
};

// Fetch the existing notes
const fetchNotes = () => notesArray;

// Add new notes
const addNewNote = (noteObj) => {
	const combinedNotes = JSON.stringify([...fetchNotes(), noteObj]);
	updateJsonFile(combinedNotes);
};

// Write to db json file
const updateJsonFile = (notesArray) => {
	fs.writeFile(dbFile, notesArray, (err, data) => {
		if (err) throw err;
		extractNotes();
	});
};

// Delete note
const removeNote = (noteId) => {
	console.log(`from removeNote func - Deleting file id`, noteId);
	const notesArray = fetchNotes();
	const filteredNotesArray = notesArray.filter(
		(note) => `${note.id}` !== `${noteId}`
	);
	updateJsonFile(JSON.stringify(filteredNotesArray));
	console.log("filteredNotesArray", filteredNotesArray);
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
