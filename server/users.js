'use strict'

const db = require('APP/db')
const User = db.model('users')
const Recording = db.model('recordings')

const {mustBeLoggedIn, forbidden,} = require('./auth.filters')

module.exports = require('express').Router()
	.get('/', forbidden('only admins can list users'), (req, res, next) =>
		User.findAll()
		.then(users => res.json(users))
		.catch(next))

	.post('/', (req, res, next) =>
		User.create(req.body)
		.then(user => res.status(201).json(user))
		.catch(next))

	.get('/:id', mustBeLoggedIn, (req, res, next) =>
		User.findById(req.params.id)
		.then(user => res.json(user))
		.catch(next))

	.get('/:id/allrecordings', mustBeLoggedIn, (req, res, next) =>
		Recording.findAll()
		.then(recordings => res.json(recordings))
		.catch(next))

	.get('/:id/weekrecordings', mustBeLoggedIn, (req, res, next) =>
		Recording.findAll({where:{}})
		.then(recordings => res.json(recordings))
		.catch(next))

	.get('/:id/monthrecordings', mustBeLoggedIn, (req, res, next) =>
		Recording.findAll({where:{}})
		.then(recordings => res.json(recordings))
		.catch(next))

	.get('/:id/allrecordings/average', mustBeLoggedIn, (req, res, next) =>
		Recording.findAll()
		.then(recordings => res.json(recordings))
		.catch(next))

	.get('/:id/weekrecordings/average', mustBeLoggedIn, (req, res, next) =>
		Recording.findAll({where:{}})
		.then(recordings => res.json(recordings))
		// here we will map the text of all the recordings into one big string and send over to watson. Then send over parsed info.
		.catch(next))

	.get('/:id/monthrecordings/average', mustBeLoggedIn, (req, res, next) =>
		Recording.findAll({where:{}})
		.then(recordings => res.json(recordings))
		// here we will map the text of all the recordings into one big string and send over to watson. Then send over parsed info.
		.catch(next))
