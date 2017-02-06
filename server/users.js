'use strict'

const db = require('APP/db')
const User = db.model('users')
const Average = db.model('averages')
const Recording = db.model('recordings')
const { convertPersonalityData, convertToneData, parseOverTimeData, sendToWatson } = require('./utils')
const { mustBeLoggedIn, forbidden } = require('./auth.filters')

module.exports = require('express').Router()
  // .get('/', (req, res, next) =>
  //   User.findAll()
  //   .then(users => res.json(users))
  //   .catch(next))

  // .post('/', (req, res, next) =>
  //   User.create(req.body)
  //   .then(user => res.status(201).json(user))
  //   .catch(next))

  // .get('/:id', (req, res, next) =>
  //   User.findById(req.params.id)
  //   .then(user => res.json(user))
  //   .catch(next))

  // Updates a user's profile info
  .put('/:id', (req, res, next) =>
    User.update(req.body, { where: { id: +req.params.id },
      returning: true
    })
    .then(([amountOfUpdatedUsers, arrayOfUpdatedUsers]) => {
      res.status(200).json(arrayOfUpdatedUsers[0]);
    })
    .catch(next))

  // Finds the latest recording of a user
  .get('/:id/singlerecording', (req, res, next) =>
    Recording.findOne({ where: { user_id: req.params.id },
      order: [[ 'created_at', 'DESC' ]]
    })
    .then(foundRecording => {
      if (!foundRecording) res.send({});
      else res.json({
        personality: foundRecording.personality,
        tone: foundRecording.tone
      })
    })
    .catch(next))

  // Finds the last 7 days' recordings of a user
  .get('/:id/weekrecordings', (req, res, next) =>
    Recording.findAll({ where: {
      user_id: req.params.id,
      created_at: {
        $gt: new Date(new Date() - 7 * 24 * 60 * 60 * 1000)
      }
    }})
    .then(recordings => {
      if (recordings.length === 0) throw new Error('cannot GET - no weekly recordings yet');
      else res.send(parseOverTimeData(recordings));
    })
    .catch(err => res.send(err.message)))

  // Finds the last 30 days' recordings of a user
  .get('/:id/monthrecordings', (req, res, next) =>
    Recording.findAll({ where: {
      user_id: req.params.id,
      created_at: {
        $gt: new Date(new Date() - 30 * 24 * 60 * 60 * 1000)
      }
    }})
    .then(recordings => {
      if (recordings.length === 0) throw new Error('cannot GET - no monthly recordings yet');
      else res.send(parseOverTimeData(recordings));
    })
    .catch(err => res.send(err.message)))

  // Finds all recordings of a user
  .get('/:id/allrecordings', (req, res, next) =>
    Recording.findAll({ where: {
      user_id: req.params.id
    }})
    .then(recordings => {
      if (recordings.length === 0) throw new Error('cannot GET - no all time recordings yet');
      else res.send(parseOverTimeData(recordings))
    })
    .catch(err => res.send(err.message)))

  // Aggregates the last 7 days' recordings of a user, sends the text to Watson API, and posts the data results to Average Model
  .post('/:id/weekrecordings/average', (req, res, next) => {
    let personalityObject = {};
    Recording.findAll({ where: {
      user_id: req.params.id,
      created_at: {
        $gt: new Date(new Date() - 7 * 24 * 60 * 60 * 1000)
      }
    }})
    .then(recordings => {
      if (recordings.length === 0) throw new Error('cannot POST - no weekly average recordings yet');
      else {
        res.send('complete');
        return sendToWatson(recordings.reduce((a, b) => a + b.text + ' ', ' '))
      }
    })
    .then(resolved => {
      personalityObject['personality'] = convertPersonalityData(resolved[0]);
      personalityObject['tone'] = convertToneData(resolved[1]);
      Average.findOrCreate({ where: {
        user_id: req.params.id,
        value: 'week'
      }})
      .then(average => average[0].update({
        value: 'week',
        personality: personalityObject.personality,
        tone: personalityObject.tone
      }))
    })
    .catch(err => res.status(500).send(err.message));
  })

  // Aggregates the last 30 days' recordings of a user, sends the text to Watson API, and posts the data results to Average Model
  .post('/:id/monthrecordings/average', (req, res, next) => {
    let personalityObject = {};
    Recording.findAll({ where: {
      user_id: req.params.id,
      created_at: {
        $gt: new Date(new Date() - 30 * 24 * 60 * 60 * 1000)
      }
    }})
    .then(recordings => {
      if (recordings.length === 0) throw new Error('cannot POST - no monthly average recordings yet');
      else {
        res.send('complete');
        return sendToWatson(recordings.reduce((a, b) => a + b.text + ' ', ' '))
      }
    })
    .then(resolved => {
      personalityObject['personality'] = convertPersonalityData(resolved[0]);
      personalityObject['tone'] = convertToneData(resolved[1]);
      Average.findOrCreate({ where: {
        user_id: req.params.id,
        value: 'month'
      }})
      .then(average => average[0].update({
        value: 'month',
        personality: personalityObject.personality,
        tone: personalityObject.tone
      }))
    })
    .catch(err => res.status(500).send(err.message));
  })

  // Aggregates all recordings of a user, sends the text to Watson API, and posts the data results to Average Model
  .post('/:id/allrecordings/average', (req, res, next) => {
    let personalityObject = {};
    Recording.findAll({ where: {
      user_id: req.params.id
    }})
    .then(recordings => {
      if (recordings.length === 0) throw new Error('cannot POST - no all time average recordings yet');
      else {
        res.send('complete');
        return sendToWatson(recordings.reduce((a, b) => a + b.text + ' ', ' '))
      }
    })
    .then(resolved => {
      personalityObject['personality'] = convertPersonalityData(resolved[0]);
      personalityObject['tone'] = convertToneData(resolved[1]);
      Average.findOrCreate({ where: {
        user_id: req.params.id,
        value: 'all'
      }})
      .then(average => average[0].update({
        value: 'all',
        personality: personalityObject.personality,
        tone: personalityObject.tone
      }))
    })
    .catch(err => res.status(500).send(err.message));
  })

  // Finds the average data of the last 7 days' recordings of a user
  .get('/:id/weekrecordings/average', (req, res, next) =>
    Average.findOne({ where: {
      user_id: req.params.id,
      value: 'week'
    }})
    .then(average => res.send(average))
    .catch(next))

  // Finds the average data of the last 30 days' recordings of a user
  .get('/:id/monthrecordings/average', (req, res, next) =>
    Average.findOne({ where: {
      user_id: req.params.id,
      value: 'month'
    }})
    .then(average => res.send(average))
    .catch(next))

  // Finds the average data of all recordings of a user
  .get('/:id/allrecordings/average', (req, res, next) =>
    Average.findOne({ where: {
      user_id: req.params.id,
      value: 'all'
    }})
    .then(average => res.send(average))
    .catch(next))
