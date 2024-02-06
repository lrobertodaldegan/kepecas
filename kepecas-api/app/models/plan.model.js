const mongoose = require("mongoose");

const Plan = mongoose.model(
  "Plan",
  new mongoose.Schema({
    code: String,
    title: String,
    value: Number,
  })
);

module.exports = Plan;