const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const fs = require("fs");
const PromClient = require('prom-client');
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

const BlabsGauge = new PromClient.Gauge({name: 'total_blabs_created_count', help: 'The number of blabs created'},);
BlabsGauge.set(0);
const ReqTimeHist = new PromClient.Histogram({
  name: 'http_request_duration_sec',
  help: 'Request durations for all endpoints accessed',
});


require("./routes/api")(app, BlabsGauge, ReqTimeHist);

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


const collectDefaultMetrics = PromClient.collectDefaultMetrics;
collectDefaultMetrics({prefix: 'api', timeout: 5000});

app.get('/metrics', (req, res) => {
  const end = ReqTimeHist.startTimer();
  res.status(200).send(PromClient.register.metrics());
  end();
});


