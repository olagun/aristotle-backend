const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, max: 100 },
  username: { type: String, required: true, unique: true, max: 100 },
  first_name: { type: String, required: true, max: 100 },
  last_name: { type: String, required: true, max: 100 },
  hash: { type: String, required: true, max: 100 },
});

UserSchema.plugin(uniqueValidator, { message: "is already taken." });

// // Virtual for author's full name
// UserSchema.methods.setPassword = (password) => {
//   this.hash =
// };

// UserSchema.methods.validPassword = (password) => {
//   this.hash =
// };

UserSchema.methods.getToken = function () {
  const today = new Date();

  const expirationDate = new Date();
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign(
    {
      id: this._id,
      username: this.username,
      exp: parseInt(expirationDate.getTime() / 1000),
    },
    secret
  );
};

UserSchema.methods.getToken = function () {
  const today = new Date();

  const expirationDate = new Date();
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign(
    {
      id: this._id,
      username: this.username,
      exp: parseInt(expirationDate.getTime() / 1000),
    },
    secret
  );
};

UserSchema.methods.toAuthJSON;

//Export model
module.exports = mongoose.model("Author", AuthorSchema);
