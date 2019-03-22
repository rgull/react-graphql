import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className="login-box">
                <div className="login-logo">
                    <b>Wine</b>Country
                </div>
                <div className="login-box-body">
                    <p className="login-box-msg">Password Recover</p>
                    <form action="" >
                        <div className="form-group has-feedback">
                            <input type="email" className="form-control" placeholder="Email" />
                            <span className="glyphicon glyphicon-envelope form-control-feedback" />
                        </div>
                    
                        <div className="row">
                            <div className="col-xs-4">
                            <button type="submit" className="btn btn-primary btn-block btn-flat">Recover</button>
                            </div>
                        </div>
                    </form> 
                    <Link to={"/login"}>Go to login</Link><br />
                </div>
            </div>
         );
    }
}
 
export default Login;