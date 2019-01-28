const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema(
    {
        credentialOne: String,
        credentialTwo: String
    }
);

module.exports = mongoose.model("User", user);