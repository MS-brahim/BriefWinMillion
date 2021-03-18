import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import {SignUp, Home, Login, LogAdmin, Dashboard, Question, Account, Quiz, Winner, Admins, Gifts} from './pages';

class App extends Component {
  render(){

    

    return (
      <div>
        <Switch>
          <ProtectedRoute path='/account' component={Account} exact/>
          <ProtectedRoute path='/start-quiz' component={Quiz} exact/>
          <ProtectedRoute path='/winner' component={Winner} exact/>
          <ProtectedRoute path='/gifts' component={Gifts} exact/>
          <ProtectedRoute path='/dashboard' component={Dashboard} exact/>
          <ProtectedRoute path='/questions' component={Question} exact/>
          <ProtectedRoute path='/admins' component={Admins} exact/>
        </Switch>
        <Route path='/' component={Home} exact/>
        <Route path='/participant/login' component={Login} exact/>
        <Route path='/participant/signUp' component={SignUp} exact/>
        <Route path='/admin/login' component={LogAdmin} exact/>
        
        
        
      </div>
    );
  }
  
}

export default App;
