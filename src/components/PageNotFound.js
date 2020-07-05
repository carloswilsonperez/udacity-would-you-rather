import React from 'react';
import { Link } from 'react-router-dom';
import pageNotFound from'../assets/pageNotFound.png';

class PageNotFound extends React.Component{
    render(){
        return (
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-sm-8 text-center'>
                        <img src={pageNotFound} alt='Error 404 - Page Not Found' className='page-not-found-icon' />
                    </div>
                </div>
                <div className='row justify-content-center'>
                    <div className='col-sm-8 text-center'>
                        <Link to='/'>
                            <button type="button" className="btn btn-primary">Back to Login</button>
                        </Link>
                    </div>
                </div>
            </div>
          );
    }
}

export default PageNotFound;