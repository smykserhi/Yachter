import React,{Component} from 'react';
import {withFirebase} from "../Firebase"
import Cards from "../Cards"
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';




class LandingPage extends Component {
  state = {
    loading: false,
    cards: [],
    userData: {},
    logintest: {},
    image: {}
  };
  componentDidMount() {
    this.setState({ loading: true });    
    this.props.firebase.cards().on('value', snapshot => {
      const usersObject = snapshot.val();      
      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key,
      }));
      this.setState({
        cards: usersList,
        loading: false,        
      });
    });
  }
  componentWillUnmount() {
    this.props.firebase.cards().off();    
  }
  render(){
    //console.log("cards lending", cards)
    const { cards, loading } = this.state; 
    return(
      <Box  my={5} display="flex"
        flexDirection="column"
        alignItems="center"        
        justifyContent="center"
        > 
        <Box display="flex"
            flexWrap="wrap"
            alignContent="center"  
            height={400}
            //width={"80vw"}
            fontWeight="fontWeightMedium">
              <Typography  align	='center' variant="h2" component="h2" gutterBottom>
                  GET YOUR CHANCE TO EXTEND THE SUMMER!!!<br/><br/> YATCH TREVEL
              </Typography>
        </Box>   
        
        {loading? <CircularProgress color="secondary" size={50} />: <Cards cards={this.state.cards}/>}        
      </Box>
    )
  }
}
  
 //coment
export default withFirebase(LandingPage);