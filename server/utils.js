'use strict';

const PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');
const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

function convertText(obj) {
    let text = '';
    obj.results.forEach(result => {
        text += result.alternatives[0].transcript
    });
    return text;
}

function convertPersonalityData(obj) {
  let data = [];
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

function parseOverTimeData(recordings) {
  let overTimeObject = {};
  let datapersonality = [];
  let datatonal = [];
  for (let i = 0; i < 47; i++) {
    datapersonality.push({
      key: recordings[0].personality[i].quality,
      value: []
    });

    recordings.forEach((obj, index) => datapersonality[i].value.push({
      date: index,
      quality: obj.personality[i].quality,
      score: obj.personality[i].score
    }));
  }

  overTimeObject.personality = datapersonality;

  for (let i = 0; i < 13; i++) {
    datatonal.push({
      key: recordings[0].tone[i].quality,
      value: []
    });

    recordings.forEach((obj, index) => datatonal[i].value.push({
      date: index,
      quality: obj.tone[i].quality,
      score: obj.tone[i].score
    }));
  }

  overTimeObject.tone = datatonal;
  return overTimeObject;
}

function sendToWatson(text) {
  text = text.substr(0, 80000);

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

  let p1 = promisifiedProfile();
  let p2 = promisifiedTone();
  return Promise.all([p1, p2]);
}

const parseAdmin = function(users) {
  return users.map(user => user.recordings.map(recording => recording.text))[0].join(' ');
}

module.exports = {
  convertText,
  convertPersonalityData,
  convertToneData,
  parseOverTimeData,
  sendToWatson,
  parseAdmin
}
