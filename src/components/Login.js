import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import {handleGetUsers} from '../actions/users';
import {userWantToLogIn} from '../actions/login';

class Login extends Component {
    state = {
        userSelected: null
    };

    // Custom methods

    handleChange = (e) => {
        const userSelected = e.target.value;
        this.setState(() => ({
            userSelected
        }));
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.dispatch(userWantToLogIn(this.state.userSelected));
    };

    // Lifecycle methods

    componentDidMount() {
        this.props.dispatch(handleGetUsers());
    }

    render() {
        if (this.props.authenticated) {
            return <Redirect to='/' />;
        }

        return (
            <div className="container-md justify-content-center">
                <div className="row justify-content-center">
                    <h1>Pick a user...</h1>
                </div>
                <div className="row justify-content-center">
                    <form id="Login" onSubmit={this.handleSubmit}>
                    {
                        Object.keys(this.props.users).map((user) => {
                            return (
                                <div className="form-check" key={this.props.users[user].id}>
                                    <input className="form-check-input" 
                                    type="radio" name="login_radios" 
                                    id={this.props.users[user].id} 
                                    value={this.props.users[user].id} 
                                    onChange={this.handleChange}
                                    />
                                    <label className="form-check-label" htmlFor={this.props.users[user].id}>
                                        {this.props.users[user].name}
                                    </label>
                                </div>
                            );
                        })
                    }
                    <button type="submit" className="btn btn-primary" disabled={!this.state.userSelected}>
                        Login
                    </button>
                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps({users, login}) {
    return {
        loading: users === null,
        users,
        authenticated: login.authenticated
    }
}

export default connect(mapStateToProps)(Login);