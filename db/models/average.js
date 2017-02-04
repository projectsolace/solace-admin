'use strict'

const Sequelize = require('sequelize')
const db = require('APP/db')

const Average = db.define('averages', {
  value: Sequelize.STRING,
  personality: Sequelize.JSON,
  tone: Sequelize.JSON
});

module.exports = Average;
