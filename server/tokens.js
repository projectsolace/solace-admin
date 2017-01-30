const router = require('express').Router();
const jwt = require('jsonwebtoken');
const config  = require('./config');
const  _ = require('lodash');
const db = require('../db');
const User = db.model('users');


const createToken = (user) => {
  return jwt.sign(_.omit(user, 'password'), config.secret, { expiresIn: 60*60*5 });
};


router.post('/signup', function(req, res, next) {

  var userScheme = req.body;

  if (!userScheme.firstName || !userScheme.lastName || !userScheme.email || !userScheme.password) {
    return res.status(400).send("You must send the username and the password");
  }

  User.findOrCreate({
    where: {
      email: userScheme.email
    },
    defaults: userScheme
  })
  .spread((user, isCreated) => {
    if (!isCreated) {
      res.status(400).send("A user with that username already exists");
    } else {
      res.status(201).send({
        id_token: createToken(user),
        user: user
      });
    }
  })
  .catch(next)
});

router.post('/sessions/create', function(req, res, next) {

  var userScheme = req.body;

  if (!userScheme.email || !userScheme.password) {
    return res.status(400).send("You must send the username and the password");
  }

  User.findOne({
    where: userScheme
  })
  .then(user => {
    if (!user) {
      res.status(400).send("Invalid information");
    } else {
      res.status(201).send({
        id_token: createToken(user)
      });
      // res.redirect('/api/protected/' + user.email);
    }
  })
  .catch(next);
});


module.exports = router;
