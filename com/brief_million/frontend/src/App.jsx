import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import {SignUp, Home, Login, LogAdmin, Dashboard, Question, Account, Quiz} from './pages';

class App extends Component {
  render(){

    

    return (
      <div>
        <Switch>
          <ProtectedRoute path='/account' component={Account} exact/>
          <Route path='/start-quiz' component={Quiz} exact/>
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
