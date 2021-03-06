import { connect } from 'react-redux';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

 
const ProtectedRComponent = ({isAuth, component: Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render={props => isAuth ?  <Component {...props}/> : <Redirect to="/"/>}
        />
    );
}
 
const mapStateToProps = ({auth}) => {
     return {
        isAuth: auth.isAuth
    };
}; 

const ProtectedRoute= connect(mapStateToProps)(ProtectedRComponent);
export default ProtectedRoute;