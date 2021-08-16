// DEPENDENCIES =================
const express = require("express");
const app = express();
const PORT = process.env.PORT || 4500;

app.use(express.static(`${__dirname + "/public"}`));

app.get("/", (req, res) => {
	res.send("index.html");
});

app.listen(PORT, (err) => {
	if (err) throw err;
	console.log(`listening on PORT ${PORT}`);
});
