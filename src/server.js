const express = require("express");
const path = require("path");
const app = express();
app.use(express.static(path.join("./dist/ascii-img")));
app.get("/*", function (req, res) {
  res.sendFile(path.join("./dist/ascii-img/index.html"));
});
app.listen(process.env.PORT || 8080);
