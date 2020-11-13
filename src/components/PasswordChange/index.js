import React, { Component } from 'react'; 
import { withFirebase } from '../Firebase';
import Change from "./Template"
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
 
const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: false,
  errorMessage: ""
};
 

class PasswordChangeForm extends Component {
  
  state = { ...INITIAL_STATE };
  //close Alert 
  handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({error: false});
  };
  
  onSubmit = event => {
    const { passwordOne } = this.state;
    event.preventDefault();
    this.props.firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.handleSaveNewPassword && this.props.handleSaveNewPassword()
      })
      .catch(err => {
        this.setState({ error: true, errorMessage: err.message });
      });   
  }; 
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }; 
  render() {
    const { passwordOne, passwordTwo, error,errorMessage } = this.state; 
    const isInvalid =  passwordOne !== passwordTwo || passwordOne === ''; 
    return (      
      <div>
        <Change
           onChange={this.onChange}
           isInvalid={isInvalid}
           onSubmit={this.onSubmit}
        />        
        <Snackbar open={error} autoHideDuration={1000} onClose={this.handleCloseAlert}>
          <Alert onClose={this.handleCloseAlert} severity="error">
             {errorMessage}
          </Alert>
        </Snackbar>
      </div>      
    );
  }
}
 
export default withFirebase(PasswordChangeForm);