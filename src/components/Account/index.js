import React, {useState, Component} from 'react';
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import { AuthUserContext, withAuthorization } from '../Session';
import Grid from '@material-ui/core/Grid';
import { styled } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { borders } from '@material-ui/system';
import ModalForm from "./ModalForm"
import Box from '@material-ui/core/Box';
import Trip from "../Cards/Trip"
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RequestTemplate from "./RequestsTemplate"
import { makeStyles } from '@material-ui/core/styles';
import ModalPopUp  from "../TripInfo/ModalPopUp"
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import IconButton from '@material-ui/core/IconButton';
import Alert from '@material-ui/lab/Alert';

const borderProps = {
  //bgcolor: 'background.paper',
  mt: 5,
  border: 1,
  style: { width: '95%', height: '0px' },
  height: 10,
  
};
const GridWithBeckground = styled(Grid)({
  backgroundColor: 'rgba(255, 255, 255, 0.4)',
  padding : "30px",
  borderRadius: "15px",
  marginTop: "25px",
  width: '95vw',
    ['@media (min-width:780px)']: { // eslint-disable-line no-useless-computed-key
      width: '70vw'
    } 
});
const AddButtonBox = styled(Box)({
  marginRight : "10vw",
  fontSize: "50px",
  display: "flex",
  flexDirection: "row",
  alignItems: "center"
})

class AccountPage extends Component {
  state={
    user: null,
    userId: null,
    loading: false,
    resetPasswordModal: false,
    changePasswordModal: false,
    editProfileModal: false,
    modalOpen: false,
    modalContent: "",
    openModalEditRequest : false,
    requestParam: null,    
    alertEditPofile: null


  }
  componentDidMount() {
    //this.props.firebase.updateData({captain: false})
    this.setState({ loading: true, userId: this.props.id,}); 
    this.props.firebase.user(this.props.id).on('value', snapshot => {
      const userObject = snapshot.val();      
      this.setState({
        user: userObject,
        loading: false,        
      });
    });
    //console.log(this.state.user)
  }
  componentWillUnmount() {
    this.props.firebase.user().off();    
  }

  //update data in user profile
  editProfileSave=(data)=>{
    //console.log("editProfileSave",data) 
    //console.log("UsetId", this.state.userId)
    const userId= this.state.userId
    this.props.firebase.updateUserData(userId,data)
    this.setState({ alertEditPofile: "Profile saved successfully"} )    
    setTimeout(() => {
      this.setState({alertEditPofile: null})
    }, 2000);

  }
  // handlerResetPassword=()=>{
  //   this.setState({ alertEditPofile: "Request sent successfully"} )    
  //   setTimeout(() => {
  //     this.setState({alertEditPofile: null})
  //   }, 2000);

  // }
  //----------Profile Handlers
  //reset password button
  handleOnClickRessetPassword=(e)=>{
    this.setState({modalOpen: true, modalContent: "ResetPassword"})    
  }
  //Edit profile button
  handleOnClickEditProfile=(e)=>{
  this.setState({modalOpen: true, modalContent: "EditProfile", requestParam: this.state.user }) 
  }
    //Change password button
  handleOnClickChangePassword=(e)=>{
    this.setState({modalOpen: true, modalContent: "ChangePassword"})  
  }

  //Add trip button
  handleOnClickAddTrip = () =>{
    this.props.history.push(`/add-trip/${this.state.userId}`)
    //this.setState({modalOpen: true, modalContent: "AddTrip"})
  }
  //on close modal window
  handleCloseModal =()=>{
    console.log("close modal")
    this.setState({modalOpen: false,openModalEditRequest: false, requestParam: null})
    
  }
  //handle onSubmit edit profile
  handleSubmitModal=(data, element)=>{
    if(element === "editProfile" ) this.editProfileSave(data)
    this.setState({modalOpen: false})
  }


  //--------Card handlers-------------
  handleEditCard = (data) =>{
    //console.log("EditCard", data)
   this.setState({modalOpen: true, modalContent: "AddTrip", requestParam : data} ) 
  }
  //open modal confirmation
  handleDeleteCard = (data) =>{
    //console.log("DeleteCard", data)
    this.setState({modalOpen: true, modalContent: "DeleteCard", requestParam : data} )  
  }
  //if delete confirmed
  handleDeleteConfirmed =()=>{
    //console.log("Confirmed delete card", this.state.requestParam)
    const data = this.state.requestParam
    this.props.firebase.deleteCardData(data.userId, data.cardId, data.cardPostId)
    this.setState({modalOpen: false, modalContent: "", requestParam : null} ) 
  }


  //------------Request handlers---------------
  //Save new password
  handleSaveNewPassword=()=>{
    this.setState({modalOpen: false, alertEditPofile: "New password saved successfully"} )
    console.log("New password save")
    setTimeout(() => {
      this.setState({alertEditPofile: null})
    }, 2000);

  }
  handleEditRequest = (data) =>{
    //console.log("Edit Request param", data)
    //save edit request param to state
    //then open modal
    this.setState({openModalEditRequest:true, requestParam: data})
  }
  handleSaveEditedRequest =(data)=>{
    console.log("Save edited request",data)
    this.setState({openModalEditRequest:false})
    console.log("Request params",this.state.requestParam)
    //const [userId, myRequestId,captainId, captainRequestId,adminRequestId] = this.state.requestParam
    this.props.firebase.updateRequestData(
          this.state.requestParam.userId, 
          this.state.requestParam.myRequestId ,
          this.state.requestParam.captainId, 
          this.state.requestParam.captainRequestId,
          this.state.requestParam.adminRequestId,
          data)
  }
  //open modal confirmatio
  handleDeleteRequest = (data) =>{
    //console.log("Delete Request", data)
    this.setState({modalOpen: true, modalContent: "Delete", requestParam : data} )
  }
  handleDeleteMessage = (data) =>{
    //console.log("Delete Request", data)
    this.setState({modalOpen: true, modalContent: "DeleteMessage", requestParam : data} )
  }
  handleConfirmDeleteMessage=()=>{
    this.setState({modalOpen: false, requestParam : null} )
    this.props.firebase.deleteMessageFromUser(this.state.userId, this.state.requestParam)
    
    console.log("Delete message")
  }
  //delete confirmed
  yesDeleteHandler = ()=>{
    console.log("Yes Delete" , this.state.requestParam)
    this.setState({modalOpen: false})
    this.props.firebase.deleteRequestData(
      this.state.requestParam.userId, 
      this.state.requestParam.myRequestId ,
      this.state.requestParam.captainId, 
      this.state.requestParam.captainRequestId,
      this.state.requestParam.adminRequestId    
      )
  }
  //Response to user modal open //NEED MODIFICATION
  handleResponse=(data)=>{
    //console.log("handle Response",data)
    this.setState({modalOpen: true, modalContent: "Response", requestParam: data} )
  }
  //-------Need Modification----------------------------
  handleResponseSend=(message)=>{
    //console.log("Send response to user", this.state.requestParam, "Message", message)
    const sendTo = this.state.requestParam.senderUid
    //console.log(this.state.user.username)
    //const sender = this.state.user.username  
    this.setState({modalOpen: false, modalContent: null, requestParam: null} )
    this.props.firebase.addMessageToUser(sendTo, {...this.state.requestParam, message})
  }
  saveNewTrip = (res) =>{
    console.log("Response in modal",{...res, userId: this.state.userId})
    const newResponse = {...res, userId: this.state.userId}
    const cardPostId = this.props.firebase.addCard(newResponse)
    this.props.firebase.addCardToUser(this.state.userId, {...newResponse, cardPostId  })
    this.handleCloseModal()

  }
  
  render(){
    const {loading , user} = this.state
    //console.log("User", user)
    return(                            
            <div>
              {loading ? <CircularProgress color="secondary" /> : 
                <Grid  container direction="column" justify="space-around" alignItems="center" spacing={3}>                  
                  <Grid  style={{ marginTop: "25px"}} item  xs={12}>
                        <Typography variant="h4" gutterBottom>
                          Profile info
                        </Typography>
                        {this.state.alertEditPofile !== null ?<Alert severity="success">{this.state.alertEditPofile}</Alert>: ""}
                      </Grid>
                    <GridWithBeckground  item  container  direction="row"  justify="center" alignItems="center" >                      
                      <Grid container   justify="center"  item xs={12} md={6}>
                        <Typography variant="h5" gutterBottom>
                          Name: {user && user.username}
                        </Typography>                        
                      </Grid>
                      <Grid container  justify="center" item xs={12} md={6}>
                        <Typography variant="h5" gutterBottom>
                            Email: {user && user.email}
                        </Typography>    
                      </Grid>
                      <Grid container justify="center" alignItems="stretch" item xs={12} md={4}>
                        <Button style={{width:"100%", margin: "5px"}} id="editProfileModal" variant="contained" color="primary"onClick={this.handleOnClickEditProfile}>
                          Edit profile
                        </Button> 
                      </Grid>
                      <Grid container   justify="center" item xs={12} md={4}>
                        <Button style={{width:"100%" , margin: "5px"}} id="changePasswordModal" variant="contained" color="primary" onClick={this.handleOnClickChangePassword}>
                          Change password
                        </Button> 
                      </Grid>
                      <Grid container  justify="center" item xs={12} md={4}>
                        <Button  style={{width:"100%" , margin: "5px"}} id="resetPasswordModal" variant="contained" color="primary" onClick={this.handleOnClickRessetPassword}>
                          Reset password
                        </Button>    
                      </Grid>
                    </GridWithBeckground>
                    <Box  border={1} borderColor="text.primary" {...borderProps} /> 
                    <Grid item>
                          <Typography variant="h4" gutterBottom>
                            Messages
                          </Typography>
                          </Grid> 
                      <GridWithBeckground item container spacing={3}  direction="row"  justify="center"  alignItems="center">                        
                       
                        {
                          user && user.messages  ? Object.keys(user.messages).map(key =>{
                            return(
                              <Grid container key={key} direction="row"  justify="flex-start" item xs={12} >  
                                <Grid  item xs={10}>
                                  <TextField
                                    fullWidth={true}
                                    id={key}
                                    label="Message "
                                    disabled={true}
                                    defaultValue={user.messages[key].message}
                                    //helperText="Message"
                                    variant="outlined"
                                  />
                                </Grid> 
                                <Grid  item xs={2}>
                                  <label onClick={()=>{this.handleDeleteMessage(key)}}>
                                      <IconButton color="primary"   aria-label="upload picture" component="span">
                                              <HighlightOffIcon  color="error" fontSize="large" />   
                                      </IconButton> 
                                  </label>
                                </Grid>                                
                               
                             </Grid>
                              
                            ) })
                            : <Grid container  justify="center" item xs={12}>
                                <Typography variant="h5" gutterBottom>
                                    You doesn't have any messages
                                </Typography>
                              </Grid>
                            
                        }
                                                                         
                      </GridWithBeckground>  
                      
                    {user && user.role !== "user"  ? //if user role "NOT user"
                    <>
                      <Box  border={1} borderColor="text.primary" {...borderProps} />   
                      <Grid style={{ marginTop: "25px"}}item>
                        <Typography variant="h4" gutterBottom>
                          Your trips
                        </Typography>
                      </Grid> 
                      <GridWithBeckground item container  direction="row"  justify="center"  alignItems="center" wrap="wrap" spacing={5}>
                        {
                          user && user.myCards  ? Object.keys(user.myCards).map(key =>{
                            return(
                              <Grid container key={key} justify="center" item xs={12} md={6} lg={4} >
                                <Trip  handleDelete={this.handleDeleteCard} handleEdit= {this.handleEditCard} cardId={key} editMode={true} card={user.myCards[key]}/>   
                              </Grid>
                            ) })
                            : <h1>You doesn't have any posted trips ---</h1>
                        }                     
                      </GridWithBeckground>  
                    
                    <Grid style={{ marginTop: "35px"}} item container  direction="row" justify="flex-end">
                      {user && user.captain ? 
                        <AddButtonBox >
                          <Typography style={{ margin: "15px"}} variant="h5" >
                            Add trip
                          </Typography>
                          <AddCircleIcon onClick={this.handleOnClickAddTrip}  fontSize="inherit" color="primary"/>
                        </AddButtonBox>  
                        : ""}                                            
                    </Grid>      
                    <Box  border={1} borderColor="text.primary" {...borderProps} />  
                      
                    <GridWithBeckground item container  direction="row"  justify="center"  alignItems="center">
                      <Grid item container  direction="row"  justify="center" xs={12}>
                        <Typography variant="h4" gutterBottom>
                          Requests from users
                        </Typography>
                      </Grid> 
                      {
                         user && user.requests  ? Object.keys(user.requests).map(key =>{
                          return(
                            <Grid container key={key} justify="center" item xs={12}>
                               {/*console.log("request",user.requests[key])*/}  
                              <RequestTemplate handleResponse={this.handleResponse} adminMode={false} userRequsts={true} requestId={key} handleEdit={this.handleEditRequest} handleDelete={this.handleDeleteRequest} editMode={false} request = {user.requests[key]}/>
                            </Grid>
                          ) })
                          : <h1>You doesn't have any trip requests  ---</h1>
                      }                     
                    </GridWithBeckground>  
                    </>
                    : ""} 


                    <Box  border={1} borderColor="text.primary" {...borderProps} />  
                    <GridWithBeckground item container  direction="row"  justify="center"  alignItems="center">
                      <Grid item container  direction="row"  justify="center" xs={12}>
                        <Typography variant="h4" gutterBottom>
                           My requests
                        </Typography>
                      </Grid> 
                      {
                         user && user.myRequests  ? Object.keys(user.myRequests).map(key =>{
                          return(
                            <Grid container key={key} justify="center" item xs={12}>
                               {/*console.log("request",user.requests[key])  */}
                              <RequestTemplate adminMode={false} userRequsts={false}  requestId={key} handleEdit={this.handleEditRequest} handleDelete={this.handleDeleteRequest} editMode={true} request = {user.myRequests[key]}/>
                            </Grid>
                          ) })
                          : <h1>You doesn't have any trip requests  ---</h1>
                      }                     
                    </GridWithBeckground>  
                    <Box  border={1} borderColor="text.primary" {...borderProps} /> 
                    {
                       user && user.role === "admin"  ? 
                            <GridWithBeckground item container  direction="row"  justify="center"  alignItems="center">
                              <Grid item>
                                <Typography variant="h4" gutterBottom>
                                  Users requests
                                </Typography>
                              </Grid> 
                              {user.usersRequests && Object.keys(user.usersRequests).map(key =>{
                                return(
                                    <Grid container key={key} justify="center" item xs={12}>
                                      {/*console.log("request",user.usersRequests[key])*/}  
                                        <RequestTemplate userRequsts={false} adminMode={true} editMode={false} request = {user.usersRequests[key]}/>                                       
                                    </Grid> 
                                )} )}                                               
                            </GridWithBeckground>  
                            :""
                        }
                         
                          
                           

                  
                </Grid>
              }
              <ModalForm saveNewTrip={this.saveNewTrip} 
                        firebase={this.props.firebase} 
                        sendResponse={this.handleResponseSend} 
                        handleDeleteCard={this.handleDeleteConfirmed} 
                        yesDelete={this.yesDeleteHandler} 
                        onSubmit={this.handleSubmitModal} 
                        user={user} 
                        open={this.state.modalOpen} 
                        handleCloseModal={this.handleCloseModal} 
                        modalContent={this.state.modalContent}
                        handleConfirmDeleteMessage = {this.handleConfirmDeleteMessage}
                        handleSaveNewPassword={this.handleSaveNewPassword}
                        requestParam={this.state.requestParam}
                        />
              {this.state.openModalEditRequest ? <ModalPopUp 
                                                    requestParam={this.state.requestParam} 
                                                    open={this.state.openModalEditRequest} 
                                                    onClose={this.handleCloseModal} 
                                                    onSubmit={this.handleSaveEditedRequest}/> : "" }    
            </div>     
          
    );
  }
  
} 
 //coment1
const condition = authUser => authUser != null;
 
export default withAuthorization(condition)(AccountPage);