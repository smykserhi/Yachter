import React from 'react';
import Button from '@material-ui/core/Button';
import {AppConsumer} from "../AppContext"
import { withFirebase } from '../Firebase';
 


const SignOutButton = ({ firebase }) => {
 
  return(
    <AppConsumer>
      {context=> {       
        return(
        <Button color="primary" variant="contained" onClick={()=>{
          firebase.doSignOut()
          context.actions.setAutorised(false) //set AppContext autorisation to false
          } } >Sign Out</Button>  
      )
      }}
    </AppConsumer>
    
  );
}

 //comet
export default withFirebase(SignOutButton);