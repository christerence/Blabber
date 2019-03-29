const mongoose = require("mongoose");
const Blab = mongoose.model("blabs");

module.exports = app => {
  app.get("/blabs", (req, res) => {
    const params = req.query;
    const timestamp = params.createdSince;

    Blab.find({})
      .where("postTime")
      .gt(timestamp)
      .then(blabs => {
        res.status(200).send(blabs);
      });
  });

  app.delete("/blabs/:id", (req, res) => {
    const id = req.params.id;
    Blab.remove({id: id}, (err) => {
      if(err) {
        res.status(404).send("Blab not found")
      } else {
        res.status(200).send("Blab deleted successfully")
      }
    })
  });

  app.post("/blabs", (req, res) => {
    const params = req.body;
    const author = params.author;
    const message = params.message;
    const date = new Date();
    new Blab({
      id: author.name + "-" + date.getTime(),
      postTime: date.getTime() / 1000,
      author: author,
      message: message
    })
      .save()
      .then(blab => {
        res.status(201).send(blab);
      })
      .catch(err => {
        res.status(404).send("Blab failed");
      });
  });
};
