import React from 'react';
import {render} from 'react-dom';
import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import { loadingBarReducer } from 'react-redux-loading-bar';

import App from './components/App';
import login from './reducers/login';
import users from './reducers/users';
import questions from './reducers/questions';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

const reducer = combineReducers({
    users,
    questions,
    login,
    loadingBar: loadingBarReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(
    applyMiddleware(thunk)
));

store.subscribe(() => {
    localStorage.state = JSON.stringify(store.getState());
});

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
