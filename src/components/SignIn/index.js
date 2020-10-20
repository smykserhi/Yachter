import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import SignInTemplate from "./Template"
//import Alert from "../Alert"



const SignInPage = () => (  
    <SignInForm />    
);
 
const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};
 //coment
class SignInFormBase extends Component {
  constructor(props) {
    super(props);
 
    this.state = { ...INITIAL_STATE };
  }
  
  onSubmit = event => {
    const { email, password } = this.state;
 
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        console.log("singIn succses")
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
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
    const { email, password, error } = this.state;
 
    const isInvalid = password === '' || email === '';
    
     return (     
      <div>
        <SignInTemplate 
            emailValue = {email}
            onChange = {this.onChange}
            paswordValue= {password}
            onSubmit={this.onSubmit}
            isInvalid={isInvalid}

          />
        {/* <Alert  /> */}
        {error ?  <p >{error.message}</p> : ""}
        
        </div>
      // </form>
    );
  }
}
 
const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);
 
export default SignInPage;
 
export { SignInForm };

