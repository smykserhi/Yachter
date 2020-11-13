import React  from 'react';
import * as ROUTES from '../../constants/routes';
import SignOutButton from '../SignOut';
import { AuthUserContext } from '../Session';
import NavAutorised from "./NavAutorised"
import PersonIcon from '@material-ui/icons/Person';


const Navigation = () =>{  
  return (  
      <AuthUserContext.Consumer>
        {authUser =>       
          authUser ? <NavigationAuth   /> : <NavigationNonAuth  />                  
        }
      </AuthUserContext.Consumer>  
);}
 
const NavigationAuth = () => {
  return( 
    <NavAutorised  links={[
        { title: `Main`, path: ROUTES.MAIN },        
        { title: `account`, path: ROUTES.ACCOUNT },        
        ]}
        button ={<SignOutButton />}
        personIcon ={<PersonIcon/>}
     />
  );
}
 //coment
const NavigationNonAuth = () => (
  <NavAutorised links={[    
    { title: `Sign In`, path: ROUTES.SIGN_IN },       
    ]}
    logInIcon ={<PersonIcon fontSize="large"/>}    
  /> 
);
 
export default Navigation;