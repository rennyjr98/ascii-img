const express = require("express");
const path = require("path");
const app = express();
app.use(express.static(path.join(__dirname, "/dist/media-ascii")));
app.get("/*", function (req, res) {
  res.sendFile(__dirname + "/dist/media-ascii/index.html");
});
app.listen(process.env.PORT || 80);
