'use strict'

const db = require('APP/db')
const User = db.model('users')
const Recording = db.model('recordings')
const PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');
const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

const {mustBeLoggedIn, forbidden,} = require('./auth.filters')

function convertPersonalityData(obj) {
    let data = [];
    const keys = Object.keys(obj);
    for (let key in obj) {
        if (key === 'personality') {
            for (let i = 0; i < obj.personality.length; i++) {
                const arrayA = obj.personality[i].children;
                arrayA.forEach(child => data.push({
                    quality: child.name,
                    score: child.percentile
                }));
            }
        } else if (key === 'needs' || key === 'values') {
            const arrayB = obj[key];
            arrayB.forEach(child => data.push({
                quality: child.name,
                score: child.percentile
            }));
        }
    }
    return data;
}

function convertToneData(obj) {
    let data = [];
    obj.document_tone.tone_categories.forEach(category => {
        category.tones.forEach(tone => data.push({
            quality: tone.tone_name,
            score: tone.score
        }))
    });
    return data;
}

function parseOverTimeData(recordings){
	let overTimeObject = {}
	let datapersonality=[]
	let datatonal = []
			for(var i=0;i<47;i++){
		  		datapersonality.push({key: recordings[0].personality[i].quality, value:[]})

		  		recordings.forEach(function(obj){
		    	datapersonality[i].value.push({date:obj.created_at, quality:obj.personality[i].quality, score:obj.personality[i].score})
  	})
		}
			overTimeObject.personality = datapersonality

			for(var i=0;i<14;i++){
  				datatonal.push({key: recordings[0].tone[i].quality, value:[]})
  				recordings.forEach(function(obj){

    			datatonal[i].value.push({date:obj.created_at, quality:obj.tone[i].quality, score:obj.tone[i].score})

 		})
		}
			overTimeObject.tonal = datatonal
			return overTimeObject

}

function sendToWatson(text){
  console.log('HERE WE ARE', typeof text)

  const personality_insights = new PersonalityInsightsV3({
          username: '825e1257-f5af-43d4-8afa-79d6fa99d4aa',
          password: 'qK2HGTmsrYdO',
          version_date: '2016-10-19'
        });

    const tone_analyzer = new ToneAnalyzerV3({
          username: '973b3ea5-4733-4fd3-a5af-f1edb7ddd485',
          password: '1E3Qbkhx3RKI',
          version_date: '2016-05-19'
        });

    const promisifiedProfile = function() {
      return new Promise(function(resolve, reject) {
        personality_insights.profile({
            text: text,
            consumption_preferences: true
        }, (err, response) => {
          if (err) reject(err);
          else resolve(response);
        })
      })
    }

    const promisifiedTone = function() {
      return new Promise(function(resolve, reject) {
        tone_analyzer.tone({
          text: text
        }, (err, tone) => {
          if (err) reject(err);
          else resolve(tone);
        })
      })
    }

  let p1 = promisifiedProfile()
  let p2 = promisifiedTone()

  return Promise.all([p1,p2])

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

	.get('/:id/allrecordings/average',(req, res, next) =>{
		let personalityObject = {}
		Recording.findAll()
		.then(recordings => {
			return sendToWatson(recordings.reduce(function(a,b){return a+b.text+" "}," "))
		})
		.then(resolved=>{
			 personalityObject['personality'] = convertPersonalityData(resolved[0]);
       personalityObject['tone'] = convertToneData(resolved[1]);
       res.send(personalityObject)
		})
	})

	.get('/:id/weekrecordings/average', (req, res, next) =>{
		let personalityObject = {}
		Recording.findAll({
			where: {
			user_id: req.params.id,
		   created_at: {
    			$gt: new Date(new Date() - 7 * 24 * 60 * 60 * 1000)
     				 }}})
		.then(recordings => {
			return sendToWatson(recordings.reduce(function(a,b){return a+b.text+" "}," "))
		})
		.then(resolved=>{
			 personalityObject['personality'] = convertPersonalityData(resolved[0]);
       personalityObject['tone'] = convertToneData(resolved[1]);
       res.send(personalityObject)
		})
	})

	.get('/:id/monthrecordings/average', (req, res, next) =>{
		let personalityObject = {}
		Recording.findAll({where: {
			 user_id: req.params.id,
		   created_at: {
    			$gt: new Date(new Date() - 30 * 24 * 60 * 60 * 1000)
     				 }}})
		.then(recordings => {
			return sendToWatson(recordings.reduce(function(a,b){return a+b.text+" "}," "))
		})
		.then(resolved=>{
			 personalityObject['personality'] = convertPersonalityData(resolved[0]);
       personalityObject['tone'] = convertToneData(resolved[1]);
       res.send(personalityObject)
		})
	})



