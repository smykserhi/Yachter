import React from 'react';
import * as ROUTES from '../../constants/routes';
import SignOutButton from '../SignOut';
import { AuthUserContext } from '../Session';
import NavAutorised from "./NavAutorised"
 
const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? <NavigationAuth /> : <NavigationNonAuth />
      }
    </AuthUserContext.Consumer>
  </div>
);
 
const NavigationAuth = () => (
  
  <NavAutorised links={[
      { title: `Start`, path: ROUTES.LANDING },
      { title: `home`, path: ROUTES.HOME },
      { title: `account`, path: ROUTES.ACCOUNT },
      { title: `admin`, path: ROUTES.ADMIN },
      
      ]}
      button ={<SignOutButton />}
   />
);
 //coment
const NavigationNonAuth = () => (
  <NavAutorised links={[
    { title: `Landing`, path: ROUTES.LANDING },
    { title: `Sign In`, path: ROUTES.SIGN_IN },   
    
    ]}
    
  /> 
);
 
export default Navigation;