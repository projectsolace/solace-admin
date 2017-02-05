const db = require('../db');
const Recording = db.model('recordings');
const User = db.model('users');
const { convertPersonalityData, convertToneData, sendToWatson, parseAdmin } = require('./utils')

module.exports = require('express').Router()
  // RELIGION
  .get('/religion/:string', (req, res, next) => {
    let personalityObject = { personality: [], tone: [] }
    User.findAll({
      where: { religion: req.params.string },
      include: [{ model: Recording }]
    })
    .then(users => sendToWatson(parseAdmin(users))
    .then(resolved => {
      personalityObject['personality'] = convertPersonalityData(resolved[0]);
      personalityObject['tone'] = convertToneData(resolved[1]);
      res.send(personalityObject);
    }))
  })

  // OCCUPATION
  .get('/occupation/:string', (req, res, next) => {
    let personalityObject = { personality: [], tone: [] }
    User.findAll({
      where: { occupation: req.params.string },
      include: [{ model: Recording }]
    })
    .then(users => sendToWatson(parseAdmin(users))
    .then(resolved => {
      personalityObject['personality'] = convertPersonalityData(resolved[0]);
      personalityObject['tone'] = convertToneData(resolved[1]);
      res.send(personalityObject);
    }))
  })

  // INCOME LEVEL
  .get('/incomeLevel/:string', (req, res, next) => {
    let personalityObject = { personality: [], tone: [] }
    User.findAll({
      where: { incomeLevel: req.params.string },
      include: [{ model: Recording }]
    })
    .then(users => sendToWatson(parseAdmin(users))
    .then(resolved => {
      personalityObject['personality'] = convertPersonalityData(resolved[0]);
      personalityObject['tone'] = convertToneData(resolved[1]);
      res.send(personalityObject);
    }))
  })

  // ETHNICITY
  .get('/ethnicity/:string', (req, res, next) => {
    let personalityObject = { personality: [], tone: [] }
    User.findAll({
      where: { ethnicity: req.params.string },
      include: [{ model: Recording }]
    })
    .then(users => sendToWatson(parseAdmin(users))
    .then(resolved => {
      personalityObject['personality'] = convertPersonalityData(resolved[0]);
      personalityObject['tone'] = convertToneData(resolved[1]);
      res.send(personalityObject);
    }))
  })

  // EDUCATION
  .get('/education/:string', (req, res, next) => {
    let personalityObject = { personality: [], tone: [] }
    User.findAll({
      where: { education: req.params.string },
      include: [{ model: Recording }]
    })
    .then(users => sendToWatson(parseAdmin(users))
    .then(resolved => {
      personalityObject['personality'] = convertPersonalityData(resolved[0]);
      personalityObject['tone'] = convertToneData(resolved[1]);
      res.send(personalityObject);
    }))
  })

  // MARITAL STATUS
  .get('/maritalStatus/:string', (req, res, next) => {
    let personalityObject = { personality: [], tone: [] }
    User.findAll({
      where: { maritalStatus: req.params.string },
      include: [{ model: Recording }]
    })
    .then(users => sendToWatson(parseAdmin(users))
    .then(resolved => {
      personalityObject['personality'] = convertPersonalityData(resolved[0]);
      personalityObject['tone'] = convertToneData(resolved[1]);
      res.send(personalityObject);
    }))
  })

  // ZIP CODE
  .get('/zipCode/:string', (req, res, next) => {
    let personalityObject = { personality: [], tone: [] }
    User.findAll({
      where: { zipCode: Number(req.params.string) },
      include: [{ model: Recording }]
    })
    .then(users => sendToWatson(parseAdmin(users))
    .then(resolved => {
      personalityObject['personality'] = convertPersonalityData(resolved[0]);
      personalityObject['tone'] = convertToneData(resolved[1]);
      res.send(personalityObject);
    }))
  })

  // GENDER
  .get('/gender/:string', (req, res, next) => {
    let personalityObject = { personality: [], tone: [] }
    User.findAll({
      where: { gender: req.params.string },
      include: [{ model: Recording }]
    })
    .then(users => sendToWatson(parseAdmin(users))
    .then(resolved => {
      personalityObject['personality'] = convertPersonalityData(resolved[0]);
      personalityObject['tone'] = convertToneData(resolved[1]);
      res.send(personalityObject);
    }))
  })
