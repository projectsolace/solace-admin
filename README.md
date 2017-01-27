# watson-backend

Backend server live at http://watson-backend.herokuapp.com/

### Goal for MVP
- React Native mobile app running
- Backend server deployed on Heroku
- User experience so far:
  - User can log in or sign up as a new user (posts to remote database)
  - User is given a random question to answer
  - User records answer, which is transcribed to text and sent to Watson API
  - User gets back data that is rendered on some chart/graph

### Which parts work
- Backend:
  - Call to Watson API returns the data we want
  - Data returns and we can render some of it into a rough bar graph
- React Native:
  - Sign up works and persists to remote database
  - Login, Signup, Homepage components rendering
  - Press record and it will save a hidden file on front end

### Which parts don't work
- Login authentication does not work (Passport doesn't work with React Native maybe?)
- Recording on front end cannot be accessed from the back end (and thus cannot make the call to Watson API)

### Open/unresolved questions
- Should we change our authentication strategy or continue using Bones?
- How can we get the recording from front end to back end?

### Particular parts of the code we would like you to look at
- Backend:
  - Authentication boilerplate route (server/auth.js)
- React Native:
  - src/native/reducer/UserReducer.native.js

### Instructions for building and using the project
- Backend:
```
$ git clone https://github.com/jennyrchan/watson-backend
$ cd watson-backend
$ npm install
$ npm run seed
$ npm run build-watch
```

And then in another terminal window, run:

```
$ npm start
```

- React Native:
```
$ git clone https://github.com/jawang12/watson-react-native
$ cd watson-react-native
$ npm install
$ react-native run-ios
```
