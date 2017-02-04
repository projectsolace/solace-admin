'use strict'

const db = require('APP/db')
const Average = require('APP/db/models/average')
const chai = require('chai')
const chaiProperties = require('chai-properties')
const chaiThings = require('chai-things')
const expect = chai.expect
chai.use(chaiProperties)
chai.use(chaiThings)

describe('~~~~~ AVERAGE MODEL ~~~~~', () => {
  before('wait for the db', () => db.didSync)

  const testAverage = {
    value: 'week',
    personality: [
      {quality: 'Adventurousness', score: 1.0},
      {quality: 'Artistic interests', score: 1.0}
    ],
    tone: [
      {quality: 'Anger', score: 1.0},
      {quality: 'Disgust', score: 1.0}
    ]
  };

  beforeEach('create testAverage', () => Average.create(testAverage));
  afterEach('remove testAverage', () => db.sync({ force: true }));

  it('has the expected schema definitions', () => {
    return Average.findOne({ where: { id: 1 }})
    .then(average => {
      expect(average.value).to.equal(testAverage.value);
      expect(average.personality[0]).to.be.an('object');
      expect(average.personality[0].quality).to.equal('Adventurousness');
      expect(average.tone[0]).to.be.an('object');
      expect(average.tone[0].quality).to.equal('Anger');
    });
  });

  it('belongsTo User Model with user_id as foreign key', () => {
    return Average.findOne({ where: { id: 1 }})
    .then(average => {
      expect(average.user_id).to.equal(null);
    });
  });
})
