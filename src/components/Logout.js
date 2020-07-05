import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {logOutUser} from '../actions/login';

class Logout extends Component {
    componentDidMount() {
        this.props.dispatch(logOutUser());
    }

    render() {
        return (
            <Redirect to="/login" />
        );
    }
}

export default connect()(Logout);