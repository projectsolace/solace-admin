'use strict'

const db = require('APP/db')
const Recording = require('APP/db/models/recording')
const chai = require('chai')
const chaiProperties = require('chai-properties')
const chaiThings = require('chai-things')
const expect = chai.expect
chai.use(chaiProperties)
chai.use(chaiThings)

describe('~~~~~ RECORDING MODEL ~~~~~', () => {
  before('wait for the db', () => db.didSync)

  const testRecording = {
    text: 'Atticus said to Jem one day, I’d rather you shot at tin cans in the backyard, but I know you’ll go after birds. Shoot all the blue jays you want, if you can hit ‘em, but remember it’s a sin to kill a mockingbird. That was the only time I ever heard Atticus say it was a sin to do something, and I asked Miss Maudie about it. Your father’s right, she said. Mockingbirds don’t do one thing except make music for us to enjoy. They don’t eat up people’s gardens, don’t nest in corn cribs, they don’t do one thing but sing their hearts out for us. That’s why it’s a sin to kill a mockingbird.',
    personality: [
      {quality: 'Adventurousness', score: 1.0},
      {quality: 'Artistic interests', score: 1.0}
    ],
    tone: [
      {quality: 'Anger', score: 1.0},
      {quality: 'Disgust', score: 1.0}
    ]
  };

  beforeEach('create testRecording', () => Recording.create(testRecording));
  afterEach('remove testRecording', () => db.sync({ force: true }));

  it('has the expected schema definitions', () => {
    return Recording.findOne({ where: { id: 1 }})
    .then(recording => {
      expect(recording.text).to.equal(testRecording.text);
      expect(recording.personality[0]).to.be.an('object');
      expect(recording.personality[0].quality).to.equal('Adventurousness');
      expect(recording.tone[0]).to.be.an('object');
      expect(recording.tone[0].quality).to.equal('Anger');
    });
  });

  it('requires text field to not be null', () => {
    const recording = Recording.build();
    return recording.validate()
      .then(err => {
        expect(err).to.be.an('object');
        expect(err.errors).to.contain.a.thing.with.properties({
          type: 'notNull Violation'
        });
      });
  });

  it('belongsTo User Model with user_id as foreign key', () => {
    return Recording.findOne({ where: { id: 1 }})
    .then(recording => {
      expect(recording.user_id).to.equal(null);
    });
  });
})
