import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from "react-router-dom";

import PageNotFound from './PageNotFound';
import { hideLoading } from 'react-redux-loading-bar';

const QuestionResults = (props) => {
    const {question, questions, author, pageNotFound, login} = props;

    if (Object.keys(questions).length === 0) {
        return null;
    }

    if (pageNotFound) {
        return <PageNotFound />;
    } else {
        if (!login.authenticated) {
            return <Redirect to='/login' />
        }
    }

    const totalVotes = question.optionOne.votes.length + question.optionTwo.votes.length;
    let optionSelected;
    if (question.optionOne.votes.includes(login.user.id) ) {
        optionSelected = 'optionOne';
    }

    if (question.optionTwo.votes.includes(login.user.id) ) {
        optionSelected = 'optionTwo';
    }

    // Render only once we get the updated votes object
    if (!optionSelected) {
        return null;
    }

    let optionOneWidth = Math.round((question.optionOne.votes.length / totalVotes) * 100);
    let optionTwoWidth = Math.round((question.optionTwo.votes.length / totalVotes) * 100);

    return (
        <div className='container'>
            <div className='row justify-content-center'>
                <div className='col-sm-8'>
                    <div className="card">
                        <h5 className="card-header">Added by {author.name}</h5>
                        <div className={optionSelected === 'optionOne' ? 'selected-answer card-body' : 'card-body'}>
                            <h5 className="card-title">Would you rather {question.optionOne.text}?</h5>
                            <p className="card-text">{question.optionOne.votes.length} out of {totalVotes} votes. ({optionOneWidth}%)</p>
                        </div>
                        <div className={optionSelected === 'optionTwo' ? 'selected-answer card-body' : 'card-body'}>
                            <h5 className="card-title">Would you rather {question.optionTwo.text}?</h5>
                            <p className="card-text">{question.optionTwo.votes.length} out of {totalVotes} votes. ({optionTwoWidth}%)</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

function mapStateToProps(state, props) {
    const {questions, users, login} = state;
    const {id} = props.match.params;

    let pageNotFound = true;
    let author;
    let question;

    if (questions[id] !== undefined) {
        pageNotFound = false;
        question = questions[id];
        author = users[question['author']];
    }

    return {
        question,
        questions,
        author,
        pageNotFound,
        login
    }
}

export default connect(mapStateToProps)(QuestionResults);