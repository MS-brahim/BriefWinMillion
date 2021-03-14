import React, { Component } from 'react';
import logo from '../assets/logo.png'; 
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavbarText,
  NavLink
} from 'reactstrap';
import {connect} from 'react-redux';
import {logout} from '../actions';

class NavbarComponent extends Component {

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }

  toggle(){
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  _renderLogout() {
    const { isAuth, logout } = this.props;
    if (isAuth) {
      return (
        <NavbarText><NavLink className="text-white" type="button" onClick={()=> logout()}>logout</NavLink></NavbarText>
      );
    }
    return false;
  }
  render() {  
    return (
      <div>
        <Navbar style={{backgroundColor:'black'}} light expand="md">
          <NavbarBrand href="/"><img src={logo} alt="logo" width="50"/></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              
            </Nav>
            {this._renderLogout()}
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
const mapStateToProps = ({auth}) => {
  return {
    isAuth: auth.isAuth
  };
};
const NavBar = connect(mapStateToProps, {logout})(NavbarComponent)
export {NavBar};