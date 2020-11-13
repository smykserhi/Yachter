import React from 'react'; 
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box'
import { createMuiTheme, ThemeProvider,responsiveFontSizes } from '@material-ui/core/styles';
import { makeStyles, styled } from '@material-ui/core/styles';



let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const useStyles = makeStyles({
  root: {
    height: "100vh"
  },
});
const MyBox = styled(Box)({
  backgroundColor: 'rgba(255, 255, 255, 0.4)',
  padding : "30px",
  borderRadius: "15px",
  width:"70vw",    
  
});
const NotFound = () => {
  const classes = useStyles();
  return (
    <Grid 
      className={classes.root}
      container
      direction="column"
      justify="center"
      alignItems="center"
      >
      <ThemeProvider theme={theme}>
        <Typography   align='center' variant="h2" component="h2" gutterBottom>
          <MyBox color="#212121" fontWeight={300}>SORRY PAGE NOT FOUND<br/><br/> 404 ERROR</MyBox>
        </Typography>
      </ThemeProvider>    
  
    </Grid>
  ); 
}
export default NotFound;