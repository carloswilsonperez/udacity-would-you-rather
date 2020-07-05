import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from "react-router-dom";
import { showLoading } from 'react-redux-loading-bar';

import {handleAddQuestionAnswer} from '../actions/questions';
import PageNotFound from "./PageNotFound";


class QuestionPoll extends Component {

    state = {
        optionSelected: '',
        answerSubmitted: false
    };

    handleSubmit(e, questionId) {
        e.preventDefault();

        const {dispatch} = this.props;
        const {optionSelected} = this.state;

        dispatch(showLoading());
        dispatch(handleAddQuestionAnswer(questionId, optionSelected));

        this.setState(() => ({
            optionSelected: '',
            answerSubmitted: true
        }));
    }

    handleInputChange = (e) => {
        const text = e.target.value;

        this.setState(() => ({
            optionSelected: text
        }));
    };

    render() {
        const { optionSelected, answerSubmitted } = this.state;
        const { id, question, author, pageNotFound, questions, login} = this.props;

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

        if (answerSubmitted) {
            return <Redirect to={`/questions/${id}/results`} />;
        }

        return (
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-sm-8'>
                        <div className="card">
                            <div className="card-header">
                                {author.name} asks would you rather...
                            </div>
                            <div className="card-body">
                                <img src={author.avatarURL} alt={`Avatar of ${author.name}`} className='avatar'/>
                                <form onSubmit={(e) => this.handleSubmit(e, id)} className='form-poll'>
                                    <div className="form-check form-check-dashed">
                                        <input className="form-check-input"
                                                type="radio"
                                                name="questionPoll"
                                                id="optionOne"
                                                value="optionOne"
                                                onChange={this.handleInputChange}
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="optionOne">
                                            {question.optionOne.text}
                                        </label>
                                    </div>
                                    <div className="form-check form-check-dashed">
                                        <input className="form-check-input"
                                                type="radio"
                                                name="questionPoll"
                                                id="optionTwo"
                                                value="optionTwo"
                                                onChange={this.handleInputChange}
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="exampleRadios2">
                                            {question.optionTwo.text}
                                        </label>
                                    </div>
                                    <button
                                        className='btn btn-primary float-right'
                                        type='submit'
                                        disabled={!optionSelected}>
                                        Send Vote
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({questions, users, login}, props) {
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
        id,
        question,
        author,
        pageNotFound,
        questions, 
        login
    }
}

export default connect(mapStateToProps)(QuestionPoll);