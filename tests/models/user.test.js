'use strict'

const db = require('APP/db')
const User = require('APP/db/models/user')
const chai = require('chai')
const chaiProperties = require('chai-properties')
const chaiThings = require('chai-things')
const expect = chai.expect
chai.use(chaiProperties)
chai.use(chaiThings)

describe('~~~~~ USER MODEL ~~~~~', () => {
  before('wait for the db', () => db.didSync)

  const testUser = {
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

  beforeEach('create testUser', () => User.create(testUser));
  afterEach('remove testUser', () => db.sync({ force: true }));

  it('has the expected schema definitions', () => {
    return User.findOne({ where: { id: 1 }})
    .then(user => {
      expect(user.firstName).to.equal(testUser.firstName);
      expect(user.lastName).to.equal(testUser.lastName);
      expect(user.email).to.equal(testUser.email);
      expect(user.gender).to.equal(testUser.gender);
      expect(user.dob).to.equal(testUser.dob);
      expect(user.occupation).to.equal(testUser.occupation);
      expect(user.incomeLevel).to.equal(testUser.incomeLevel);
      expect(user.ethnicity).to.equal(testUser.ethnicity);
      expect(user.religion).to.equal(testUser.religion);
      expect(user.education).to.equal(testUser.education);
      expect(user.maritalStatus).to.equal(testUser.maritalStatus);
      expect(user.zipCode).to.equal(testUser.zipCode);
    });
  });

  it('sets isAdmin to false as the default value', () => {
    return User.findOne({ where: { id: 1 }})
    .then(user => {
      expect(user.isAdmin).to.equal(false);
    });
  });

  it('checks that email is unique', () => {
    const newUser = Object.assign({}, testUser)
    const userWithSameEmail = User.build(newUser);
    return userWithSameEmail.save()
      .then(() => {
        throw new Error('email validation did not trigger');
      }, (err) => {
        expect(err).to.be.an('object');
        expect(err.errors).to.contain.a.thing.with.properties({
          message: 'email must be unique'
        });
      });
  });

  it('can get fullName', () => {
    let fullName = testUser.firstName + ' ' + testUser.lastName;
    return User.findOne({ where: { id: 1 }})
      .then(user => {
        expect(user.fullName).to.equal(fullName);
      })
  })

  describe('authenticates user password', () => {
    it('resolves true if the password matches', () => {
      return User.findOne({ where: { id: 1 }})
        .then(user => user.authenticate('123'))
        .then(result => expect(result).to.be.true)
    })

    it("resolves false if the password doesn't match", () => {
      return User.findOne({ where: { id: 1 }})
        .then(user => user.authenticate('wrong password'))
        .then(result => expect(result).to.be.false)
    })
  })
})
