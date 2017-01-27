const db = require('../db');
const Recording = db.model('recordings');
const User = db.model('users');

module.exports = require('express').Router()
  .get('/religion/:string', (req, res, next) =>
    User.findAll({where:{religion: req.params.string}})
    .then(users => res.json(users))
    .catch(next))
  .get('/occupation/:string', (req, res, next) =>
    User.findAll({where:{occupation: req.params.string}})
    .then(users => res.json(users))
    .catch(next))
  .get('/incomeLevel/:string', (req, res, next) =>
    User.findAll({where:{incomeLevel: req.params.string}})
    .then(users => res.json(users))
    .catch(next))
  .get('/ethnicity/:string', (req, res, next) =>
    User.findAll({where:{ethnicity: req.params.string}})
    .then(users => res.json(users))
    .catch(next))
  .get('/education/:string', (req, res, next) =>
    User.findAll({where:{education: req.params.string}})
    .then(users => res.json(users))
    .catch(next))
  .get('/maritalStatus/:string', (req, res, next) =>
    User.findAll({where:{maritalStatus: req.params.string}})
    .then(users => res.json(users))
    .catch(next))
  .get('/zip/:string', (req, res, next) =>
    User.findAll({where:{zip: req.params.string}})
    .then(users => res.json(users))
    .catch(next))
  .get('/gender/:string', (req, res, next) =>
    User.findAll({where:{gender: req.params.string}})
    .then(users => res.json(users))
    .catch(next))


// for each route we will eager load all recordings assocaited with users, map through all the users/recordings and create massize text stirng and then send over that string to watson, get back the data and analyze/