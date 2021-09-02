//Import package
const mongoose = require("mongoose");

// Creation model
const Favorites = mongoose.model("Favorites", {
  name: String,
  image: String,
  gameId: Number,
  // Link the type and the Favorites
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = Favorites;
