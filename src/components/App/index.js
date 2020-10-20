import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin'; 
import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';
import { cyan, lightGreen } from '@material-ui/core/colors';
 
const myTheme = createMuiTheme({
  palette: {
    primary : {
      main: lightGreen[500],
      
    },
    secondary: {
      main: cyan[500],
      //dark: cyan[900]
    },
  },
});
//console.log(myTheme) 

const App = () => (
  <Router>
    <ThemeProvider theme={myTheme}>
      <Navigation />      
      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route
        path={ROUTES.PASSWORD_FORGET}
        component={PasswordForgetPage}
      />
      <Route path={ROUTES.HOME} component={HomePage} />
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route path={ROUTES.ADMIN} component={AdminPage} />
    </ThemeProvider>
  </Router>
);
 
export default withAuthentication(App);