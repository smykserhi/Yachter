import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose'; 
import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase';
import SignUpTemplate from "./Temolate"
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
//import Alert from "../Alert"

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


//coment
const SignUpPage = () => (  
    <SignUpForm />      
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  experiance: 0,
  captain : false,
  error: null,
  open: false,
}; 

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
 
  onSubmit = event => {
    const {experiance, captain, username, email, passwordOne } = this.state;
 
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return this.props.firebase
          .user(authUser.user.uid)
          .set({
            username,
            email,
            role: "user",
            experiance,
            captain
          });
          })
      .then(authUser => {
        console.log("SingUp secess")
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.MAIN);
      })
      .catch(error => {
        this.setState({ error ,open: true});
      });
 
    event.preventDefault();
  }
 
  onChange = event => {
    if(event.target.name === "captain") this.setState({[event.target.name]: event.target.checked})
    else this.setState({ [event.target.name]: event.target.value });
  };
  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({open: false})
  };
 
  render() {
    //unidirectional data flow of React thus, each input field gets a value from the local state and updates the value in the local state with a onChange handler. 
    //The input fields are controlled by the local state of the component and don't control their own states.
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;
    //set up validation for fields
    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';
    return (     
        <div>
        <SignUpTemplate 
            onChange={this.onChange}
            onSubmit={this.onSubmit}
            isInvalid={isInvalid}
            experiance = {this.state.experiance}
            captain = {this.state.captain}

          />
          <Snackbar open={this.state.open} autoHideDuration={3000} onClose={this.handleClose}>
            <Alert  onClose={this.handleClose} severity="warning">
              {error && error.message}
            </Alert>
           </Snackbar>
        {/*error && <p>{error.message}</p>*/}
        </div>      
    );
  }
}
 
const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);
 
const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);
export default SignUpPage;
 
export { SignUpForm, SignUpLink };