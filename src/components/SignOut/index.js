import React from 'react';
import Button from '@material-ui/core/Button';
 
import { withFirebase } from '../Firebase';
 
const SignOutButton = ({ firebase }) => (
  <Button color="primary" variant="contained" onClick={firebase.doSignOut} >Sign Out</Button>  
);
 //comet
export default withFirebase(SignOutButton);