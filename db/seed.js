'use strict';

const chalk = require('chalk');
const chance = require('chance')(123);
const Promise = require('bluebird');

const db = require('APP/db')
const User = require('APP/db/models/user');
const Question = require('APP/db/models/question');
const Quote = require('APP/db/models/quote')
const Recording = require('APP/db/models/recording');

const numUsers = 96; // + 4 hardcoded real users = 100 total users
const numRecordings = 500;
const emails = chance.unique(chance.email, numUsers);
const questionsJSON = require('./seedData/questionsSeed');
const quotesJSON = require('./seedData/quotesSeed');
const recordingsJSON = require('./seedData/recordingsSeed');
const realUsers = require('./seedData/usersSeed');
const data = require('./seedData/personalityToneSeed');

function doTimes (n, fn) {
  const results = [];
  while (n--) {
    results.push(fn());
  }
  return results;
}

function randUser () {
  return User.build({
    firstName: chance.first(),
    lastName: chance.last(),
    isAdmin: false,
    email: emails.pop(),
    gender: chance.gender(),
    dob: chance.birthday({ string: true }),
    occupation: chance.pickone(['Sales', 'Hospitality', 'Healthcare', 'Custodial', 'Accounting', 'Teaching', 'Law-Enforcement', 'Law', 'Finance', 'Engineering', 'Administration', 'Student', 'Other']),
    incomeLevel: chance.weighted(['Under-$15,000', '$15,000-to-$24,999', '$25,000-to-$34,999', '$35,000-to-$49,999', '$50,000-to-$74,999', '$75,000-to-$99,999', '$100,000-to-$149,999', '$150,000-to-$199,999', '$200,000-and-over'], [11.6, 10.5, 10, 12.7, 16.7, 12.1, 14.1, 6.2, 6.1]),
    ethnicity: chance.weighted(['White', 'Black', 'Hispanic', 'Asian', 'American-Indian/Alaska-Native', 'Hawaiian/Other-Pacific-Islander', 'Other'], [61, 12, 18, 6, 1, 0, 2]),
    religion: chance.weighted(['Protestant', 'Catholic', 'Mormon', 'Judaism', 'Islam', 'Buddhism', 'Hinduism', 'Other', 'Unaffiliated'], [46.5, 20.8, 1.6, 1.9, 0.9, 0.7, 0.7, 3.5, 23.4]),
    education: chance.weighted(['High-School', 'Some-College', 'Associate-Degree', 'Bachelor-Degree', 'Advanced-Degree'], [70, 15, 10, 4, 1]),
    maritalStatus: chance.weighted(['Single', 'Married', 'Widowed', 'Divorced'], [30.7, 46.2, 10.3, 12.8]),
    zipCode: chance.pickone([10001, 90210, 89049, 79936, 11109, 95834, 38639, 89109]),
    password: chance.word()
  });
}

function generateUsers () {
  const users = doTimes(numUsers, randUser);
  users.push(User.build(realUsers.jenny));
  users.push(User.build(realUsers.anuj));
  users.push(User.build(realUsers.winston));
  users.push(User.build(realUsers.jimmy));
  return users;
}

function createUsers () {
  return Promise.map(generateUsers(), user => {
    return user.save();
  });
}

function randRecording (createdUsers) {
  const user = chance.weighted(createdUsers, [...Array(96).fill(0.8), 5.8, 5.8, 5.8, 5.8]);
  const randomText = chance.pickset(recordingsJSON, 2).reduce((a, b) => a + b.text, '');
  return Recording.build({
    text: randomText,
    personality: data.personality,
    tone: data.tone,
    user_id: user.id,
    created_at: new Date(new Date() - 24 * 60 * 60 * 1000*Math.floor(Math.random()*60))
  });
}

function generateRecordings(createdUsers) {
  return doTimes(numRecordings, function() {
    return randRecording(createdUsers);
  });
}

function createRecordings (createdUsers) {
  return Promise.map(generateRecordings(createdUsers), recording => {
    return recording.save();
  });
}

function seed () {
  return Quote.bulkCreate(quotesJSON)
    .then(createdQuotes => {
      console.log(chalk.yellow(`Seeded ${createdQuotes.length} quotes OK`));
      return Question.bulkCreate(questionsJSON);
    })
    .then(createdQuestions => {
      console.log(chalk.yellow(`Seeded ${createdQuestions.length} questions OK`));
      return createUsers();
    })
    .then(createdUsers => {
      console.log(chalk.yellow(`Seeded ${createdUsers.length} users OK`));
      return createRecordings(createdUsers)
    })
    .then(createdRecordings => {
      console.log(chalk.yellow(`Seeded ${createdRecordings.length} recordings OK`));
    })
}


db.didSync
  .then(() => db.sync({force: true}))
  .then(seed)
  .then(() => console.log(chalk.yellow('Seeded successfully!')))
  .catch(error => console.error(error))
  .finally(() => db.close());

