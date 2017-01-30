const db = require('../db');
const Recording = db.model('recordings');
const User = db.model('users');
const axios = require('axios');
const SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
const PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');
const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');


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

function parseAdmin(Users){
    return Users.map(user=>user.recordings.map(recording=>recording.text))[0].join(" ")
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


///RELIGION
  .get('/religion/:string', (req, res, next) =>{
    let personalityObject = {personality:[],tone:[]}
    User.findAll({
        where: { religion: req.params.string },
        include: [{
        model: Recording
    }]
})
    .then(Users => sendToWatson(parseAdmin(Users)).then(resolved=> {
       personalityObject['personality'] = convertPersonalityData(resolved[0]);
       personalityObject['tone'] = convertToneData(resolved[1]);
       res.send(personalityObject)
    }))
  })


//OCCUPATION
  .get('/occupation/:string', (req, res, next) =>{
    let personalityObject = {personality:[],tone:[]}
     User.findAll({
        where: { occupation: req.params.string },
        include: [{
        model: Recording
    }]
})
   .then(Users => sendToWatson(parseAdmin(Users)).then(resolved=> {
       personalityObject['personality'] = convertPersonalityData(resolved[0]);
       personalityObject['tone'] = convertToneData(resolved[1]);
       res.send(personalityObject)
    }))
  })

// INCOME LEVEL
   .get('/incomeLevel/:string', (req, res, next) =>{
    let personalityObject = {personality:[],tone:[]}
     User.findAll({
        where: { incomeLevel: req.params.string },
        include: [{
        model: Recording
    }]
})
   .then(Users => sendToWatson(parseAdmin(Users)).then(resolved=> {
       personalityObject['personality'] = convertPersonalityData(resolved[0]);
       personalityObject['tone'] = convertToneData(resolved[1]);
       res.send(personalityObject)
    }))
  })


// ETHNICITY
   .get('/ethnicity/:string', (req, res, next) =>{
    let personalityObject = {personality:[],tone:[]}
     User.findAll({
        where: { ethnicity: req.params.string },
        include: [{
        model: Recording
    }]
})
   .then(Users => sendToWatson(parseAdmin(Users)).then(resolved=> {
       personalityObject['personality'] = convertPersonalityData(resolved[0]);
       personalityObject['tone'] = convertToneData(resolved[1]);
       res.send(personalityObject)
    }))
  })

// EDUCATION
   .get('/education/:string', (req, res, next) =>{
    let personalityObject = {personality:[],tone:[]}
     User.findAll({
        where: { education: req.params.string },
        include: [{
        model: Recording
    }]
})
   .then(Users => sendToWatson(parseAdmin(Users)).then(resolved=> {
       personalityObject['personality'] = convertPersonalityData(resolved[0]);
       personalityObject['tone'] = convertToneData(resolved[1]);
       res.send(personalityObject)
    }))
  })

// MARITAL STATUS
   .get('/maritalStatus/:string', (req, res, next) =>{
    let personalityObject = {personality:[],tone:[]}
     User.findAll({
        where: { maritalStatus: req.params.string },
        include: [{
        model: Recording
    }]
})
   .then(Users => sendToWatson(parseAdmin(Users)).then(resolved=> {
       personalityObject['personality'] = convertPersonalityData(resolved[0]);
       personalityObject['tone'] = convertToneData(resolved[1]);
       res.send(personalityObject)
    }))
  })

// ZIP CODE
  .get('/zipCode/:string', (req, res, next) =>{
    let personalityObject = {personality:[],tone:[]}
     User.findAll({
        where: { zipCode: Number(req.params.string) },
        include: [{
        model: Recording
    }]
})
   .then(Users => sendToWatson(parseAdmin(Users)).then(resolved=> {
       personalityObject['personality'] = convertPersonalityData(resolved[0]);
       personalityObject['tone'] = convertToneData(resolved[1]);
       res.send(personalityObject)
    }))
  })

// GENDER
  .get('/gender/:string', (req, res, next) =>{
    let personalityObject = {personality:[],tone:[]}
     User.findAll({
        where: { gender: req.params.string },
        include: [{
        model: Recording
    }]
})
   .then(Users => sendToWatson(parseAdmin(Users)).then(resolved=> {
       personalityObject['personality'] = convertPersonalityData(resolved[0]);
       personalityObject['tone'] = convertToneData(resolved[1]);
       res.send(personalityObject)
    }))
  })



