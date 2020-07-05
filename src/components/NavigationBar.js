import React, { Fragment } from 'react';
import {NavLink} from 'react-router-dom';
import { BsFillPlusCircleFill, BsTrophy, BsFillHouseFill, BsFillSkipEndFill } from "react-icons/bs";

const NavigationBar = (props) => {
    const user = props.user;
    const userIsLoggedIn = props.login;
    const greeting = user && user.name ? `${user.name}` : '';
    
    return (
        <div>
            <nav className="navbar navbar-expand-sm bg-primary navbar-dark justify-content-center">
                <ul className="navbar-nav">
                    {!userIsLoggedIn && <li className="nav-item">
                    <NavLink to='/login' exact activeClassName='active' className="nav-item nav-link">
                        Login
                    </NavLink>
                    </li>}
                    {userIsLoggedIn && 
                        <Fragment>
                            <li className="nav-item">
                                <NavLink to='/' exact className="nav-item nav-link">
                                    {greeting} <BsFillHouseFill className='navbar-icon' />
                                </NavLink>
                            </li>
                        </Fragment>
                    }
                    <li className="nav-item">
                        <NavLink to='/leaderboard' exact activeClassName='active' className="nav-item nav-link">
                            Leaderboard <BsTrophy className='navbar-icon' />
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to='/add' exact activeClassName='active' className="nav-item nav-link">
                            Add Question <BsFillPlusCircleFill className='navbar-icon' />
                        </NavLink>
                    </li>
                    {userIsLoggedIn && <li className="nav-item">
                        <NavLink to='/logout' exact activeClassName='active' className="nav-item nav-link">
                            Logout <BsFillSkipEndFill className='navbar-iconn' />
                        </NavLink>
                    </li>}
                </ul>
            </nav>
        </div>
    );
};

export default NavigationBar;