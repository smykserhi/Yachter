import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import ModalForm from "./ModalForm"



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
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    [theme.breakpoints.down('sm')]: {
      width: "95vw",
    },
    [theme.breakpoints.up('md')]: {
      width: "70vw"
    },
    [theme.breakpoints.up('lg')]: {
      width: "55vw"
    },
  },
}));

export default function ModalPopUp( props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [first_name, setFirst_name] = React.useState(null);
  const [last_name, setLast_name] = React.useState(null);
  const [address, setAddress] = React.useState(null);
  const [city, setCity] = React.useState(null);
  const [zip_code, setZip_code] = React.useState(null);
  const [age, setAge] = React.useState(21);
  const [share_data, setShare_data] = React.useState(true);
  const [want_help, setWant_help] = React.useState(false);
  const [phone, setPhone] = React.useState(null);
  const [email, setEmail] = React.useState(null);

  

  const handleClose = () => {
    //setOpen(false);
    props.onClose()
  };

  const onChangeForm = (e)=>{
    //console.log(e.target.name,"value ",e.target.checked)
    if(e.target.name === "first_name") setFirst_name(e.target.value)
    else if(e.target.name === "last_name") setLast_name(e.target.value)
    else if(e.target.name === "address") setAddress(e.target.value)
    else if(e.target.name === "city") setCity(e.target.value)
    else if(e.target.name === "zip_code") setZip_code(e.target.value)
    else if(e.target.name === "age") setAge(e.target.value)
    else if(e.target.name === "share_data") setShare_data(e.target.checked)
    else if(e.target.name === "want_help") setWant_help(e.target.checked)
    else if(e.target.name === "phone") setPhone(e.target.value)
    else if(e.target.name === "email") setEmail(e.target.value)
  }
  const onSubmitForm = (e) =>{
    e.preventDefault();
    const userData= {
        first_name, 
        last_name,
        address, 
        city, 
        zip_code,
        age,
        share_data,
        want_help,
        phone,
        email
      }

      props.onSubmit(userData)

    //console.log("userData",userData)

  }
    //if(props.open && !open)setOpen(true)
  return (
    <div>      
      <Modal
        open={props.open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <ModalForm want_help={want_help} share_data={share_data} onChange={onChangeForm} onSubmit={onSubmitForm}/>
          
        </div>
      </Modal>
    </div>
  );
}
