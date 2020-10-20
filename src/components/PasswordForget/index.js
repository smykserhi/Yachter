import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import Forgot from "./Forgot"
import { compose } from 'recompose';
 
const PasswordForgetPage = () => (  
    <PasswordForgetForm /> 
);
 
const INITIAL_STATE = {
  email: '',
  error: null,
};
 
class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);
 
    this.state = { ...INITIAL_STATE };
  }
 
  onSubmit = event => {
    const { email } = this.state;
 
    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.SIGN_IN);
      })
      .catch(error => {
        this.setState({ error });
      });
 
    event.preventDefault();
  };
 
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
 
  render() {
    const { email, error } = this.state;
 
    const isInvalid = email === '';
 
    return (     
        <div>
        <Forgot 
          onChange = {this.onChange}
          onSubmit = {this.onSubmit}
          isInvalid = {isInvalid}
        />
        {error && <p>{error.message}</p>}
        </div>      
    );
  }
}
 //coment
const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);
 
export default PasswordForgetPage 
 
const PasswordForgetForm  = compose(withRouter, withFirebase)(PasswordForgetFormBase);
 
export { PasswordForgetForm, PasswordForgetLink };