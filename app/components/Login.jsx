import React from 'react'
import {browserHistory} from 'react-router'

export const Login = ({ login }) => (

    <div className="container">
        <div className="row">

            <div className="col-md-4 col-md-offset-4 ">
                <div className="panel panel-default loginContainer">
                    <div className="panel-heading">
                        <span className="glyphicon glyphicon-lock"></span> Login</div>
                    <div className="panel-body">
                        <form className="form-horizontal" role="form" onSubmit={evt => {
                            evt.preventDefault()
                            login(evt.target.username.value, evt.target.password.value)
                       }}>
                        <div className="form-group">
                            <label  className="col-sm-3 control-label">
                                Email</label>
                            <div className="col-sm-9">
                                <input name="username" type="email" className="form-control" id="inputEmail3" placeholder="Email" required />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-3 control-label">
                                Password</label>
                            <div className="col-sm-9">
                                <input name="password" type="password" className="form-control" id="inputPassword3" placeholder="Password" required />
                            </div>
                        </div>

                        <div className="form-group last">
                            <div className="col-sm-offset-3 col-sm-9">
                                <button type="submit" className="btn btn-success btn-sm">
                                    Sign in</button>
                            </div>
                        </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    </div>

)

import {login} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export default connect (
  state => ({}),
  {login},
) (Login)
