'use strict'

const Sequelize = require('sequelize')
const db = require('APP/db')

const Question = db.define('questions', {
  question: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Question;
