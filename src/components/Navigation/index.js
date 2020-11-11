import React  from 'react';
import * as ROUTES from '../../constants/routes';
import SignOutButton from '../SignOut';
import { AuthUserContext } from '../Session';
import NavAutorised from "./NavAutorised"
//import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import PersonIcon from '@material-ui/icons/Person';
import {AppConsumer} from "../AppContext"
import { makeStyles, useTheme } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  root:{
    //backgroundColor: 'rgba(255, 255, 255, 0.4)'
  }
}))
const Navigation = (props) =>{
  const classes = useStyles();
  return (
  <AppConsumer>
    {consumer =>(
      <AuthUserContext.Consumer>
      {authUser =>       
        authUser ? <NavigationAuth  className={classes.root}  /> : <NavigationNonAuth className={classes.root}  />      
            
      }
    </AuthUserContext.Consumer>
    )}    
   
  </AppConsumer>
);}
 
const NavigationAuth = (props) => {
  //console.log("AppData",props.consumer.data)
  return( 
    <NavAutorised  links={[
         { title: `Main`, path: ROUTES.MAIN },
        //{ title: `home`, path: ROUTES.HOME },
        { title: `account`, path: ROUTES.ACCOUNT },
        //{ title: `admin`, path: ROUTES.ADMIN },
        
        ]}
        button ={<SignOutButton />}
        personIcon ={<PersonIcon/>}
     />
  );
}
 //coment
const NavigationNonAuth = (props) => (
  <NavAutorised links={[
    // { title: `Main`, path: ROUTES.MAIN },
    { title: `Sign In`, path: ROUTES.SIGN_IN },       
    ]}
    logInIcon ={<PersonIcon fontSize="large"/>}
    
  /> 
);
 
export default Navigation;