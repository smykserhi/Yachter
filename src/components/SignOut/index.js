import React from 'react';
import Button from '@material-ui/core/Button';
import { withFirebase } from '../Firebase';
import Box from '@material-ui/core/Box';

const SignOutButton = ({ firebase }) => { 
  return(   
        <Box width={100}>
          <Button  color="primary"  variant="contained" onClick={()=>{firebase.doSignOut()} } >Sign Out</Button> 
        </Box>
  );
}

export default withFirebase(SignOutButton);