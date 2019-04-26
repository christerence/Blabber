const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var fs = require("fs");

require("./models/blabs");

// var mongoUser = "user";
// var mongoPass = fs
//   .readFileSync("./db_password.txt")
//   .toString()
//   .split("\n")[0];

mongoose.connect(`mongodb://mongo:27017`, err => {
  if (err) {
    console.log(err);
    console.log("DB failed");
  } else {
    console.log("connected");
  }
});

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

require("./routes/api")(app);

const PORT = 3000;
app.listen(PORT, () => {
  console.log("App Listening to PORT " + PORT);
});
