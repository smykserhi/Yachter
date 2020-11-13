import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Box from "@material-ui/core/Box"
import DayDis from "./DayDis"

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
      },
  button: {
    marginRight: theme.spacing(1),
  },
  completed: {
    display: 'inline-block',
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  steper: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {        
        flexDirection: "column",
      },   
  },
  
}));

export default function HorisontalStepper({card}) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);  
  const steps = new Array(card.daysDis && card.daysDis.length);
  steps.fill("")    
  const getStepContent =(step) =>{    
      return(<Box key={step} width="100%">
                  <DayDis header={card.daysDis && card.daysDis[step].dayHead} bodyText={card.daysDis && card.daysDis[step].dayDis} imgUrl = {card.daysDis && card.daysDis[step].imgUrl}/> 
              </Box>);    
    } 
    
  const handleStep = (step) => () => {
    setActiveStep(step);  }; 
  return (
    <div className={classes.root}>
        <Stepper  nonLinear activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step   key={index}>
                  <StepButton onClick={handleStep(index)} >
                    {label}
                  </StepButton>
              </Step>
            ))}
        </Stepper>
        <div>
            <Box className={classes.instructions}>{getStepContent(activeStep)}</Box>
        </div>     
    </div>
  );
}
