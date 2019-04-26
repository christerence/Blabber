const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("./models/blabs");

const user = process.env.API_MONGO_USER;
const pass = fs
.readFileSync(process.env.API_MONGO_PASSWORD_FILE)
.toString()
.split("\n")[0];

const uri = encodeURI(`mongodb://${user}:${pass}@mongo:27017`);

mongoose.connect(uri, (err) => {
  if (err) {
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