const mongoose = require("mongoose");
const Blab = mongoose.model("blabs");

module.exports = (app, BlabsGauge, ReqTimeHist) => {
  app.get("/blabs", (req, res) => {
    const end = ReqTimeHist.startTimer();
    const params = req.query;
    const timestamp = params.createdSince;
    const date = new Date();
    if (timestamp) {
      Blab.find({})
        .where("postTime")
        .gte(timestamp)
        .then(blabs => {
          res.status(200).send(blabs);
        })
        .catch(err => {
          res.status(200).send([]);
        });
    } else {
      Blab.find({})
        .where("postTime")
        .gte((date.getTime()/1000)-5)
        .then(blabs => {
          res.status(200).send(blabs);
        })
        .catch(err => {
          res.status(200).send([]);
        });
    }
    end();
  });

  app.delete("/blabs/:id", (req, res) => {
    const end = ReqTimeHist.startTimer();
    const id = req.params.id;
    Blab.find({})
      .where("id")
      .equals(id)
      .then(blabs => {
        if (blabs.length == 0) {
          res.status(404).send("Blab not found");
        } else {
          Blab.deleteMany({ id: id }, err => {
            res.status(200).send("Blab deleted successfully");
            end();
          });
        }
      });
      end();
  });

  app.post("/blabs", (req, res) => {
    const end = ReqTimeHist.startTimer();
    const params = req.body;
    const author = params.author;
    const message = params.message;
    const date = new Date();
    new Blab({
      id: author.name + "-" + date.getTime(),
      postTime: Math.floor(date.getTime() / 1000),
      author: author,
      message: message
    })
      .save()
      .then(blab => {
        setTimeout(() => {
          res.status(201).send(blab);
          BlabsGauge.inc();
        }, 2000);
      })
      .catch(err => {
        res.status(201).send({});
        end();
      });
    end();
  });

};
