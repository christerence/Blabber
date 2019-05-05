const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const fs = require("fs");
require("./models/blabs");

const user = process.env.API_MONGO_USER;
const pass = fs
  .readFileSync(process.env.API_MONGO_PASSWORD_FILE)
  .toString()
  .split("\n")[0];

console.log("username: " + user + " password: " + pass);

const uri = encodeURI(`mongodb://${user}:${pass}@mongo:27017/admin`);

console.log(uri);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

require("./routes/api")(app);

app.get("/healthcheck", (req, res) => {
  res.sendStatus(200);
});

const options = {
  useNewUrlParser: true
};

mongoose.connect(uri, options, err => {
  if (err) {
    console.log("DB failed");
  } else {
    console.log("connected");
    const PORT = 3000 || process.env.PORT;
    app.listen(PORT, () => {
      console.log("App Listening to PORT " + PORT);
    });
  }
});


