import React from 'react';
import {Link} from 'react-router-dom';
import { BsChatDotsFill } from "react-icons/bs";

const Question = (props) => {
    const {questionObject, showAnsweredQuestions} = props;
    const {authorName, authorAvatar, questionId, questionOptions} = questionObject;
    let linkToPoll = showAnsweredQuestions ? `/questions/${questionId}/results` : `/questions/${questionId}`;

    return (
        <div className="card">
            <div className="card-header">
                {authorName}<BsChatDotsFill className='center-icon'/>
            </div>
            <div className="card-body">
                <img src={authorAvatar} alt={`Avatar of ${authorName}`} className='avatar float-left'/>
                <h5 className="card-title">Would you rather...</h5>
                <p className="card-text">{questionOptions[0]} <strong>OR</strong> {questionOptions[1]}</p>
                <Link to={linkToPoll}>
    <button type="button" className="btn btn-primary float-right">{showAnsweredQuestions ? 'See Results' : 'Take a Vote'}</button>
                </Link>
            </div>
        </div>
    )
};

export default Question;