import React, {useState} from 'react';
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
import { blue, cyan } from '@material-ui/core/colors';
import Footer from "../Footer"
import {Box} from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import {AppConsumer} from "../AppContext"
import TripInfo from "../TripInfo"
import AddTripTemplate from "../AddTrip/AddTripTemplate"
 
const useStyles = makeStyles({
  
  mainGrid: {
    display : "flex",
    flexDirection : "column",
    width: '100vw',
    minHeight: '100vh',
    spacing: 0,
    justify: 'space-around'
  }
});
const myTheme = createMuiTheme({
  palette: {
    primary : {
      main: blue[200],
      
    },
    secondary: {
      main: cyan[500],
      //dark: cyan[900]
    },
  },
});
//console.log(myTheme) 

const App = () => {
  const classes = useStyles();
  
  return(
    <Router>
      <ThemeProvider theme={myTheme}>
        <AppConsumer>
          {consumer =>(
            <Box className = {classes.mainGrid}>
              <Navigation  />      
              <Route exact path={ROUTES.MAIN} component={LandingPage} />
              <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
              <Route path={ROUTES.SIGN_IN} render={()=>(<SignInPage />)} />
              <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
              <Route path={ROUTES.HOME} component={HomePage} />
              <Route path={ROUTES.ACCOUNT} render={()=>(<AccountPage />)}/>
              <Route path={ROUTES.ADMIN} component={AdminPage} />
              <Route path={ROUTES.TRIP_INFO} component={TripInfo}/>
              <Route path={`${ROUTES.ADD_TRIP}/:userId`} component={AddTripTemplate}/>
              <Footer bottom/>
            </Box>
          )}
        </AppConsumer>
        
      </ThemeProvider>
    </Router>
  );
}
 
export default withAuthentication(App);