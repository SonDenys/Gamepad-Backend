//Import package
const mongoose = require("mongoose");

// Creation model
const User = mongoose.model("User", {
  email: {
    unique: true,
    type: String,
  },
  account: {
    username: {
      required: true,
      type: String,
    },
    phone: String,
    avatar: mongoose.Schema.Types.Mixed, // accept any variables
  },
  token: String,
  hash: String,
  salt: String,
});

module.exports = User;
