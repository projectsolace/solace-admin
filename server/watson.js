const SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
var PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3')
var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
const db = require('../db')
const Recording = db.model('recordings')

const fs = require('fs');
const path = require('path')

module.exports = require('express').Router()
  .get('/', (req, res, next) => {
      console.log(__dirname)
     var speech_to_text = new SpeechToTextV1({
  username: '3f0eb922-3f9e-4f20-a075-7664696537f6',
  password: '6lY3qlbd00Ah'
});

var params = {
  // From file
  audio: fs.createReadStream(path.join(__dirname, 'LailaFlac.flac')),
  content_type: 'audio/flac',
  continuous:true,
  model: 'en-US_NarrowbandModel'
};

speech_to_text.recognize(params, function(err, resp) {
  if (err)
    console.log(err);
  else
    var x = resp
    var textconvert = function(obj){
      var text = ''
      obj.results.forEach(function(result){
        text += result.alternatives[0].transcript
      })
      return text
    }
    x = textconvert(x)

    Recording.create({text: x})
    .then(function(recording){
      var personality_insights = new PersonalityInsightsV3({
        username: '825e1257-f5af-43d4-8afa-79d6fa99d4aa',
        password: 'qK2HGTmsrYdO',
        version_date: '2016-10-19'
      });

      personality_insights.profile({
        text: recording.text,
        consumption_preferences: true
        },
        function (err, response) {
          if (err)
            console.log('error:', err);
          else
            function v(obj){
              var data = []
              var keys = Object.keys(obj)
              for(var key in obj){
                if(key === 'personality'){
                  for(var i= 0;i<obj.personality.length;i++){
                    var array = obj.personality[i].children
                    array.forEach(function(child){
                      data.push({quality: child.name, score: child.percentile})
                    })
                    }
                }
                else if(key === 'needs' || key ==='values'){
                  var array2 = obj[key]
                  array2.forEach(function(child){ data.push({quality: child.name, score: child.percentile})})
                }
                    }
                    return data
                  }

                  response = v(response)

                  recording.update({personality: response})
                  .then(function(recording){
                    var tone_analyzer = new ToneAnalyzerV3({
                      username: '973b3ea5-4733-4fd3-a5af-f1edb7ddd485',
                      password: '1E3Qbkhx3RKI',
                      version_date: '2016-05-19'
                    });

                    tone_analyzer.tone({ text: recording.text },
                      function(err, tone) {
                        if (err)
                          console.log(err);
                        else
                          function h(obj){
                            var data2 = []
                            obj.document_tone.tone_categories.forEach(function(category){
                              category.tones.forEach(function(tone){
                                data2.push({quality: tone.tone_name, score: tone.score })
                                })
                              })
                                  return data2
                                }
                                tone = h(tone)
                                recording.update({tone: tone})
                                .then(function(recording){
                                  res.send(recording)
                                })
                    });
                  })
      });
    })
})
})

