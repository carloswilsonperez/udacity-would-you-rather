import React, {Component, Fragment} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {connect} from 'react-redux';
import LoadingBar from 'react-redux-loading-bar';

import AppRoutes from './AppRoutes';
import NavigationBar from './NavigationBar';
import {handleGetQuestions} from "../actions/questions";
import { handleGetUsers } from '../actions/users';


class App extends Component {

    componentDidMount() {
        this.props.dispatch(handleGetQuestions());
        this.props.dispatch(handleGetUsers());
    }

    render() {
        return (
            <Router>
                <Fragment>
                    <LoadingBar />
                    <NavigationBar user={this.props.user} login={this.props.isAuthenticated}/>
                    <div>
                        <AppRoutes {...this.props} />
                    </div>
                </Fragment>
            </Router>
        );
    }
}

function mapStateToProps(state) {
    return {
        loading: false,
        user: state.login.user,
        isAuthenticated: state.login.authenticated
    }
}

export default connect(mapStateToProps)(App);
