const SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');

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
    console.log(x)
    res.send(x)
})
})

