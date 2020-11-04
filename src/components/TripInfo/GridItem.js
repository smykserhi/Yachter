import React from 'react';
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import DirectionsBoatIcon from '@material-ui/icons/DirectionsBoat';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import DateRangeIcon from '@material-ui/icons/DateRange';
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';
import PinDropIcon from '@material-ui/icons/PinDrop';
import ViewWeekIcon from '@material-ui/icons/ViewWeek';



const BoxInGrid = styled(Box)({
    display:"flex",
    direction:"row",
    justify:"center",
    alignItems:"center" ,
    margin: "0 5vw ",
    fontSize: "50px"
    
  });
  const BoxWithText = styled(Box)({   
    marginLeft: "1vw",   
    borderRadius: "30px",
    minWidth: "80%",
    fontWeight: "bold"
    
  });
const GridItem =({LogoIcon, text})=>(
    <Grid  item xs={12} sm={6} lg={4}>
    <BoxInGrid  >
        {LogoIcon == "DirectionsBoatIcon"? <DirectionsBoatIcon fontSize="inherit"/>: ""}
        {LogoIcon == "MonetizationOnIcon"? <MonetizationOnIcon fontSize="inherit"/>: ""}
        {LogoIcon == "DateRangeIcon"? <DateRangeIcon fontSize="inherit"/>: ""}
        {LogoIcon == "PersonPinCircleIcon"? <PersonPinCircleIcon fontSize="inherit"/>: ""}
        {LogoIcon == "PinDropIcon"? <PinDropIcon fontSize="inherit"/>: ""}
        {LogoIcon == "ViewWeekIcon"? <ViewWeekIcon fontSize="inherit"/>: ""}
        <BoxWithText p={ {xs:"2vh 2vw", sm: "1vh 2vw", md: "1vh 1vw"}} bgcolor="primary.main" >
           <Typography align="center" variant="h5" component="h2">
                {text}
           </Typography>
        </BoxWithText>
    </BoxInGrid>
</Grid>
)
export default GridItem