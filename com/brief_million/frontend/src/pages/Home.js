import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

class Home extends Component {
    render(){
        return (
            <div className="ub-content">
                <div className="userBtn">
                    <Link to='/admin/login' type="button" className="btn btn-outline-warning btn-lg my-5 mr-3 p-2">Administrator </Link>
                    <Link to='/participant/login' type="button" className="btn btn-outline-warning btn-lg my-5 ml-3 p-2">Participant</Link>
                </div>
            </div>
            
        )
    }
}

export {Home};