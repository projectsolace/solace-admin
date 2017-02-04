'use strict'

const db = require('APP/db')
const Question = require('APP/db/models/question')
const chai = require('chai')
const chaiProperties = require('chai-properties')
const chaiThings = require('chai-things')
const expect = chai.expect
chai.use(chaiProperties)
chai.use(chaiThings)

describe('~~~~~ QUESTION MODEL ~~~~~', () => {
  before('wait for the db', () => db.didSync)

  const testQuestion = {
    question: 'How are you feeling today?'
  };

  beforeEach('create testQuestion', () => Question.create(testQuestion));
  afterEach('remove testQuestion', () => db.sync({ force: true }));

  it('has the expected schema definition', () => {
    return Question.findOne({ where: { id: 1 }})
    .then(question => {
      expect(question.question).to.equal(testQuestion.question);
    });
  });

  it('requires question field to not be null', () => {
    const question = Question.build();
    return question.validate()
      .then(err => {
        expect(err).to.be.an('object');
        expect(err.errors).to.contain.a.thing.with.properties({
          type: 'notNull Violation'
        });
      });
  });
})
