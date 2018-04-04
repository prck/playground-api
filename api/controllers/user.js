const User = require("../models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signupUser = (req, res) => {
  User
    .find({ email: req.body.email })
    .exec()
    .then(doc => {
      if (doc.length >= 1) {
        res.status(409).json({ message: "Email exists" });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            res.status(500).json({ error: err });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash
            });
            user
              .save()
              .then(doc => res.status(201).json({ message: "User created", user: doc }))
              .catch(err => res.status(500).json({ error: err }));
          }
        });
      }
    });
};

exports.signinUser = (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    .then(doc => {
      if (doc.length !== 1) {
        res.status(401).json({ message: "Auth failed" });
      }
      bcrypt.compare(req.body.password, doc[0].password, (err, result) => {
        if (err) {
          res.status(401).json({ message: "Auth failed" });
        }
        if (result) {
          const token = jwt.sign({
              email: doc[0].email,
              userId: doc[0]._id
            },
            process.env.JWT_KEY, { expiresIn: "1h" }
          );
          res.status(200).json({ message: "Auth successful", token: token });
        }
        res.status(401).json({ message: "Auth failed" });
      });
    })
    .catch(err => res.status(500).json({ error: err }));
};

exports.deleteUser = (req, res) => {
  const userId = req.params.userId;
  User
    .findByIdAndRemove(userId)
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json({ message: "User deleted", comment: doc, });
      } else {
        res.status(404).json({ message: 'No valid entry found for provided ID' });
      }
    })
    .catch(err => res.status(500).json({ error: err }));
};