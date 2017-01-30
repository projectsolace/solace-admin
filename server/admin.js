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

function sendToWatson(text){
  let personalityObject = {personality:[],tone:[]}

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

         personality_insights.profile({
            text: text,
            consumption_preferences: true
        }, (err, response) => {
              if (err) console.log(err);
              else {
                response = convertPersonalityData(response);
                 personalityObject['personality'] = response
        tone_analyzer.tone({
          text: text
           }, (err, tone) => {
              if (err) console.log(err);
              else {
                  tone = convertToneData(tone);
                  personalityObject['tone'] = tone
                  console.log(personalityObject)
            }
          })

                }
        })


      }

module.exports = require('express').Router()

  .get('/religion/test', (req, res, next) =>{
    let watson = sendToWatson(`I stand here today humbled by the task before us, grateful for the trust you have bestowed, mindful of the sacrifices borne by our ancestors. I thank President Bush for his service to our nation, as well as the generosity and cooperation he has shown throughout this transition. Forty-four Americans have now taken the presidential oath. The words have been spoken during rising tides of prosperity and the still waters of peace. Yet, every so often the oath is taken amidst gathering clouds and raging storms. At these moments, America has carried on not simply because of the skill or vision of those in high office, but because We the People have remained faithful to the ideals of our forbearers, and true to our founding documents. So it has been. So it must be with this generation of Americans.That we are in the midst of crisis is now well understood. Our nation is at war, against a far-reaching network of violence and hatred. Our economy is badly weakened, a consequence of greed and irresponsibility on the part of some, but also our collective failure to make hard choices and prepare the nation for a new age. Homes have been lost; jobs shed; businesses shuttered. Our health care is too costly; our schools fail too many; and each day brings further evidence that the ways we use energy strengthen our adversaries and threaten our planet.`)
    res.send(watson)
   })

  .get('/religion/:string', (req, res, next) =>
    User.findAll({
        where: { religion: req.params.string },
        include: [{
        model: Recording
    }]
})
    .then(Users => res.json(Users.map(user=>user.recordings.map(recording=>recording.text))[0].join(" "))
    .catch(next)))

  .get('/occupation/:string', (req, res, next) =>
     User.findAll({
        where: { occupation: req.params.string },
        include: [{
        model: Recording
    }]
})
    .then(Users => res.json(Users.map(user=>user.recordings.map(recording=>recording.text))[0].join(" "))
    .catch(next)))

  .get('/incomeLevel/:string', (req, res, next) =>
     User.findAll({
        where: { incomeLevel: req.params.string },
        include: [{
        model: Recording
    }]
})
    .then(Users => res.json(Users.map(user=>user.recordings.map(recording=>recording.text))[0].join(" "))
    .catch(next)))

  .get('/ethnicity/:string', (req, res, next) =>
     User.findAll({
        where: { ethnicity: req.params.string },
        include: [{
        model: Recording
    }]
})
    .then(Users => res.json(Users.map(user=>user.recordings.map(recording=>recording.text))[0].join(" "))
    .catch(next)))

  .get('/education/:string', (req, res, next) =>
    User.findAll({
        where: { education: req.params.string },
        include: [{
        model: Recording
    }]
})

    .then(Users => res.json(Users.map(user=>user.recordings.map(recording=>recording.text))[0].join(" "))
    .catch(next)))

  .get('/maritalStatus/:string', (req, res, next) =>
     User.findAll({
        where: { maritalStatus: req.params.string },
        include: [{
        model: Recording
    }]
})

    .then(Users => res.json(Users.map(user=>user.recordings.map(recording=>recording.text))[0].join(" "))
    .catch(next)))

  .get('/zipCode/:string', (req, res, next) =>
     User.findAll({
        where: { zipCode: Number(req.params.string) },
        include: [{
        model: Recording
    }]
})

    .then(Users => res.json(Users.map(user=>user.recordings.map(recording=>recording.text))[0].join(" "))
    .catch(next)))

  .get('/gender/:string', (req, res, next) =>
     User.findAll({
        where: { gender: req.params.string },
        include: [{
        model: Recording
    }]
})
    .then(Users => res.json(Users.map(user=>user.recordings.map(recording=>recording.text))[0].join(" "))
    .catch(next)))



// for each route we will eager load all recordings assocaited with users, map through all the users/recordings and create massize text stirng and then send over that string to watson, get back the data and analyze/