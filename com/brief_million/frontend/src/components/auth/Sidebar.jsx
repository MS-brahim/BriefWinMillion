import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Sidebar extends Component {
    render() { 
        return (
            <div>
                <div className="bg-light border-right" id="sidebar-wrapper">
                    <div className="list-group list-group-flush">
                        <Link to="/dashboard" className="list-group-item list-group-item-action bg-light">Participants</Link>
                        <Link to="/admins" className="list-group-item list-group-item-action bg-light">Administrator</Link>
                        <Link to="/questions" className="list-group-item list-group-item-action bg-light">Questions</Link>
                        <Link to="/gifts" className="list-group-item list-group-item-action bg-light">Gifts</Link>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Sidebar;