const config = require("./config/config");

const express = require("express");

const app = express();

app.get("/", (req, res) => {
  return res.send("hello");
});

app.listen(config.PORT, () => {
  console.log(`App is running on port ${config.PORT}`);
});
