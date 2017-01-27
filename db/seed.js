'use strict';

const chance = require('chance')(123);
const Promise = require('bluebird');

const db = require('APP/db')
const User = require('APP/db/models/user');
const Question = require('APP/db/models/question');
const Recording = require('APP/db/models/recording');

const numUsers = 50;
const emails = chance.unique(chance.email, numUsers);
const questionsJSON = require('./questionsSeed');

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
    email: emails.pop(),
    gender: chance.gender(),
    dob: chance.birthday({ string: true }),
    occupation: chance.pickone(['salesperson', 'cashier', 'food service worker', 'nurse', 'customer service rep', 'janitor', 'accountant', 'teacher', 'police officer', 'lawyer', 'bank teller', 'doctor', 'engineer', 'office worker', 'student', 'other']),
    incomeLevel: chance.weighted(['Under $15,000', '$15,000 to $24,999', '$25,000 to $34,999', '$35,000 to $49,999', '$50,000 to $74,999', '$75,000 to $99,999', '$100,000 to $149,999', '$150,000 to $199,999', '$200,000 and over'], [11.6, 10.5, 10, 12.7, 16.7, 12.1, 14.1, 6.2, 6.1]),
    ethnicity: chance.weighted(['White', 'Black', 'Hispanic', 'Asian', 'American Indian/Alaska Native', 'Native Hawaiian/Other Pacific Islander', 'Other'], [61, 12, 18, 6, 1, 0, 2]),
    religion: chance.weighted(['Protestant', 'Catholic', 'Mormon', 'Judaism', 'Islam', 'Buddhism', 'Hinduism', 'Other', 'Unaffiliated'], [46.5, 20.8, 1.6, 1.9, 0.9, 0.7, 0.7, 3.5, 23.4]),
    education: chance.weighted(['High school graduate or more', 'Some college or more', 'Associate degree or more', 'Bachelor degree or more', 'Advanced degree'], [70, 15, 10, 4, 1]),
    maritalStatus: chance.weighted(['Single', 'Married', 'Widowed', 'Divorced'], [30.7, 46.2, 10.3, 12.8]),
    zipCode: chance.pickone([10001, 90210, 89049, 79936, 11109, 95834, 38639, 89109]),
    password: chance.word()
  });
}

function generateUsers () {
  const users = doTimes(numUsers, randUser);
  users.push(User.build({
    firstName: 'Jenny',
    lastName: 'Chan',
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
  }));
  users.push(User.build({
    firstName: 'Anuj',
    lastName: 'Shah',
    email: 'anuj@anuj.anuj',
    gender: 'male',
    dob: '8/12/1980',
    occupation: 'engineer',
    incomeLevel: '$200,000 and over',
    ethnicity: 'Other',
    religion: 'Other',
    education: 'Bachelor degree or more',
    maritalStatus: 'Single',
    zipCode: 10004,
    password: '123'
  }));
  users.push(User.build({
    firstName: 'Winston',
    lastName: 'Wang',
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
  }));
  users.push(User.build({
    firstName: 'Jimmy',
    lastName: 'Wang',
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
  }));
  return users;
}

function createUsers () {
  return Promise.map(generateUsers(), user => {
    return user.save();
  });
}

function seed () {
  return Question.bulkCreate(questionsJSON)
    .then(createdQuestions => {
      console.log(`Seeded ${createdQuestions.length} questions OK`);
      return createUsers();
    })
    .then(createdUsers => {
      console.log(`Seeded ${createdUsers.length} users OK`);
    });
}

db.didSync
  .then(() => db.sync({force: true}))
  .then(seed)
  .then(users => console.log('Seeded successfully!'))
  .catch(error => console.error(error))
  .finally(() => db.close());

