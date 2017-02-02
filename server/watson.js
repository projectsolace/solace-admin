const SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
const PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');
const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
const fs = require('fs');
const path = require('path');
const http = require("http");
const request = require('request')
const Promise = require('bluebird')

const db = require('../db');
const Recording = db.model('recordings');

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

module.exports = require('express').Router()


//speech to text to watson route
    .post('/', (req, res, next) => {
        const speech_to_text = new SpeechToTextV1({
            username: '3f0eb922-3f9e-4f20-a075-7664696537f6',
            password: '6lY3qlbd00Ah'
        });


        let file = fs.createWriteStream("file2.wav")
        let stream = request('https://watsonapi.s3.amazonaws.com/%2Ftest.wav').pipe(file)
        stream.on('finish', function(){

        file = fs.createReadStream('file2.wav')

        const config = {
            // From file
            audio: file,
            content_type: 'audio/wav',
            continuous: true
        };


        speech_to_text.recognize(config, (err, resp) => {
            if (err) console.log(err);
            else {
              // on "finish" code
              resp = convertText(resp);
              Recording.create({ text: resp, user_id: req.body.userID })
                  .then(recording => {
                      const personality_insights = new PersonalityInsightsV3({
                          username: '825e1257-f5af-43d4-8afa-79d6fa99d4aa',
                          password: 'qK2HGTmsrYdO',
                          version_date: '2016-10-19'
                      });

                      personality_insights.profile({
                          text: recording.text,
                          consumption_preferences: true
                      }, (err, response) => {
                          if (err) console.log(err);
                          else {
                            response = convertPersonalityData(response);
                            recording.update({ personality: response })
                                .then(recording => {
                                    const tone_analyzer = new ToneAnalyzerV3({
                                        username: '973b3ea5-4733-4fd3-a5af-f1edb7ddd485',
                                        password: '1E3Qbkhx3RKI',
                                        version_date: '2016-05-19'
                                    });

                                    tone_analyzer.tone({ text: recording.text }, (err, tone) => {
                                        if (err) console.log(err);
                                        else {
                                            tone = convertToneData(tone);

                                            recording.update({ tone: tone })
                                                .then(recording => {
                                                    res.send(recording)
                                                })
                                        }
                                    });
                                })
                          }
                      });
                  })
              }
        })
    })

  })
