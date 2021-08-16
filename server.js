// DEPENDENCIES =================
const express = require("express");
const app = express();
const PORT = process.env.PORT || 4500;
const path = require("path");
const bodyParser = require("body-parser");
const { init, fetchNotes, addNewNote } = require("./logic.js");

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
	// res.redirect("/notes");
	// res.send(`Available notes: ${JSON.stringify(notes)}`);
});

// Add note route
app.post("/api/notes", (req, res) => {
	const newNote = {
		title: req.body.title,
		text: req.body.text,
	};
	addNewNote(newNote);
	console.log(`Add new note title ${req.body.title}`);
	console.log(`Add new note text ${req.body.text}`);
});

// Delete note route
app.delete("/api/notes/:id", (req, res) => {
	res.send("Delete note route");
});

app.listen(PORT, (err) => {
	if (err) throw err;
	console.log(`listening on PORT ${PORT}`);
});

// INITIALIZATION ====================
init();
