import React,{Component} from 'react';
import {withFirebase} from "../Firebase"
import Cards from "../Cards"
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { styled } from '@material-ui/core/styles';
import { createMuiTheme, ThemeProvider,responsiveFontSizes } from '@material-ui/core/styles';


let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

class LandingPage extends Component {
  state = {
    loading: false,
    cards: [],
    userData: {},
    logintest: {},
    image: {},
    noTrips: false
  };
  componentDidMount() {

    this.setState({ loading: true });    
    this.props.firebase.cards().on('value', snapshot => {
      if(snapshot.val() !== null){
        console.log(snapshot.val())
        const usersObject = snapshot.val();      
        const usersList = Object.keys(usersObject).map(key => ({
          ...usersObject[key],
          uid: key,
        }));
        this.setState({
          cards: usersList,
          loading: false,        
        });
      }else this.setState({noTrips : true, loading: false})
      
     
    });
  }
  componentWillUnmount() {
    this.props.firebase.cards().off();    
  }
  render(){
    //console.log("cards lending", cards)
    const { noTrips, cards, loading } = this.state; 
    return(
      <Box  my={5} display="flex"
        flexDirection="column"
        alignItems="center"        
        justifyContent="center"
        > 
        <Box display="flex"
            flexWrap="wrap"
            alignContent="center"  
            justifyContent="center"
            height={400}
            //width="75%"
            fontWeight="fontWeightMedium">
              <ThemeProvider theme={theme}>
                <Typography   align='center' variant="h2" component="h2" gutterBottom>
                    <Box color="#212121" fontWeight={300}>GET YOUR CHANCE TO EXTEND THE SUMMER!!!<br/><br/> YATCH TREVEL</Box>
                </Typography>
              </ThemeProvider>
              
        </Box>   
        
        {loading? <CircularProgress color="secondary" size={50} />: <Cards cards={this.state.cards}/>}  
        {noTrips ? 
          <ThemeProvider theme={theme}>
                <Typography   align='center' variant="h2" component="h2" gutterBottom>
                    <Box color="#212121" fontWeight={300}>Trips would be here soon</Box>
                </Typography>
              </ThemeProvider>
        :"" }      
      </Box>
    )
  }
}
  
 //coment
export default withFirebase(LandingPage);