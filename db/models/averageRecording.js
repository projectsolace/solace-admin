'use strict'

const Sequelize = require('sequelize')
const db = require('APP/db')

const Average = db.define('averages', {
  value: Sequelize.TEXT,
  personality: Sequelize.JSON,
  tone: Sequelize.JSON,
  subject: Sequelize.STRING
});

module.exports = Average;
