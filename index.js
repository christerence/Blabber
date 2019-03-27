const express = require("express");
const app = express();
var bodyParser = require("body-parser");

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
