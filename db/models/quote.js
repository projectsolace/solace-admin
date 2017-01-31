'use strict'

const Sequelize = require('sequelize')
const db = require('APP/db')

const Quote = db.define('quotes', {
  quote: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Quote;
