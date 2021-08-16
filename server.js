// DEPENDENCIES =================
const express = require("express");
const app = express();

const PORT = process.env.PORT || 4500;

app.get("/", (req, res) => {
	res.send("Welcome to our express project");
});

app.listen(PORT, (err) => {
	if (err) throw err;
	console.log(`listening on PORT ${PORT}`);
});
