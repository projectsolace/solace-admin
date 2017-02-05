const request = require('supertest-as-promised')
const {expect} = require('chai')
const db = require('APP/db')
const User = require('APP/db/models/user')
const Recording = require('APP/db/models/recording')
const Average = require('APP/db/models/average')
const app = require('APP/server/start')

describe('~~~~~ /api/users ~~~~~', () => {
  before('wait for the db', () => db.didSync)

  const testUser1 = {
    firstName: 'Jenny',
    lastName: 'Chan',
    email: 'jenny@jenny.jenny',
    gender: 'Female',
    dob: '9/14/1992',
    occupation: 'Student',
    incomeLevel: 'Under-$15,000',
    ethnicity: 'Asian',
    religion: 'Buddhism',
    education: 'Bachelor-Degree',
    maritalStatus: 'Single',
    zipCode: 11214,
    password: '123'
  };

  const testUser2 = {
    firstName: 'Anuj',
    lastName: 'Shah',
    email: 'anuj@anuj.anuj',
    gender: 'Male',
    dob: '8/12/1980',
    occupation: 'Engineering',
    incomeLevel: '$200,000-and-over',
    ethnicity: 'Indian',
    religion: 'Hinduism',
    education: 'Bachelor-Degree',
    maritalStatus: 'Single',
    zipCode: 10004,
    password: '123'
  };

  const testRecording1 = {
    text: 'I must not fear. Fear is the mind-killer. Fear is the little-death that brings total obliteration. I will face my fear. I will permit it to pass over me and through me. And when it has gone past I will turn the inner eye to see its path. Where the fear has gone there will be nothing. Only I will remain.',
    personality: Array(47).fill({quality: 'some personality quality', score: 0.0}),
    tone:  Array(13).fill({quality: 'some tone quality', score: 0.0}),
    created_at: '2017-02-02 22:38:58.302+00',
    user_id: 1
  }

  const testRecording2 = {
    text: 'You can tell yourself that you would be willing to lose everything you have in order to get something you want. But it’s a catch-22: all of those things you’re willing to lose are what make you recognizable. Lose them, and you’ve lost yourself.',
    personality: Array(47).fill({quality: 'some personality quality', score: 1.0}),
    tone: Array(13).fill({quality: 'some tone quality', score: 1.0}),
    created_at: '2017-02-04 22:38:58.302+00',
    user_id: 1
  }

  const testAverage = {
    value: 'all',
    personality: Array(47).fill({quality: 'some personality quality', score: 0.5}),
    tone: Array(13).fill({quality: 'some tone quality', score: 0.5}),
    user_id: 1
  };

  beforeEach('create test data', () => {
    return User.bulkCreate([testUser1, testUser2])
    .then(() => Recording.bulkCreate([testRecording1, testRecording2]))
    .then(() => Average.create(testAverage))
  })

  afterEach('remove test data', () => db.sync({ force: true }));

  describe('PUT /:id', () => {
    it('updates a user by id', () => {
      request(app)
        .put('/api/users/1')
        .send({ occupation: 'Engineering' })
        .expect(200)
        .then(res => {
          expect(res.body.occupation).to.be.equal('Engineering');
        });
    })
  })

  describe('GET /:id/singlerecording', () => {
    it('finds the latest recording of a user', () => {
      request(app)
        .get('/api/users/1/singlerecording')
        .expect(200)
    })

    it('and returns a JSON object with personality and tone keys', () => {
      request(app)
        .get('/api/users/1/singlerecording')
        .then(res => {
          expect(res.body.personality[0]).to.be.an('object');
          expect(res.body.personality[0].score).to.equal(1.0);
          expect(res.body.tone[0]).to.be.an('object');
          expect(res.body.tone[0].score).to.equal(1.0);
        });
    })
  })

  describe('GET /:id/allrecordings', () => {
    it('finds all recordings of a user', () => {
      request(app)
        .get('/api/users/1/allrecordings')
        .expect(200)
    })

    it('and returns a parsed data object', () => {
      request(app)
        .get('/api/users/1/allrecordings')
        .then(res => {
          expect(res.body.personality[0]).to.be.an('object');
          expect(res.body.personality[0].key).to.equal('some personality quality');
          expect(res.body.tone[0]).to.be.an('object');
          expect(res.body.tone[0].key).to.equal('some tone quality');
        });
    })
  })

  describe('POST /:id/allrecordings/average', () => {
    it('finds all recordings of a user and sends to Watson API', () => {
      request(app)
        .post('/api/users/1/allrecordings/average')
        .expect(200)
        .then(res => {
          expect(res.text).to.equal('complete');
        });
    })

    it('throws an error if there are no recordings yet', () => {
      request(app)
        .post('/api/users/2/allrecordings/average')
        .expect(500)
        .then(res => {
          expect(res.text).to.equal('cannot POST - no all time average recordings yet');
        });
    })
  })

  describe('GET /:id/allrecordings/average', () => {
    it('finds all average recordings data of a user', () => {
      request(app)
        .get('/api/users/1/allrecordings/average')
        .expect(200)
        .then(res => {
          expect(res.body.value).to.equal('all');
          expect(res.body.personality[0]).to.be.an('object');
          expect(res.body.personality[0].score).to.equal(0.5);
          expect(res.body.tone[0]).to.be.an('object');
          expect(res.body.tone[0].score).to.equal(0.5);
        });
    })
  })
})

  // describe('when not logged in', () => {
  //   it('GET /:id fails 401 (Unauthorized)', () =>
  //     request(app)
  //       .get(`/api/users/1`)
  //       .expect(401)
  //   )

  //   it('POST creates a user', () =>
  //     request(app)
  //       .post('/api/users')
  //       .send({
  //         email: 'beth@secrets.org',
  //         password: '12345'
  //       })
  //       .expect(201)
  //   )

  //   it('POST redirects to the user it just made', () =>
  //     request(app)
  //       .post('/api/users')
  //       .send({
  //         email: 'eve@interloper.com',
  //         password: '23456',
  //       })
  //       .redirects(1)
  //       .then(res => expect(res.body).to.contain({
  //         email: 'eve@interloper.com'
  //       }))
  //   )
  // })
