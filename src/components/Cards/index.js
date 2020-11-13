import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Trip from "./Trip"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,  
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