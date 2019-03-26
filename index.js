const express = require('express')
const app = express()

require("./routes/api")(app);


app.get("/", (req, res) => {
    res.send("ihy sammy Thingy")
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log("App Listening to PORT " + PORT);
}) 
