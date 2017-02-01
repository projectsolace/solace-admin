'use strict';

const chalk = require('chalk');
const chance = require('chance')(123);
const Promise = require('bluebird');

const db = require('APP/db')
const User = require('APP/db/models/user');
const Question = require('APP/db/models/question');
const Quote = require('APP/db/models/quote')
const Recording = require('APP/db/models/recording');

const numUsers = 96;
const numRecordings = 500;
const emails = chance.unique(chance.email, numUsers);
const questionsJSON = require('./questionsSeed');
const quotesJSON = require('./quotesSeed');
const recordingsJSON = require('./recordingsSeed');

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

const jenny = {
  firstName: 'Jenny',
  lastName: 'Chan',
  isAdmin: true,
  email: 'jenny@jenny.jenny',
  gender: 'female',
  dob: '9/14/1992',
  occupation: 'student',
  incomeLevel: 'Under $15,000',
  ethnicity: 'Asian',
  religion: 'Buddhism',
  education: 'Bachelor degree or more',
  maritalStatus: 'Single',
  zipCode: 11214,
  password: '123'
};

const anuj = {
  firstName: 'Anuj',
  lastName: 'Shah',
  isAdmin: true,
  email: 'anuj@anuj.anuj',
  gender: 'male',
  dob: '8/12/1980',
  occupation: 'engineer',
  incomeLevel: '$200,000 and over',
  ethnicity: 'Indian',
  religion: 'Hinduism',
  education: 'Bachelor degree or more',
  maritalStatus: 'Single',
  zipCode: 10004,
  password: '123'
};

const winston = {
  firstName: 'Winston',
  lastName: 'Wang',
  isAdmin: true,
  email: 'winston@winston.winston',
  gender: 'male',
  dob: '10/14/1990',
  occupation: 'lawyer',
  incomeLevel: '$75,000 to $99,999',
  ethnicity: 'Asian',
  religion: 'Other',
  education: 'Bachelor degree or more',
  maritalStatus: 'Single',
  zipCode: 90210,
  password: '123'
};

const jimmy = {
  firstName: 'Jimmy',
  lastName: 'Wang',
  isAdmin: true,
  email: 'jimmy@jimmy.jimmy',
  gender: 'male',
  dob: '12/2/1990',
  occupation: 'accountant',
  incomeLevel: '$50,000 to $74,999',
  ethnicity: 'Asian',
  religion: 'Other',
  education: 'Bachelor degree or more',
  maritalStatus: 'Single',
  zipCode: 89109,
  password: '123'
};

function generateUsers () {
  const users = doTimes(numUsers, randUser);
  users.push(User.build(jenny));
  users.push(User.build(anuj));
  users.push(User.build(winston));
  users.push(User.build(jimmy));
  return users;
}

function createUsers () {
  return Promise.map(generateUsers(), user => {
    return user.save();
  });
}

function randRecording (createdUsers) {
  const user = chance.weighted(createdUsers, [...Array(96).fill(0.625), 10, 10, 10, 10]);
  const randomText = chance.pickset(recordingsJSON, 2).reduce((a, b) => a + b.text, '');
  return Recording.build({
    text: randomText,
    personality: [
      {"quality":"Adventurousness","score":Math.random()},
      {"quality":"Artistic interests","score":Math.random()},
      {"quality":"Emotionality","score":Math.random()},
      {"quality":"Imagination","score":Math.random()},
      {"quality":"Intellect","score":Math.random()},
      {"quality":"Authority-challenging","score": Math.random()},
      {"quality":"Achievement striving","score": Math.random()},
      {"quality":"Cautiousness","score": Math.random()},
      {"quality":"Dutifulness","score": Math.random()},
      {"quality":"Orderliness","score": Math.random()},
      {"quality":"Self-discipline","score":Math.random()},
      {"quality":"Self-efficacy","score":Math.random()},
      {"quality":"Activity level","score":Math.random()},
      {"quality":"Assertiveness","score":Math.random()},
      {"quality":"Cheerfulness","score":Math.random()},
      {"quality":"Excitement-seeking","score":Math.random()},
      {"quality":"Outgoing","score":Math.random()},
      {"quality":"Gregariousness","score":Math.random()},
      {"quality":"Altruism","score":Math.random()},
      {"quality":"Cooperation","score":Math.random()},
      {"quality":"Modesty","score":Math.random()},
      {"quality":"Uncompromising","score":Math.random()},
      {"quality":"Sympathy","score":Math.random()},
      {"quality":"Trust","score":Math.random()},
      {"quality":"Fiery","score":Math.random()},
      {"quality":"Prone to worry","score":Math.random()},
      {"quality":"Melancholy","score":Math.random()},
      {"quality":"Immoderation","score":Math.random()},
      {"quality":"Self-consciousness","score":Math.random()},
      {"quality":"Susceptible to stress","score":Math.random()},
      {"quality":"Challenge","score":Math.random()},
      {"quality":"Closeness","score":Math.random()},
      {"quality":"Curiosity","score":Math.random()},
      {"quality":"Excitement","score":Math.random()},
      {"quality":"Harmony","score":Math.random()},
      {"quality":"Ideal","score":Math.random()},
      {"quality":"Liberty","score":Math.random()},
      {"quality":"Love","score":Math.random()},
      {"quality":"Practicality","score":Math.random()},
      {"quality":"Self-expression","score":Math.random()},
      {"quality":"Stability","score":Math.random()},
      {"quality":"Structure","score":Math.random()},
      {"quality":"Conservation","score":Math.random()},
      {"quality":"Openness to change","score":Math.random()},
      {"quality":"Hedonism","score":Math.random()},
      {"quality":"Self-enhancement","score":Math.random()},
      {"quality":"Self-transcendence","score":Math.random()}
    ],
    tone: [
      {"quality":"Anger","score":Math.random()},
      {"quality":"Disgust","score":Math.random()},
      {"quality":"Fear","score":Math.random()},
      {"quality":"Joy","score":Math.random()},
      {"quality":"Sadness","score":Math.random()},
      {"quality":"Analytical","score":Math.random()},
      {"quality":"Confident","score":Math.random()},
      {"quality":"Tentative","score":Math.random()},
      {"quality":"Openness","score":Math.random()},
      {"quality":"Conscientiousness","score":Math.random()},
      {"quality":"Extraversion","score":Math.random()},
      {"quality":"Agreeableness","score":Math.random()},
      {"quality":"Emotional Range","score":Math.random()}
    ],
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
  return Question.bulkCreate(questionsJSON)
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
      return Quote.bulkCreate(quotesJSON)
    }).then(createdQuotes => {
      console.log(chalk.yellow(`Seeded ${createdQuotes.length} quotes OK`));
    })
}


db.didSync
  .then(() => db.sync({force: true}))
  .then(seed)
  .then(users => console.log(chalk.yellow('Seeded successfully!')))
  .catch(error => console.error(error))
  .finally(() => db.close());

