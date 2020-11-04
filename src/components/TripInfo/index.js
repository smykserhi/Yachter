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
import Alert from '@material-ui/lab/Alert';
import * as ROUTES from '../../constants/routes';
//import ModalPopUp from '@material-ui/core/Modal';
import ModalPopUp from "./ModalPopUp"
import { TheatersOutlined } from '@material-ui/icons';


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
  //box for Alert
  const BoxWithAlrt = styled(Box)({    
    minWidth: "80%",    
    display:"flex",
    flexDirection: "column",
    justifyContent:"center",
    alignItems:"center" ,
    
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
    alertSuccess: false,
    authUser: null,
    openModal: false
    
  };
  
  componentDidMount() {
    //save id from param
    const id = this.props.match.params.id
    //console.log(id)
    this.setState(()=>{
        return{
         postId: id
        } 
     })
     //get data by id from Firebase
    this.setState({ loading: true });       
    //console.log( this.state.postId)
    this.props.firebase.card(id).on('value', snapshot => {
        const cardObject = snapshot.val();        
        //console.log("Card Object",cardObject)  
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
  //handle sent button click
  handleSend(){
    //console.log("user",this.state.authUser.uid)
    //console.log("modal open")
    if(this.state.authUser){
      this.setState({openModal : true})
      // this.setState({alertSuccess:true})
      // setTimeout(() => {
      //   this.setState({alertSuccess:false})
      // }, 3000);
    }else{
      this.props.history.push(ROUTES.SIGN_IN)     
    }
  }
  // handleOpenModal = () => {
  //   this.setState({openModal : true})
  //   console.log("modal open")
  // };
  handleCloseModal=()=>{
    this.setState({openModal : false})
  }
   handleSubmitModal = (data) => {
    this.setState({openModal : false})
    //console.log("modal close")
    const currentUserId = this.state.authUser.uid
    const captainId = this.state.card.userId
    let dataToCaptain
    const responseData = {... data, postId : this.state.postId, senderUid : currentUserId, captainId: captainId}    
    //console.log("responseData", responseData)
    responseData.share_data ?  dataToCaptain = responseData : dataToCaptain = {first_name : responseData.first_name, email: responseData.email} //if user doesn't want to share personal data
    const captainRequestId = this.props.firebase.addReuest(captainId,dataToCaptain) //save in captain profile
    const adminRequestId = this.props.firebase.saveToAdmin({...responseData, captainRequestId}) //save to admin page
    this.props.firebase.saveReuest(currentUserId,{...responseData, captainRequestId, adminRequestId}) //save to uder profile
    //console.log("id= ",captainRequestId, test)
    
    this.setState({alertSuccess:true}) //show  success alert
    setTimeout(() => {
            this.setState({alertSuccess:false})
          }, 3000);
      

  };
  render(){
    //console.log("cards lending", cards)
    const { card, loading } = this.state; 
    //console.log(this.state.card.userId)
    //this.setState()
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
            <Typography variant="h1" component="h2">
            {card.title}
            </Typography>
        </Box>
        <MyBox   m={1}>
          <BoxInGrid>
            <Grid  container
                direction="row"
                justify="center"                
                spacing={4}>
                <GridItem key={1} LogoIcon = {"DirectionsBoatIcon"} text={card.shipName}/>
                <GridItem key={2} LogoIcon = {"DateRangeIcon"} text={ card.startDate}/>
                <GridItem key={3} LogoIcon = {"PersonPinCircleIcon"} text={card.pickUp}/>
                <GridItem key={4} LogoIcon = {"MonetizationOnIcon"} text={card.fee}/>
                <GridItem key={5} LogoIcon = {"ViewWeekIcon"} text={`${card.daysAmount} days`}/>
                <GridItem key={6} LogoIcon = {"PinDropIcon"} text={card.dropOf}/>               
             </Grid>
             </BoxInGrid>
        </MyBox>
        <Box  minHeight="15vh"/>
        <MyBox  align="center">
          <Box width={{md:"95%" , xs:"95%"}}>
            <Box mb={3}>
              <Typography m={5} variant="h2" component="h2">
                Days Description
              </Typography>
            </Box>            
            <HorisontalStepper card={card}/>
          </Box>          
        </MyBox>
        <Box  minHeight="15vh"/>
        <MyBox  align="center">
          <Box borderRadius={16} width={{md:"95%" , xs:"95%"}}>  
            <Box mb={3}>
                <Typography m={5} variant="h2" component="h2">
                  Yatch Photos
                </Typography>
            </Box>          
              <Galery card={card} />             
          </Box>  
                
        </MyBox>
        <BoxWithAlrt  minHeight="15vh">          
          {this.state.alertSuccess ? <Alert m={5} severity="success">Request sent successfully. Captain will contact you soon</Alert> : ""}
        </BoxWithAlrt>
        
        <MyBox  align="center">
          <SendRequesrButton onClick={()=>this.handleSend()} variant="contained" color="primary">
              Send Request
          </SendRequesrButton>
        </MyBox>
        <Box  minHeight="15vh"/>                
        <ModalPopUp open={this.state.openModal} onClose={this.handleCloseModal} onSubmit={this.handleSubmitModal}/>          
        {loading? <h1>Loading-----</h1>: ""}        
      </Box>
    )
  }
}
  
 //coment
export default withFirebase(LandingPage);