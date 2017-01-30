'use strict'

const db = require('APP/db')
const User = db.model('users')
const Recording = db.model('recordings')

const {mustBeLoggedIn, forbidden,} = require('./auth.filters')

function parseOverTimeData(recordings) {
	let overTimeObject = {}
	let datapersonality = []
	let datatonal = []
	for (var i = 0; i < 47; i++) {
		datapersonality.push({
			key: recordings[0].personality[i].quality,
			value: []
		})

		recordings.forEach(function(obj) {
			datapersonality[i].value.push({
				date: obj.created_at,
				quality: obj.personality[i].quality,
				score: obj.personality[i].score
			})
		})
	}
	overTimeObject.personality = datapersonality

	for (var i = 0; i < 13; i++) {
		datatonal.push({
			key: recordings[0].tone[i].quality,
			value: []
		})
		recordings.forEach(function(obj) {

			datatonal[i].value.push({
				date: obj.created_at,
				quality: obj.tone[i].quality,
				score: obj.tone[i].score
			})

		})
	}
	overTimeObject.tonal = datatonal
	return overTimeObject

}

module.exports = require('express').Router()
	.get('/', (req, res, next) =>
		User.findAll()
		.then(users => res.json(users))
		.catch(next))

	.post('/', (req, res, next) =>
		User.create(req.body)
		.then(user => res.status(201).json(user))
		.catch(next))

	.get('/:id', (req, res, next) =>
		User.findById(req.params.id)
		.then(user => res.json(user))
		.catch(next))

	.get('/:id/allrecordings', (req, res, next) =>
		Recording.findAll()
		.then(recordings => {
			res.send(parseOverTimeData(recordings))
				})
				.catch(next))

	.get('/:id/weekrecordings', (req, res, next) =>
		Recording.findAll({
			where: {
			user_id: req.params.id,
		   created_at: {
    			$gt: new Date(new Date() - 7 * 24 * 60 * 60 * 1000)
     				 }}})
		.then(recordings => {
			res.send(parseOverTimeData(recordings))
			})
			.catch(next))

	.get('/:id/monthrecordings', (req, res, next) =>
		Recording.findAll({where: {
			 user_id: req.params.id,
		   created_at: {
    			$gt: new Date(new Date() - 30 * 24 * 60 * 60 * 1000)
     				 }}})
		.then(recordings => {
			res.send(parseOverTimeData(recordings))
			})
		.catch(next))

	.get('/:id/allrecordings/average',(req, res, next) =>
		Recording.findAll()
		.then(recordings => recordings.reduce(function(a,b){return a+b.text+" "}," "))
		.then(text=>res.send(text))
		.catch(next))

	.get('/:id/weekrecordings/average', (req, res, next) =>
		Recording.findAll({
			where: {
			user_id: req.params.id,
		   created_at: {
    			$gt: new Date(new Date() - 7 * 24 * 60 * 60 * 1000)
     				 }}})
		.then(recordings => recordings.reduce(function(a,b){return a+b.text+" "}," "))
		.then(text=>res.send(text))
		.catch(next))

	.get('/:id/monthrecordings/average', (req, res, next) =>
		Recording.findAll({where: {
			 user_id: req.params.id,
		   created_at: {
    			$gt: new Date(new Date() - 30 * 24 * 60 * 60 * 1000)
     				 }}})
		.then(recordings => recordings.reduce(function(a,b){return a+b.text+" "}," "))
		.then(text=>res.send(text))
		.catch(next))
