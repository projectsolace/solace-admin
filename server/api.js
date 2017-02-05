'use strict'

const db = require('APP/db')
const api = module.exports = require('express').Router()

api
  .use('/auth', require('./auth'))
  .use('/users', require('./users'))
  .use('/watson', require('./watson'))
  .use('/admin', require('./admin'))
  .use('/questions', require('./questions'))
  .use('/protected', require('./protected'))
  .use('/tokens', require('./tokens'))

// No routes matched? 404.
api.use((req, res) => res.status(404).end())
