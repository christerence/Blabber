const mongoose = require("mongoose");
const { Schema } = mongoose;

const blabSchema = new Schema({
  id: String,
  postTime: Number,
  author: {email: String, name: String},
  message: String
});

mongoose.model("blabs", blabSchema);