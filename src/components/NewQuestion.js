import React, {Component} from 'react';
import {connect} from 'react-redux';
import {handleAddQuestion} from '../actions/questions';
import {Redirect} from 'react-router-dom';

class NewQuestion extends Component {
    state = {
        optionOneText: '',
        optionTwoText: '',
        toDashboard: false,
        hasSubmitted: false
    };

    handleOptionOneTextChange = (e) => {
        const text = e.target.value;

        this.setState({
            optionOneText: text
        });
    };

    handleOptionTwoTextChange = (e) => {
        const text = e.target.value;

        this.setState({
            optionTwoText: text
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const {optionOneText, optionTwoText} = this.state;
        const {dispatch} = this.props;

        this.setState({
            hasSubmitted: true
        });

        dispatch(handleAddQuestion(optionOneText, optionTwoText, () => {
            this.setState({
                optionOneText: '',
                optionTwoText: '',
                goBackToDashboard: true
            });
        }));
    };

    render() {
        const {
            optionOneText,
            optionTwoText,
            goBackToDashboard,
            hasSubmitted
        } = this.state;

        const {login} = this.props;

        if (goBackToDashboard) {
            return <Redirect to='/'/>;
        }

        return (
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-sm-8'>
                        {!login.authenticated && <div className="alert alert-danger">
                            Please log in first to be able to add questions
                        </div>}
                        <div className='card'>
                            <div className='card-header bold'>Add New Question</div>
                            <div className='card-body'>
                                <p className="card-text"><strong>Would You Rather...?</strong></p>
                                <form onSubmit={this.handleSubmit}>
                                    <div className='form-group'>
                                        <input
                                            className='form-control'
                                            placeholder='Enter option one text here...'
                                            value={optionOneText}
                                            onChange={this.handleOptionOneTextChange}
                                        />
                                    </div>
                                    <div className='form-group'>
                                        <input
                                            className='form-control'
                                            placeholder='Enter option two text here...'
                                            value={optionTwoText}
                                            onChange={this.handleOptionTwoTextChange}
                                        />
                                    </div>
                                    <input type='submit'
                                            name='submit'
                                            id='submit'
                                            value={hasSubmitted ? "Submitting Question..." : "Add Question"}
                                            className='btn btn-primary float-right'
                                            disabled={optionOneText === '' || optionTwoText === '' || hasSubmitted || !login.authenticated } />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({login}) {

    return {
        login
    };
}

export default connect(mapStateToProps)(NewQuestion);