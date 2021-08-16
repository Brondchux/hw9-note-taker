// DEPENDENCIES =================
const express = require("express");
const app = express();
const PORT = process.env.PORT || 4500;
const path = require("path");
const bodyParser = require("body-parser");
const { init, addNewNote, fetchNotes, removeNote } = require("./logic.js");

app.use(express.static(__dirname + "/public/"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Homepage route
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname + "/public/index.html"));
});

// Notes route
app.get("/notes", (req, res) => {
	res.sendFile(path.join(__dirname + "/public/notes.html"));
});

// Fetch notes route
app.get("/api/notes", (req, res) => {
	const notes = fetchNotes();
	res.send(notes);
});

// Add note route
app.post("/api/notes", (req, res) => {
	const newNote = {
		id: Date.now(),
		title: req.body.title,
		text: req.body.text,
	};
	addNewNote(newNote);
	res.send(newNote);
});

// Delete note route
app.delete("/api/notes/:id", (req, res) => {
	const noteId = req.params.id;
	removeNote(noteId);
	res.send(`Deleting note with id of ${noteId}`);
});

// Server listening port
app.listen(PORT, (err) => {
	if (err) throw err;
	console.log(`listening on PORT ${PORT}`);
});

// INITIALIZATION ====================
init();
