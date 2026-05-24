const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("VPKILL BOT ONLINE");
});

app.listen(3000, () => {
  console.log("BOT RUNNING");
});
