import React from 'react';
import { Link } from 'react-router-dom';
import { AUTH_TOKEN } from '../../constants';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const LOGIN_MUTATION = gql`
mutation emailLogin($input: EmailSignupInput!) {
    emailLogin(input: $input) {
        id
        jwt
        email
    }
}
`

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: true, // switch between Login and SignUp
            email: '',
            password: '',
            authError: false,
        }

    }
    render() {
        const { email, password } = this.state
        return (
            <div className="login-box">
                <div className="login-logo">
                    <b>Wine</b>Country
                </div>
                <div className="login-box-body">
                    <p className="login-box-msg">Sign in to start your session</p>
                    <form action="" >
                        <div className="form-group has-feedback">
                            <input type="email" className="form-control"
                                value={email}
                                placeholder="Email"
                                onChange={e => this.setState({ email: e.target.value })}
                            />
                            <span className="glyphicon glyphicon-envelope form-control-feedback" />
                        </div>
                        <div className="form-group has-feedback">
                            <input type="password" className="form-control"
                                value={password}
                                onChange={e => this.setState({ password: e.target.value })}
                                placeholder="Password" />
                            <span className="glyphicon glyphicon-lock form-control-feedback" />
                        </div>

                        <Mutation
                            mutation={LOGIN_MUTATION}
                            variables={{ email, password }}
                            onCompleted={data => this._confirm(data)}
                            onError={error => {
                                // is this the right place to start passing errors to other components?
                                this.setState({
                                    authError: true
                                });
                            }}
                        >
                            {(mutation, { loading, error }) => {
                                if (loading) return <p>Loading.....</p>;
                                //     if (error) return <div className="alert alert-danger" role="alert">
                                //     An error occured! 
                                //   </div>;
                                return (
                                    <div>
                                        <div className="row">
                                            <div style={{ display: this.state.authError === true ? 'block' : 'none' }} className="alert alert-danger" role="alert">
                                                An error occured!
                                       </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xs-4">
                                                <button type="submit" onClick={e => {
                                                    e.preventDefault();
                                                    console.log('Email: ', this.state.email)
                                                    mutation({
                                                        variables: {
                                                            "input": { "email": email, "password": password }
                                                        }
                                                    }
                                                    )
                                                }} className="btn btn-primary btn-block btn-flat pull-right">Sign In</button>
                                            </div>

                                        </div>

                                    </div>
                                );
                            }}
                        </Mutation>
                    </form>
                    <Link to={"/forgot-password"}>I forgot my password</Link><br />
                </div>
            </div>
        );
    }
    _confirm = async data => {
        if (data && data.emailLogin) {
            console.log('Token Received: ', data)
            const token = data.emailLogin.jwt;
            this._saveUserData(token);
            this.props.history.push(`/venue`);
        }

    }


    _saveUserData = token => {
        localStorage.setItem(AUTH_TOKEN, token);
    }

}

export default Login;