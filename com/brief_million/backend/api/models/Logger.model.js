  
const mongoose = require("mongoose");

const logSchema = new mongoose.Schema(
  {
    time: Date,
    file: String,
    line: String,
    info: mongoose.Schema.Types.Mixed,
    type: String,
  }
);

module.exports = mongoose.model("Logge", logSchema);