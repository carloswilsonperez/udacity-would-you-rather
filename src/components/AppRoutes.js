
import React from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';

import Dashboard from './Dashboard';
import Leaderboard from './Leaderboard';
import Login from './Login';
import Logout from './Logout';
import NewQuestion from './NewQuestion';
import PageNotFound from './PageNotFound';
import QuestionPoll from './QuestionPoll';
import QuestionResults from './QuestionResults';
import ProtectedRoute from './ProtectedRoute';

const AppRoutes = ({isAuthenticated}) => {
    return (
        <div>
            <Switch>
                <ProtectedRoute 
                    path='/' 
                    exact component={Dashboard} 
                    isAuthenticated={isAuthenticated}/>
                <Route 
                    path='/questions/:id' 
                    exact component={QuestionPoll} 
                    isAuthenticated={isAuthenticated}/>
                <Route 
                    path='/questions/:id/results'
                    exact component={QuestionResults}
                    isAuthenticated={isAuthenticated}/>
                <Route 
                    path='/add' exact component={NewQuestion}
                    isAuthenticated={isAuthenticated}/>
                <Route 
                    path='/leaderboard' exact component={Leaderboard}
                    isAuthenticated={isAuthenticated}/>
                <Route path="/login" exact component={withRouter(Login)}/>
                <Route path="/logout" exact component={withRouter(Logout)}/>
                <Route path="*" component={PageNotFound} />
            </Switch>
        </div>
    );
}

export default AppRoutes;