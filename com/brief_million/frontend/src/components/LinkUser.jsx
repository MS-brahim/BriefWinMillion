import React from 'react';
import { Link } from 'react-router-dom';

const LinkUser = () => {
    return (
        <div style={{ justifyContent:'center', 
        alignItems:'center', 
        display:'flex', 
        height:'100%', 
        width:'100%',
        zIndex:1,
        position:'absolute'}}>
            <Link to='/admin/login' type="button" className="btn btn-outline-warning btn-lg my-5 mr-3 p-2">Administrator </Link>
            <Link to='/participant/login' type="button" className="btn btn-outline-warning btn-lg my-5 ml-3 p-2">Participant</Link>
        </div>
    );
}
  
export {LinkUser};
