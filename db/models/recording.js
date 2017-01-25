'use strict'

const Sequelize = require('sequelize')
const db = require('APP/db')

const Recording = db.define('recordings', {
  text: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  personality: Sequelize.JSON,
  tone: Sequelize.JSON
});

module.exports = Recording;
