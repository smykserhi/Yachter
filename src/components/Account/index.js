import React from 'react';

import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import { AuthUserContext, withAuthorization } from '../Session';
import Grid from '@material-ui/core/Grid';



const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <Grid container justify="space-around" spacing={3} direction="row" >
        <Grid item container justify="center"  alignItems="center" xs={12}>
          <h1 >Account: {authUser.email}</h1>
        </Grid>
        <Grid item xs={12} sm={6}>
          <PasswordForgetForm />
        </Grid>
        <Grid item xs={12} sm={6}>
          <PasswordChangeForm />
        </Grid>
      </Grid>
    )}
  </AuthUserContext.Consumer>
);
 //coment1
const condition = authUser => authUser != null;
 
export default withAuthorization(condition)(AccountPage);