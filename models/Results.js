const mongoose = require("mongoose");
const isAuthenticated = require("../middlewares/isAuthenticated");

const Results = mongoose.model("Results", {
  id: Number,
  name: String,
  background_image: { type: mongoose.Schema.Types.Mixed, default: {} },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = Results;
