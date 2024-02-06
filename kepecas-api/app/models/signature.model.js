const mongoose = require("mongoose");

const Signature = mongoose.model(
  "Signature",
  new mongoose.Schema({
    code: String,
    plan: {
      type: mongoose.Schema.Types.ObjectId, 
      ref:'Plan'
    }
  })
);

module.exports = Signature;