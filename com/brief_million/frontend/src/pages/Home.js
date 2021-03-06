import React, {Component} from 'react';
import image from '../assets/background.jpg';
import { Link } from 'react-router-dom';
class Home extends Component {
    render(){
        return (
            <div>
            <div style={{ 
                backgroundImage: `url(${image})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                height:600
              }}>
                <div className="d-flex justify-content-between p-5">
                    <Link to='/admin/login' type="button" className="btn btn-outline-warning btn-lg my-5 mr-3 p-2">Administrator </Link>
                    <Link to='/participant/login' type="button" className="btn btn-outline-warning btn-lg my-5 ml-3 p-2">Participant</Link>
                </div>
            </div>
            <div className="bg-light">
                
            </div>
            </div>
            
        )
    }
}

export {Home};