import React, {Component} from 'react';
import {connect} from 'react-redux';
import Question from './Question';


class Dashboard extends Component {
    state = {
        showAnsweredQuestions: false
    };

    showAnsweredQuestions = (arg) => {
        this.setState(() => ({
            showAnsweredQuestions: arg
        }));
    };

    render() {
        const {showAnsweredQuestions} = this.state;
        const {questions, userId, users} = this.props;

        // Get the ids of the questions that the current user has answered
        const answeredQuestions = Object.keys(users[userId].answers);

        // Get the ids of the questions that the current user has not answered
        const unansweredQuestions = [];
        Object.keys(questions).forEach((questionId) => {
            if (!answeredQuestions.includes(questionId)) {
                unansweredQuestions.push(questionId);
            }
        });

        let questionsToShow = this.state.showAnsweredQuestions ? answeredQuestions : unansweredQuestions;

        // Create object from questionsToShow
        questionsToShow = questionsToShow.map(questionId => {
            return {
                authorName: users[questions[questionId].author].name,
                authorAvatar: users[questions[questionId].author].avatarURL,
                timestamp: questions[questionId].timestamp,
                questionId: questionId,
                questionOptions: [questions[questionId].optionOne.text, questions[questionId].optionTwo.text]
            };
        }).sort((a, b) => b.timestamp - a.timestamp);

        return (
            <div className='container'>
                 <div className='row justify-content-center'>
                    <div className='col-sm-8'>
                        <nav className="navbar navbar-expand-sm justify-content-center">
                            <ul className="navbar-nav nav-var-question-tabs">
                                <li className="nav-item">
                                    <span className={this.state.showAnsweredQuestions ? 'question-tabs' : 'question-tabs question-tabs-active'} onClick={() => this.showAnsweredQuestions(false)}>
                                        Unanswered Questions
                                    </span>
                                </li>
                                <li className="nav-item">
                                    <span className={this.state.showAnsweredQuestions ? 'question-tabs question-tabs-active' : 'question-tabs'} onClick={() => this.showAnsweredQuestions(true)}>
                                        Answered Questions
                                    </span>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <div className='row justify-content-center'>
                    <div className='col-sm-8'>
                        {questionsToShow.map( (questionObject) => {
                            return (
                                <Question 
                                    key={questionObject.questionId} 
                                    questionObject={questionObject} 
                                    showAnsweredQuestions={showAnsweredQuestions} />
                            );
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({questions, login, users}) {
    return {
        questions,
        userId: login.user.id,
        users
    }
}

export default connect(mapStateToProps)(Dashboard);