const authconfig = require("./authconfig");
const endpoints = require("./constants");
const User = require("../schemas/user");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const BCRYPT_SALT = 5;


const createUser = (req, res) => {
  { username, password, registrationKey } = req.body;
  if (registrationKey !== authconfig.REGISTRATION_KEY) {
    console.log("Unauthorized access to create an account");
  }

};

const login = (req, res) => {
  { username, password } = req.body;

  User.findOne({ username: username }).then((err, user) => {
    if (err) {
      console.log("Error when logging in");
    }
    if (!user) {
      console.log("User not found");
    }
    bcrypt.compare(password, user.password).then(result => {
      if (!result) {
        console.log("Wrong password");
      }
      // return it in response
      const token = createJwt(username, password);
    });
  })
};

const createJwt = (username, password) => {
  jwtExpiration = { expiresIn: '2h' };
  jwt.sign({ username: username, password: password }, authconfig.SECRET, jwtExpiration }).then((err, token) => {
    if (err) {
      console.log("Error has occurred : " + err);
    }
    console.log("Token is : " + token);
    return token;
  });
};

// Check for jwt token in request
// Validate jwt with secret , maybe check issue and exp
const verifyJwt = (req, res) => {
  { jwt } = req.body;
  jwt.verify(jwt, authconfig.SECRET, {issuer: authconfig.ISSUER}).then((err, decoded) => {
    if (err || !decoded) {
      console.log("Invalid token");
    }
    decoded
    console.log("Valid token");
  })
};

router.post(endpoints.LOGIN, login);
router.post(endpoints.AUTHENTICATE, verifyJwt);

module.exports = router;
