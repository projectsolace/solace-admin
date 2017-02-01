const router = require('express').Router();
const jwt = require('express-jwt');
const config  = require('./configuration.json');
const db = require('../db');
const User = db.model('users');

const jwtCheck = jwt({
  secret: 'HelloWorld'
});

router.use('/', jwtCheck);

router.get('/:email', function(req, res) {
  const userEmail = req.params.email;
  User.findOne({
    where: {
      email: userEmail
    }
  })
  .then(currentUser => {
    res.sendStatus(200);
  })
  .catch(next);
});


module.exports = router;
