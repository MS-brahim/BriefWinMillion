import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import {SignUp, Home, Login, LogAdmin, Dashboard, Question, Account, Quiz, Winner} from './pages';

class App extends Component {
  render(){

    

    return (
      <div>
        <Switch>
          <ProtectedRoute path='/account' component={Account} exact/>
          <ProtectedRoute path='/start-quiz' component={Quiz} exact/>
          <ProtectedRoute path='/winner' component={Winner} exact/>
        </Switch>
        <Route path='/' component={Home} exact/>
        <Route path='/participant/login' component={Login} exact/>
        <Route path='/participant/signUp' component={SignUp} exact/>
        
        
        <Route path='/admin/login' component={LogAdmin} exact/>
        <Route path='/dashboard' component={Dashboard} exact/>
        <Route path='/questions' component={Question} exact/>
        
      </div>
    );
  }
  
}

export default App;
