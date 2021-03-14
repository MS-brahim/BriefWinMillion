import React, {Component} from 'react';
import { LinkUser } from '../components/LinkUser';
import './Home.css';

class Home extends Component {
    render(){
        return (
            <div className="ub-content">
                <LinkUser/>
                <div className="userBtn">
                    <div className="area" >
                        <ul className="circles">
                            <li className="links"></li>
                            <li className="links"></li>
                            <li className="links"></li>
                            <li className="links"></li>
                            <li className="links"></li>
                            <li className="links"></li>
                            <li className="links"></li>
                            <li className="links"></li>
                            <li className="links"></li>
                            <li className="links"></li>
                            <li className="links"></li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export {Home};