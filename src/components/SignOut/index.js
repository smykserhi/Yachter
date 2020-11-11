import React from 'react';
import Button from '@material-ui/core/Button';
import {AppConsumer} from "../AppContext"
import { withFirebase } from '../Firebase';
import Box from '@material-ui/core/Box';

 


const SignOutButton = ({ firebase }) => {
 
  return(
    <AppConsumer>
      {context=> {       
        return(
          <Box width={100}>
          <Button  color="primary"  variant="contained" onClick={()=>{
            firebase.doSignOut()
              //context.actions.setAutorised(false) //set AppContext autorisation to false
              } } >Sign Out
            </Button> 
          </Box>
         
      )
      }}
    </AppConsumer>
    
  );
}

 //comet
export default withFirebase(SignOutButton);