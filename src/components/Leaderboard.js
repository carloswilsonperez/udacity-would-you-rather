import React from 'react';
import {connect} from 'react-redux';
import { BsStarFill } from "react-icons/bs";

const Leaderboard = (props) => {
    const {users} = props;

    let usersInfo = Object.keys(users).map((key) => {
        let questionsAnswered = Object.keys(users[key].answers).length;
        let questionsAsked = Object.keys(users[key].questions).length;

        return {
            name: users[key].name,
            avatar: users[key].avatarURL,
            questionsAnswered: questionsAnswered,
            questionsAsked: questionsAsked,
            totalScore: questionsAnswered + questionsAsked
        }
    });

    usersInfo.sort((a, b) => {
        if (b.totalScore < a.totalScore) return -1;
        if (b.totalScore > a.totalScore) return 1;
        return 0;
    });

    return (
        <div className='container'>
            <div className='row justify-content-center'>
                <div className='col-sm-8'>
                    {usersInfo.map((user, index) => {
                        return (
                            <div key={index}>
                                <div className="card">
                                    <div className="card-header">
                                        {user.name}<BsStarFill className='center-icon' />
                                    </div>
                                    <div className="card-body">
                                        <img src={user.avatar} alt={`Avatar of ${user.name}`} className='avatar float-left'/>
                                        <p className="card-text">Answered Questions: {user.questionsAnswered}</p>
                                        <p className="card-text">Created Questions: {user.questionsAsked}</p>
                                        <p className="card-text total-points">Total Points: {user.totalScore}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
};

function mapStateToProps({users}) {
    return {
        users
    }
}

export default connect(mapStateToProps)(Leaderboard);