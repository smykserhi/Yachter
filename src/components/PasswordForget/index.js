import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import Forgot from "./Forgot"
import { compose } from 'recompose';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
 
const PasswordForgetPage = () => (  
    <PasswordForgetForm /> 
);
 
const INITIAL_STATE = {
  email: '',
  error: null,
  open: false,  
};
 
class PasswordForgetFormBase extends Component {
  state = { ...INITIAL_STATE }; 
 
  onSubmit = event => {
    const { email } = this.state; 
    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.SIGN_IN);
      })
      .catch(error => {
        this.setState({ error ,open: true});
      });
 
    event.preventDefault();
  }; 
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({open: false})
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
          <Snackbar open={this.state.open} autoHideDuration={3000} onClose={this.handleClose}>
              <Alert  onClose={this.handleClose} severity="warning">
                {error && error.message}
              </Alert>
            </Snackbar>          
        </div>      
    );
  }
}
const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);
 
export default PasswordForgetPage 
 
const PasswordForgetForm  = compose(withRouter, withFirebase)(PasswordForgetFormBase);
 
export { PasswordForgetForm, PasswordForgetLink };