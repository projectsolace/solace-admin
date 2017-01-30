const fs = require('fs');
const path = require('path');
const chance = require('chance')();

const db = require('../db');
const Question = db.model('questions');

// Default: Randomly select three questions
module.exports = require('express').Router()
    .get('/', (req, res, next) => {
      Question.findAll()
      .then(questions => {
          res.status(200).send(chance.pickset(questions, 3))
      })
    })