'use strict'

const Sequelize = require('sequelize')
const db = require('APP/db')

const Recording = db.define('recordings', {
  text: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  personality: Sequelize.JSON,
  tone: Sequelize.JSON,
  created_at: Sequelize.DATE
});

module.exports = Recording;
