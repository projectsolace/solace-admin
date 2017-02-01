import React from 'react'
import {browserHistory} from 'react-router'

export const Login = ({ login }) => (
  <form id='loginForm' onSubmit={evt => {
    evt.preventDefault()
    login(evt.target.username.value, evt.target.password.value)
  } }>
              <label>EMAIL</label>
              <input
                name="username"
                type="email"
                />
                <label>PASSWORD</label>
                <input
                  name="password"
                  type="password"
                  />
            <input type="submit" value="Login" />
          </form>
)

import {login} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export default connect (
  state => ({}),
  {login},
) (Login)
