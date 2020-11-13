import React,{Component} from 'react';
import {withFirebase} from "../Firebase"
import Box from '@material-ui/core/Box'
import { Typography } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import GridItem from "./GridItem"
import HorisontalStepper from "./Stepper"
import Galery from "./Galery"
import Button from '@material-ui/core/Button';
import * as ROUTES from '../../constants/routes';
import ModalPopUp from "./ModalPopUp"
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { createMuiTheme, ThemeProvider,responsiveFontSizes } from '@material-ui/core/styles';

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
//box for beckground 
const MyBox = styled(Box)({
  backgroundColor: 'rgba(255, 255, 255, 0.4)',
  padding : "30px",
  borderRadius: "15px",
  width:"70vw",
  });
//box for short discription with logos
const BoxInGrid = styled(Box)({
  display:"flex",
  flexDirection: "column",
  justifyContent:"center",
  alignItems:"center" ,
  alignSelf: "center",
  width: "100%",
  margin: "auto", 
  });

//Send request button
const SendRequesrButton = styled(Button)({
    width : "75%"
  })
//main class
class LandingPage extends Component {
  state = {
    loading: false,
    card: {},
    postId: "",  
    authUser: null,
    openModal: false,
    alert: false,    
  };
  
  componentDidMount() {
    //save id from param
    const id = this.props.match.params.id    
    this.setState(()=>{
        return{
         postId: id
        } 
     })
     //get data by id from Firebase
    this.setState({ loading: true }); 
    this.props.firebase.card(id).on('value', snapshot => {
      const cardObject = snapshot.val();
      this.setState({
          card: cardObject, 
          loading: false,       
        });
      }); 
    //set up listner for autorised user
    this.listener = this.props.firebase.auth.onAuthStateChanged(
        authUser => {
          authUser
            ? this.setState({ authUser })
            : this.setState({ authUser: null });
        },
      );   
  }
  componentWillUnmount() {
    this.props.firebase.card().off();   
    this.listener(); 
  }
  //handle sent button click, open modal 
  handleSend(){    
    if(this.state.authUser){ //if autorised
      this.setState({openModal : true})
    }else{
      this.props.history.push(ROUTES.SIGN_IN)     
    }
  }
  //close modal
  handleCloseModal=()=>{
    this.setState({openModal : false})
  }
  //Dubmit request handler
  handleSubmitModal = (data) => {
    this.setState({openModal : false})
    const currentUserId = this.state.authUser.uid
    const captainId = this.state.card.userId
    const tripTItle= this.state.card.title
    const shipName = this.state.card.shipName
    let dataToCaptain
    const responseData = {...data, postId : this.state.postId, senderUid : currentUserId, captainId, tripTItle, shipName} 
    responseData.share_data ?  dataToCaptain = responseData : dataToCaptain = {first_name : responseData.first_name, email: responseData.email} //if user doesn't want to share personal data
    const captainRequestId = this.props.firebase.addReuest(captainId,dataToCaptain) //save in captain profile
    const adminRequestId = this.props.firebase.saveToAdmin({...responseData, captainRequestId}) //save to admin page
    this.props.firebase.saveReuest(currentUserId,{...responseData, captainRequestId, adminRequestId})
    this.setState({ alert: true})
  };
  //close Alert
  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({alert: false})
  };

  render(){
    const { card, loading, alert, openModal } = this.state;     
    return(
      <Box  my={5} display="flex"
        flexDirection="column"
        alignItems="center"        
        justifyContent="center"
        > 
        <Box display="flex"
          flexDirection="column"
          alignItems="center"        
          justifyContent="center"
          minHeight="30vh" 
          component="span" 
          m={1}>
          <ThemeProvider  theme={theme}>
            <Typography align="center" variant="h2" component="h2">
              {card.title}
            </Typography> 
          </ThemeProvider>            
        </Box>
        <MyBox m={1}>
          <BoxInGrid>
            <Grid  container
                direction="row"
                justify="center"                
                spacing={4}>
                <GridItem key={1} LogoIcon = {"DirectionsBoatIcon"} text={card.shipName}/>
                <GridItem key={2} LogoIcon = {"DateRangeIcon"} text={ card.startDate}/>
                <GridItem key={3} LogoIcon = {"PersonPinCircleIcon"} text={card.portDeparture}/>
                <GridItem key={4} LogoIcon = {"MonetizationOnIcon"} text={card.fee}/>
                <GridItem key={5} LogoIcon = {"ViewWeekIcon"} text={card.endDate}/>
                <GridItem key={6} LogoIcon = {"PinDropIcon"} text={card.portOfArival}/>               
             </Grid>
          </BoxInGrid>
        </MyBox>
        <Box  minHeight="15vh"/>
        <MyBox  align="center">
          <Box width={{md:"95%" , xs:"95%"}}>
            <Box mb={3}>
              <ThemeProvider  theme={theme}>
                <Typography m={5} variant="h2" component="h2">
                    Days Description
                </Typography>
              </ThemeProvider>              
            </Box>            
            <HorisontalStepper card={card}/>
          </Box>          
        </MyBox>
        <Box  minHeight="15vh"/>
        <MyBox  align="center">
          <Box borderRadius={16} width={{md:"95%" , xs:"95%"}}>  
            <Box mb={3}>
              <ThemeProvider  theme={theme}>
                <Typography m={5} variant="h2" component="h2">
                    Yatch Photos
                </Typography>
              </ThemeProvider>
            </Box>          
            <Galery card={card} />             
          </Box>
        </MyBox> 
        <Box  minHeight="15vh"/>  
        <MyBox  align="center">
          <SendRequesrButton onClick={()=>this.handleSend()} variant="contained" color="primary">
              Send Request
          </SendRequesrButton>
        </MyBox>
        <Box  minHeight="15vh"/>  
        <Snackbar open={alert} autoHideDuration={3000} onClose={this.handleClose}>
          <Alert  onClose={this.handleClose} severity="success">
            Request sent successfully. Captain will contact you soon
          </Alert>           
        </Snackbar>              
        <ModalPopUp open={openModal} onClose={this.handleCloseModal} onSubmit={this.handleSubmitModal}/>          
        {loading? <CircularProgress color="secondary" />: ""}        
      </Box>
    )
  }
}

export default withFirebase(LandingPage);