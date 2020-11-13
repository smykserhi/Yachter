import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from "@material-ui/core/Box"
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',    
    [theme.breakpoints.down('sm')]: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    [theme.breakpoints.up('md')]: {
        flexDirection: "row",
        justifyContent: "flex-start",
    }, 
  },
  rootColumn:{
    display: 'flex',
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: "4",
    justifyContent: "space-around", 
  },
  content: {
    flexGrow: "4",
  },
  cover: {
    [theme.breakpoints.down('sm')]: {
      height: "40vw",
      width: "60vw",
    },
    [theme.breakpoints.up('md')]: {
      height: "20vw",
      width: "30vw",
    },
  },
  image: {
    width: "100%",
    height: "100%"

  }
}));

export default function DayDis({bodyText, imgUrl }) {
  const classes = useStyles();  
  return (     
        <Paper elevation={3}  className={classes.root}> 
            <Box className={classes.cover}> 
              <img className={classes.image}  src ={imgUrl} alt="img"/>       
            </Box> 
            <Box className={classes.details}>                
              <Typography className={classes.component} component="h6" variant="h5">
                  {bodyText}
              </Typography>
            </Box>        
        </Paper>
  );
}
