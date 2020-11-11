import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import Button from '@material-ui/core/Button';

const defaultProps = {
  bgcolor: 'background.paper',
  m: 1,
  p: 3,
  //style: { width: '5rem', height: '5rem' },
  borderColor: 'text.primary',
  borderRadius: "20px"
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function RequestTemplate( props) {
  const classes = useStyles();
    //console.log("Request", props.request)
    let buttonText
    if(props.userRequsts){
        buttonText = "Send response"
    }else{
        buttonText = "Delete request"

    }
    const handleOnclick = (e) => {
        //console.log("Request",props.request)
        const response={
                        captainId: props.request.captainId, 
                        captainRequestId: props.request.captainRequestId, 
                        userId: props.request.senderUid, 
                        myRequestId: props.requestId,
                        adminRequestId: props.request.adminRequestId,
                        request: props.request
                    }
        //console.log("request", props.request)
        if(e.target.textContent === "Delete request") props.handleDelete(response)
        else if(e.target.textContent === "Edit request") props.handleEdit(response)
        else if(e.target.textContent === "Send response") props.handleResponse(props.request)

        //console.log(e.target.textContent, props.request)
    }
  return (
    <div className={classes.root}>
     <Box border={1} {...defaultProps} >
        <Grid container   direction="row"  justify="flex-start"  alignItems="center" spacing={3}>
            <Grid item xs={12} md={6} >
                <Typography variant="h5" gutterBottom>
                Trip: {props.request.tripTItle}
                </Typography>         
            </Grid>
            <Grid item xs={12} md={6} >
                <Typography variant="h5" gutterBottom>
                Ship name: {props.request.shipName}
                </Typography>         
            </Grid>
            <Grid item xs={12} md={6} >
                <Typography variant="h5" gutterBottom>
                Name: {props.request.first_name} {props.request.last_name}
                </Typography>         
            </Grid>
            <Grid item xs={12} md={6} >
                <Typography variant="h5" gutterBottom>
                Phone: {props.request.phone}
                </Typography>         
            </Grid>
            <Grid item xs={12} md={6} >
                <Typography variant="h5" gutterBottom>
                Age: {props.request.age}
                </Typography>         
            </Grid>
            <Grid item xs={12} md={6} >
                <Typography variant="h5" gutterBottom>
                Email: {props.request.email}
                </Typography>         
            </Grid>
            <Grid item xs={12} md={6} >
                <Typography variant="h5" gutterBottom>
                Adress: {props.request.address}
                </Typography>         
            </Grid>
            <Grid item xs={12} md={6} >
                <Typography variant="h5" gutterBottom>
                 Want help in your trip:  {props.request.want_help ? "Yes": " No"}
                </Typography>         
            </Grid>   
            {props.adminData ?
                <>                
                <Grid item xs={12} md={6} >
                    <Typography variant="h5" gutterBottom>
                    CaptainId: {props.request.captainId}
                    </Typography>         
                </Grid>
                <Grid item xs={12} md={6} >
                    <Typography variant="h5" gutterBottom>
                    Sender Id:  {props.request.senderUid }
                    </Typography>         
                </Grid>  
                <Grid item xs={12} md={6} >
                    <Typography variant="h5" gutterBottom>
                    PostId Id:  {props.request.postId }
                    </Typography>         
                </Grid> 
                </>
            :"" } 
            <Grid container spacing={3} justify="center" item xs={12} >
                {!props.adminMode ? 
                    <Button  style={{width:"45%" , margin: "5px"}} id="resetPasswordModal" variant="contained" color="primary" onClick={handleOnclick}>
                        {buttonText}
                    </Button> 
                : ""}
                
                {props.editMode ?
                    <Button  style={{width:"45%" , margin: "5px"}} id="resetPasswordModal" variant="contained" color="primary" onClick={handleOnclick} >
                        Edit request
                     </Button> 
                 :""} 
                
            </Grid>  
      </Grid>
     </Box>
      
    </div>
  );
}
