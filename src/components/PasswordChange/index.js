import React, { Component } from 'react';
 
import { withFirebase } from '../Firebase';
import Change from "./Template"
 
const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};
 //coment
class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);
 
    this.state = { ...INITIAL_STATE };
  }
 
  onSubmit = event => {
    const { passwordOne } = this.state;
 
    this.props.firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
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
    const { passwordOne, passwordTwo, error } = this.state;
 
    const isInvalid =
      passwordOne !== passwordTwo || passwordOne === '';
 
    return (      
      <div>
        <Change
           onChange={this.onChange}
           isInvalid={isInvalid}
           onSubmit={this.onSubmit}
        />
        {error && <p>{error.message}</p>}
        </div>
      
    );
  }
}
 
export default withFirebase(PasswordChangeForm);