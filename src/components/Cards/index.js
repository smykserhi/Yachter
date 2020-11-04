import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { CenterFocusStrong } from '@material-ui/icons';
import Box from "@material-ui/core/Box";
import Trip from "./Trip"
//import {withFirebase} from "../Firebase"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,  
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: "center",
    // minHeight :"100vh",
    // minWidth : "75%"

  },
  paper: {     
    margin:  theme.spacing(1),
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));


const  Cards =(props)=> {
  const classes = useStyles();

  return (
      <Container maxWidth="lg">
    <div className={classes.root}>    
      <Grid 
        container 
        spacing={6}
        direction="row"
        justify="space-evenly"
        alignItems="flex-start">        
            {props.cards.map(card=>{
                return(
                    <Grid key={card.uid} container  justify="center" item xs={12} sm={6} md={4}>
                        <Trip editMode={false} card={card}/>
                    </Grid>
                    )
                })}                    
      </Grid>  
     
    </div>
    </Container>
  );
}

export default Cards