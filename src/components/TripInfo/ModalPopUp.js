import React,{useEffect} from 'react';
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
    maxHeight : "100vh",       
    overflow:'scroll',//make modal scrolable    
    position: 'absolute',    
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
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
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
}));

export default function ModalPopUp( props) {
  const classes = useStyles();  
  const [modalStyle] = React.useState(getModalStyle);
  const [first_name, setFirst_name] = React.useState("");
  const [last_name, setLast_name] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [city, setCity] = React.useState("");
  const [zip_code, setZip_code] = React.useState("");
  const [age, setAge] = React.useState(21);
  const [share_data, setShare_data] = React.useState(true);
  const [want_help, setWant_help] = React.useState(false);
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [setUp, setSetUp] = React.useState(true)  
  
  //saveing data 
  const onChangeForm = (e)=>{
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
  //save request
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
      //return data 
      props.onSubmit(userData)
  }

  useEffect(() => {
    //called only when edit request clicked
    if(props.requestParam && setUp){
      const request = props.requestParam.request
      setFirst_name(request.first_name)
      setLast_name(request.last_name)
      setAddress(request.address)
      setCity(request.city)
      setZip_code(request.zip_code)
      setAge(request.age)
      setShare_data(request.share_data)
      setWant_help(request.want_help)
      setPhone(request.phone)
      setEmail(request.email)
      setSetUp(false)
    }    
  });
  return (
    <div className={classes.container}>      
      <Modal
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        >
        <div style={modalStyle} className={classes.paper}>
          <ModalForm 
            first_name={first_name}
            last_name={last_name}
            address={address}
            city={city}
            zip_code={zip_code}
            age={age}
            want_help={want_help} 
            share_data={share_data} 
            onChange={onChangeForm} 
            onSubmit={onSubmitForm}
            phone={phone}
            email={email}
            onClose={props.onClose}
            />    
        </div>
      </Modal>
    </div>
  );
}
