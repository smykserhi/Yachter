import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import EditProfile from "./EditProfile"
import DeleteConfirmation from "./DeletConfirmation"
import SendResponseToUser from "./SendResponseToUser"
import AddTripTemplate from "./AddTripTemplateEdit"

//set modal position
function getModalStyle() {
  const top = 50 
  const left = 50 
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    maxHeight : "100vh",       
    overflow:'scroll',//make modal scrolable     
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    [theme.breakpoints.down('sm')]: {
        width: "90vw",
      },
    [theme.breakpoints.up('md')]: {
        width: "60vw",
    },  
  },
}));

export default function ModalForm( props) {
  const classes = useStyles();  
  const [modalStyle] = React.useState(getModalStyle);
  
  const onSubmitEdit=(data)=>{  
    props.onSubmit(data, "editProfile")
  }
  const body = (
    <div style={modalStyle} className={classes.paper}>
      {props.modalContent === "ChangePassword"? <PasswordChangeForm handleSaveNewPassword={props.handleSaveNewPassword}/>: ""}
      {props.modalContent === "ResetPassword"? <PasswordForgetForm />: ""}
      {props.modalContent === "EditProfile"? <EditProfile requestParam={props.requestParam} onSubmit={onSubmitEdit} />: ""}
      {props.modalContent === "AddTrip"? <AddTripTemplate requestParam={props.requestParam} cancel={props.handleCloseModal} />: ""}
      {props.modalContent === "Delete"? <DeleteConfirmation noDelete={props.handleCloseModal} yesDelete={props.yesDelete}/>: ""}
      {props.modalContent === "DeleteCard"? <DeleteConfirmation noDelete={props.handleCloseModal} yesDelete={props.handleDeleteCard} />: ""}
      {props.modalContent === "DeleteMessage"? <DeleteConfirmation noDelete={props.handleCloseModal} yesDelete={props.handleConfirmDeleteMessage}/>: ""}
      {props.modalContent === "Response"? <SendResponseToUser send={props.sendResponse} cancel={props.handleCloseModal}/>: ""}      
    </div>
  );  
  return (
    <div>     
      <Modal 
        open={props.open}
        onClose={props.handleCloseModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"        
      >
        {body}
      </Modal>
    </div>
  );
}
