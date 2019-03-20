module.exports = app => {
  app.get("/blabs", (req, res) => {
    const params = req.query;
    const timestamp = params.createdSince;

    //parse the mongo db to get all time stamp
    res.status(200).send([
      {
        id: "string",
        postTime: 0,
        author: {
          email: "user@example.com",
          name: "string"
        },
        message: "string"
      }
    ]);
  });

  app.delete("/blabs/:id", (req, res) => {
      const id = req.params.id;
    
      //if id is in mongodb 
      res.status(200).send("Blab deleted successfully");


      //if id is not
      // res.status(404).send("HELLO");
  });

  app.post("/blabs", (req, res) => {
    const params = req.query
    const author = params.author;
    const message = params.message;

    //put in database

    res.status(201).send({
        "id": "string",
        "postTime": 0,
        "author": author,
        "message": message
    })
  });
};
