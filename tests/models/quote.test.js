'use strict'

const db = require('APP/db')
const Quote = require('APP/db/models/quote')
const chai = require('chai')
const chaiProperties = require('chai-properties')
const chaiThings = require('chai-things')
const expect = chai.expect
chai.use(chaiProperties)
chai.use(chaiThings)

describe('~~~~~ QUOTE MODEL ~~~~~', () => {
  before('wait for the db', () => db.didSync)

  const testQuote = {
    quote: 'The biggest room in the world is room for improvement.'
  };

  beforeEach('create testQuote', () => Quote.create(testQuote));
  afterEach('remove testQuote', () => db.sync({ force: true }));

  it('has the expected schema definition', () => {
    return Quote.findOne({ where: { id: 1 }})
    .then(quote => {
      expect(quote.quote).to.equal(testQuote.quote);
    });
  });

  it('requires quote field to not be null', () => {
    const quote = Quote.build();
    return quote.validate()
      .then(err => {
        expect(err).to.be.an('object');
        expect(err.errors).to.contain.a.thing.with.properties({
          type: 'notNull Violation'
        });
      });
  });
})
