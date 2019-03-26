var ids = 0;

const blabs = [];

module.exports = app => {
  app.get("/blabs", (req, res) => {
    const params = req.query;
    const timestamp = params.createdSince;

    //parse the mongo db to get all time stamp

    // res.status(200).send([
    //   {
    //     id: "string",
    //     postTime: 0,
    //     author: {
    //       email: "user@example.com",
    //       name: "string"
    //     },
    //     message: "string"
    //   }
    // ]);

    res.status(200).send(blabs);
  });

  app.delete("/blabs/:id", (req, res) => {
    const id = req.params.id;

    var actual_blab = null;
    var index = -1;
    for (let i = 0; i < blabs.length; i++) {
      var blab = blabs[i];
      if (blab.id == id) {
        actual_blab = blab;
        index = i;
      }
    }
    if (actual_blab != null) {
      blabs.remove(index);
      res.status(200).send("Blab deleted successfully");
    } else {
      res.status(404).send("Blab does not exist");
    }
  });

  app.post("/blabs", (req, res) => {
    ids++;
    const params = req.query;
    const author = params.author;
    const message = params.message;

    //put in database

    const new_post = {
      id: ids,
      postTime: new Date().getTime(),
      author: {
        email: "user@example.com",
        name: "string"
      },
      message: "HELLO"
    };

    blabs.push(new_post);

    res.status(201).send(new_post);
  });
};
