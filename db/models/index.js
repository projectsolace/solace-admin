'use strict';

// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('User')
// to get access to the User model.

const User = require('./user');
const Question = require('./question');
const Recording = require('./recording');
const Quote = require('./quote');
const Average = require('./average')

User.hasMany(Recording);
Recording.belongsTo(User);
User.hasMany(Average);
Average.belongsTo(User);

module.exports = {User, Question, Recording, Quote, Average}
