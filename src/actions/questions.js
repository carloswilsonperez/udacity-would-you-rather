
import {
    _getQuestions as getQuestions,
    _saveQuestion as saveQuestion,
    _saveQuestionAnswer as saveQuestionAnswer
} from "../_DATA";

import { showLoading, hideLoading } from 'react-redux-loading-bar';

import { addUserQuestion, addUserQuestionAnswer } from './users';

export const FETCH_QUESTIONS = 'FETCH_QUESTIONS';
export const ADD_QUESTION = 'ADD_QUESTION';
export const ADD_QUESTION_ANSWER = 'ADD_QUESTION_ANSWER';


export function fetchQuestions(questions) {
    return {
        type: FETCH_QUESTIONS,
        questions
    }
}

export function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question
    }
}

export function addQuestionAnswer(authedUser, questionId, selectedOption) {
    return {
        type: ADD_QUESTION_ANSWER,
        authedUser,
        questionId,
        selectedOption
    }
}

export function handleGetQuestions() {
    return (dispatch) => {
        dispatch(showLoading());
        return getQuestions()
            .then((questions) => {
                dispatch(fetchQuestions(questions));
                dispatch(hideLoading());
            });
    }
}

export function handleAddQuestionAnswer (questionId, selectedOption) {
    return (dispatch, getState) => {

        const {login} = getState();
        const authedUser = login.user.id;

        saveQuestionAnswer({
            authedUser,
            qid: questionId,
            answer: selectedOption
        }).then(() => {
            dispatch(addQuestionAnswer(authedUser, questionId, selectedOption));
            dispatch(addUserQuestionAnswer(authedUser, questionId, selectedOption));
            dispatch(hideLoading());
        });
    }
}

export function handleAddQuestion (optionOneText, optionTwoText, callback) {
    return (dispatch, getState) => {
        dispatch(showLoading());

        const {login} = getState();
        const author = login.user.id;

        saveQuestion({
            optionOneText,
            optionTwoText,
            author
        }).then((question) => {
            dispatch(addUserQuestion(question));
            dispatch(addQuestion(question));
            dispatch(hideLoading());
        }).then(callback);
    }
}