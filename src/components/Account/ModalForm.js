import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import EditProfile from "./EditProfile"
import DeleteConfirmation from "./DeletConfirmation"
import SendResponseToUser from "./SendResponseToUser"
import AddTripTemplate from "./AddTripTemplate"


//let myRef = React.createRef();
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
        width: "40vw",
      },
  
  },
}));

export default function ModalForm( props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  // const [experiance, setExperiance] = React.useState(null);
  // const [captain, setCaptain] = React.useState(null);
  // const [username, setUsername] = React.useState(null);
  

const onSubmitEdit=(data)=>{
  //console.log(data)
  props.onSubmit(data, "editProfile")
}
const deleteTempImage=(func) =>{
  //console.log("Response in modal",res)
  //console.log("my ref", func())
  
}


  const body = (
    <div style={modalStyle} className={classes.paper}>
      {props.modalContent === "ChangePassword"? <PasswordChangeForm/>: ""}
      {props.modalContent === "ResetPassword"? <PasswordForgetForm/>: ""}
      {props.modalContent === "EditProfile"? <EditProfile onSubmit={onSubmitEdit} />: ""}
      {props.modalContent === "AddTrip"? <AddTripTemplate deleteTempImage={(func)=>props.handleCloseModal(func)} saveResponse={props.saveNewTrip} firebase={props.firebase}/>: ""}
      {props.modalContent === "Delete"? <DeleteConfirmation noDelete={props.handleCloseModal} yesDelete={props.yesDelete}/>: ""}
      {props.modalContent === "DeleteCard"? <DeleteConfirmation noDelete={props.handleCloseModal} yesDelete={props.handleDeleteCard}/>: ""}
      {props.modalContent === "Response"? <SendResponseToUser send={props.sendResponse} cancel={props.handleCloseModal}/>: ""}
      
    </div>
  );
  
  return (
    <div>
      {/* <button type="button" onClick={handleOpen}>
        Open Modal
      </button> */}
      <Modal 

        open={props.open}
        onClose={props.handleCloseModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        //disableScrollLock={true}
      >
        {body}
      </Modal>
    </div>
  );
}
