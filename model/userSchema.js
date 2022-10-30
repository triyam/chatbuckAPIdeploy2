const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    publicKey: {
      type: String,
      required: true,
    },
    fromPublicKey: {
      type: String,
    },
    toPublicKey: {
      type: String,
    },
    transactionHash: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("USER", userSchema);

module.exports = User;
